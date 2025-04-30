import { useCallback } from "react";
import { useSocket } from "../../../shared/socket";

export const useJoinRoom = () => {
  const socket = useSocket();

  const joinRoom = useCallback(
    (roomId: string) => {
      if (!roomId) return;

      socket.emit("joinRoom", roomId);
    },
    [socket],
  );

  return { joinRoom };
};
