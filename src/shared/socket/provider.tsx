import { ReactNode } from "react";
import { SocketContext } from "./context";
import { socket } from "./instance";

type Props = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: Props) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);
