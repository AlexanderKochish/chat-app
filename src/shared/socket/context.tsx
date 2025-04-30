import { createContext, useContext } from "react";
import { socket } from "./instance";

export const SocketContext = createContext(socket);
export const useSocket = () => useContext(SocketContext);
