import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdmins,
  getAdmins,
  postAdmin,
  updateAdmins,
} from "../../Services/Admin";
import toast from "react-hot-toast";

export function UsegetAdmins() {
  const {
    data: dataAdmins,
    isPending: pendinAdmins,
    error,
  } = useQuery({
    queryKey: ["getAdmins"],
    queryFn: () => getAdmins({ url: "get-all-admins" }),
  });
  return { dataAdmins, pendinAdmins, error };
}
// hooks/usePostAdmin.js

export function useNewAdminMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: mutateAdmin,
    isLoading: isPending,
    isSuccess,
  } = useMutation({
    mutationFn: postAdmin,
    onSuccess: () => {
      toast.success("Admin has been created");
      queryClient.invalidateQueries(["getAdmins"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("Payment Error:", error);
    },
  });

  return { mutateAdmin, isPending, isSuccess };
}
export function useDeleteAdminMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteAdmin,
    isLoading: isPendingDelete,
    isSuccess,
  } = useMutation({
    mutationFn: deleteAdmins,
    onSuccess: () => {
      toast.success("Admin has been Deleted");
      queryClient.invalidateQueries(["getAdmins"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("deletion Error:", error);
    },
  });

  return { deleteAdmin, isPendingDelete, isSuccess };
}
export function useUpdateAdminMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: updateAdmin,
    isLoading: isPendingUpdate,
    isSuccess,
  } = useMutation({
    mutationFn: updateAdmins, // The update function you’ve defined earlier
    onSuccess: () => {
      toast.success("Admin has been Updated");
      queryClient.invalidateQueries(["getAdmins"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { updateAdmin, isPendingUpdate, isSuccess };
}
