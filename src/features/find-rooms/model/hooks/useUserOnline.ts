import { useQuery } from "@tanstack/react-query";
import { getUserOnline } from "../../../../shared/api";

export const useUserOnline = (usersIds: string[]) => {
  const { data, ...rest } = useQuery({
    queryKey: ["online", usersIds],
    queryFn: () => getUserOnline(usersIds),
    select: (res) => res?.data,
    enabled: !!usersIds?.length,
  });

  return { data, ...rest };
};
