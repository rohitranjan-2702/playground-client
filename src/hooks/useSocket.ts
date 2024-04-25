import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const EXECUTION_ENGINE_URI =
  process.env.EXECUTION_ENGINE_URI || "ws://localhost:8000";

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