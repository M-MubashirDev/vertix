import { useQuery, useMutation } from "@tanstack/react-query";
import { postAdmin } from "../../Services/Admin";
import toast from "react-hot-toast";

export function useNewAdmin() {
  const {
    data: newAdminData,
    isPending: pendingAdmin,
    error,
  } = useQuery({
    queryKey: ["newAdmin"],
    queryFn: () => postAdmin({ api: "newAdmin" }),
  });
  return { newAdminData, pendingAdmin, error };
}
// hooks/usePostAdmin.js

export function useNewAdminMutate() {
  const {
    mutate: mutateAdmin,
    isLoading: isPending,
    isSuccess,
  } = useMutation({
    mutationFn: postAdmin,
    onSuccess: () => {
      toast.success("Admin has been created");
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("Payment Error:", error);
    },
  });

  return { mutateAdmin, isPending, isSuccess };
}
