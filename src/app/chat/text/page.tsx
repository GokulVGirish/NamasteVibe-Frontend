"use client";
import WithSocket from "@/socket/socket";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Socket } from "socket.io-client";
import Spinner from "@/components/spinner";
import  {Toaster ,toast} from "sonner"

interface Props {
  socket: Socket | null;
}
const TextChat = ({ socket }: Props) => {
  const userId = useRef<string | null>(null);
  const receiverId = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "me" | "received"; message: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  let timeout=useRef<NodeJS.Timeout | null>(null);
  

  useEffect(() => {


    socket?.on("user_id", (myId) => {
      userId.current = myId;
        startSearch();
    });
  

    socket?.on("match_found", ({ userId }) => {
      setIsLoading(false);
      receiverId.current = userId;
    });

    socket?.on("message", (message) => {
      console.log("message", message);
      setMessages((prevState) => [
        ...prevState,
        { role: "received", message: message },
      ]);
    });

    socket?.on("typing", () => {
      console.log("typing is happening");
      setIsTyping(true);
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => setIsTyping(false), 1000);
    });

    socket?.on("handle-next", () => {
      receiverId.current = null;
      handleNext();
    });
    return () => {
      socket?.off("user_id");
      socket?.off("match_found");
      socket?.off("message");
      socket?.off("handle-next");
      socket?.emit("assist-partner", receiverId.current);
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [socket]);

  const sendMessage = () => {
    if(!newMessage) return toast.error("Enter a Message")
    socket?.emit("message", { message: newMessage, to: receiverId.current });
    setMessages((prevState) => [
      ...prevState,
      { role: "me", message: newMessage },
    ]);
    setNewMessage("");
  };
  const startSearch = () => {
    if (receiverId.current) receiverId.current = null;
    socket?.emit("find_match");
  };
  const handleNext = () => {
    setMessages([]);
    setNewMessage("");
    socket?.emit("find_match", { receiverId: receiverId.current });
    setIsLoading(true);
    if (receiverId.current) receiverId.current = null;
  };
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    socket?.emit("typing", receiverId.current);
  };

  return (
    <div className="flex flex-col pt-36 min-h-screen p-4 bg-gradient-to-b from-gray-900 to-black">
      <Toaster duration={1500} position="top-right"/>
      <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-[70vh] md:h-[80vh]">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-700 rounded-lg shadow-inner flex flex-col gap-3 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80 z-10">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {messages.map((message, index) => {
                if (message.role === "received") {
                  return (
                    <div
                      key={index}
                      className="bg-black text-white p-3 rounded-lg max-w-xs self-start transition-transform transform hover:scale-105"
                    >
                      {message.message}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="bg-gray-600 p-3 rounded-lg text-gray-300 max-w-xs self-end transition-transform transform hover:scale-105"
                    >
                      {message.message}
                    </div>
                  );
                }
              })}
              {isTyping && (
                <div className="text-gray-400 text-sm italic">
                  User is typing...
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex p-3 border-t border-gray-600 space-x-3 bg-gray-800">
          <input
          disabled={isLoading}
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type your message..."
            className="flex-1 border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition duration-200 flex items-center justify-center"
          >
            <FaPaperPlane />
          </button>
          {!isLoading && (
            <button
            disabled={isLoading}
              className=" bg-black hover:bg-gray-800 font-bold text-white rounded-lg px-6 py-3 shadow-md  hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default WithSocket(TextChat);
