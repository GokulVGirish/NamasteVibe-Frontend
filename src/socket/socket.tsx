"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const WithSocket = <P extends object>(
  Component: React.ComponentType<P & { socket: Socket | null }>
) => {
  function NewComponent(props: P) {
    const socket = useRef<Socket | null>(null);
    const [isSocketReady, setIsSocketReady] = useState(false);

    useEffect(() => {
      const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL, {
        reconnection: true,
        secure: true,
      });

      socket.current = socketInstance;
      setIsSocketReady(true); 

      return () => {
        if (socket.current) {
          socket.current.disconnect();
          socket.current = null;
        }
      };
    }, []);

    if (!isSocketReady) {
      return null; 
    }

    return <Component {...props} socket={socket.current} />;
  }
  return NewComponent;
};

export default WithSocket;
