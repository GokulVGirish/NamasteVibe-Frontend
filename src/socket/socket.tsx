"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


const WithSocket = <P extends object>(Component: React.ComponentType<P & { socket: Socket | null }>) => {
  function  NewComponent (props: P){
    const [socket, setSocket] = useState<Socket | null>(null);


    useEffect(() => {
   
      const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL, {
        reconnection: true,
        secure: true,
      });
      setSocket(socketInstance);
      return () => {
        socketInstance.disconnect();
      };
    }, []);

    return <Component {...props} socket={socket} />;
  };
  return NewComponent
};
export default WithSocket;
