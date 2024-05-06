import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const EXECUTION_ENGINE_URI = "http://34.215.237.214:3000";
// process.env.NEXT_PUBLIC_EXECUTION_ENGINE_URI ||
// "http://localhost:3000" ||
// "http://34.215.237.214:3000";

export function useSocket(pgId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${EXECUTION_ENGINE_URI}?roomId=${pgId}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [pgId]);

  return socket;
}
