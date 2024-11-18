"use client";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaPaperPlane } from "react-icons/fa";
import WithSocket from "@/socket/socket";
import { Socket } from "socket.io-client";
import Spinner from "@/components/spinner";
interface Props {
  socket: Socket | null;
}
const servers: RTCConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};

const VideoChat = ({ socket }: Props) => {
  const [messages, setMessages] = useState<
    { role: "me" | "received"; message: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = useRef<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isTyping,setIsTyping]=useState(false)
  console.log("myuserif", userId, "receiverUserId", receiverId);

  useEffect(() => {
    socket?.emit("user_joined");
    socket?.on("user_id", (myId) => {
      userId.current = myId;
    });

    // Start searching for a match on load
    startSearch();

    socket?.on("match_found", ({ userId, isMaster }) => {
      console.log("came");
      setReceiverId(userId);
      setLoading(false);

      startRtcConnection(userId, isMaster);
    });
    socket?.on("handle-next", () => {
      handleNext();
    });
    socket?.on("offer", async (e) => {
      console.log("offer vannu");

      const offer = new RTCSessionDescription(e.offer);
      await peerConnection.current?.setRemoteDescription(offer);
      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer);
      console.log("e from ", e.from);
      socket.emit("answer", { from: userId.current, to: e.from, answer });
    });
    socket?.on("answer", async (e) => {
      console.log("answer vannu");
      const answer = new RTCSessionDescription(e.answer);
      await peerConnection.current?.setRemoteDescription(answer);
    });
    socket?.on("candidate", async ({ candidate }) => {
      await peerConnection.current?.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });
    socket?.on("message",(message)=>{
      console.log("message",message)
      setMessages((prev) => [...prev, { role: "received", message: message }]);

    })
      let timeout:NodeJS.Timeout;
      socket?.on("typing", () => {
        setIsTyping(true);
        if(timeout)clearTimeout(timeout)
        
      
        timeout=setTimeout(() => setIsTyping(false), 3000);
      });

    // Clean up socket events on component unmount
    return () => {
      socket?.off("user_id");
      peerConnection.current?.close();
      socket?.off("match_found");
      socket?.off("handle-next")
      socket?.off("offer")
      socket?.off("answer")
      socket?.off("candidate")
      socket?.disconnect()

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
    };
  }, [socket]);

  const startSearch = () => {
    setLoading(true);

    setReceiverId(null);
    socket?.emit("find_match");
  };

  const handleNext = () => {
    setMessages([])
    setNewMessage("")
    socket?.emit("find_match", { receiverId });
    setLoading(true);
    setReceiverId(null);
  };

  const sendMessage = () => {
    if (socket && newMessage) {
      socket.emit("message", {message:newMessage,to:receiverId});
      setMessages((prev) => [...prev, { role: "me", message: newMessage }]);
      setNewMessage("");
    }
  };

  const startRtcConnection = async (toId: string, isMaster: boolean) => {
    try {
      console.log("heyy bro");

      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30, max: 60 },
        },
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
        localVideoRef.current.muted = true;
      }
      peerConnection.current = new RTCPeerConnection(servers);

      if (localStreamRef.current && peerConnection.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, localStreamRef.current!);
        });
        const sender = peerConnection.current
          .getSenders()
          .find((s) => s.track!.kind === "video");
        if (sender) {
          const params = sender.getParameters();
          if (!params.encodings) params.encodings = [{}];
          params.encodings[0].maxBitrate = 2500000;
          sender
            .setParameters(params)
            .catch((err) => console.error("Failed to set parameters:", err));
        }
      }
      peerConnection.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          console.log("tracking");
          console.log("stream", e.streams[0]);
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
      peerConnection.current.onicecandidate = (e) => {
        if (e.candidate) {
          socket?.emit("candidate", {
            candidate: e.candidate,
            from: userId.current,
            to: toId,
          });
        }
      };
      peerConnection.current.oniceconnectionstatechange = () => {
        console.log("ice state", peerConnection.current?.iceConnectionState);
        if (peerConnection.current?.iceConnectionState === "disconnected") {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
          handleNext();
        }
      };
      if (isMaster) {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        socket?.emit("offer", { from: userId.current, to: toId, offer });
      }
    } catch (error) {
      console.log(error);
    }
  };
const handleTyping = (e:React.ChangeEvent<HTMLInputElement>) => {
  setNewMessage(e.target.value);
  socket?.emit("typing",receiverId);
};

  return (
    <div className="flex flex-col md:flex-row pt-28 min-h-screen p-2 bg-gradient-to-b from-gray-900 to-black">
      <div className="relative flex flex-col gap-4 w-full md:w-2/3 p-4">
        {/* First Video Container */}
        <div className="relative bg-gray-600 h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] rounded-lg shadow-lg overflow-hidden">
          {/* Centered Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Spinner />
            </div>
          )}

          <video
            className="w-full h-full rounded-lg object-cover"
            autoPlay
            playsInline
            ref={remoteVideoRef}
          ></video>

          {/* Next Button */}
          {!loading && (
            <button
              onClick={handleNext} // Replace with your navigation logic
              className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              <FaArrowRight size={18} />
            </button>
          )}
        </div>

        <div className="absolute bg-black bg-opacity-70 left-6 md:left-10 top-2/3 md:top-[70%] h-[10vh] w-[15vh] sm:h-[10vh] md:h-[20vh] md:w-[30vh] rounded-lg shadow-lg overflow-hidden z-10">
          <video
            ref={localVideoRef}
            className="w-full h-full rounded-lg object-cover"
            autoPlay
            playsInline
          ></video>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-4 h-[50vh] md:h-[80vh] mt-3 flex flex-col bg-gray-800 rounded-lg shadow-lg max-h-[90vh] overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-2 bg-gray-700 rounded-lg shadow-inner flex flex-col">
          <div className="flex flex-col gap-1">
            {messages.map((message, index) => {
              return message.role === "me" ? (
                <div
                  key={index}
                  className="bg-black text-white p-2 rounded-lg max-w-xs self-start transition-transform transform hover:scale-105"
                >
                  {message.message}
                </div>
              ) : (
                <div
                  key={index}
                  className="bg-gray-600 p-2 rounded-lg text-gray-300 max-w-xs self-end transition-transform transform hover:scale-105"
                >
                  {message.message}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="self-end bg-gray-600 p-2 rounded-lg text-gray-300 max-w-xs animate-pulse">
                Typing...
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex mt-2 space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type your message..."
            className="flex-1 border border-gray-600 rounded-lg p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white rounded-lg px-4 py-1 hover:bg-gray-800 transition duration-200"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};
export default WithSocket(VideoChat);
