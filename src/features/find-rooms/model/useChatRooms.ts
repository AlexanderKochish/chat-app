import { useQuery } from "@tanstack/react-query";
import { getChatRoom } from "../../../shared/api";

export const useChatRooms = () => {
  const { data: chatRooms, ...rest } = useQuery({
    queryKey: ["myChatRooms"],
    queryFn: getChatRoom,
    select: (res) => res?.data,
  });

  return { chatRooms, ...rest };
};
