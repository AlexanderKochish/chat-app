import { ReactNode } from "react";
import { SocketProvider } from "./provider";
import { useProfile } from "../api/queries/useProfile";

type Props = {
  children: ReactNode;
};

export const SocketWrapper = ({ children }: Props) => {
  const { me } = useProfile();
  return <SocketProvider userId={me?.id}>{children}</SocketProvider>;
};
