import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../Services/Users";

export function UsegetUsers() {
  const {
    data: dataUsers,
    isPending: pendinUsers,
    error,
  } = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers({ url: "get-all-Users" }),
  });
  return { dataUsers, pendinUsers, error };
}
