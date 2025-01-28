import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdmins,
  getAdmins,
  postAdmin,
  updateAdmins,
} from "../../Services/Admin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {
    mutate: mutateAdmin,
    isPending: isPending,
    isSuccess,
  } = useMutation({
    mutationFn: postAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdmins"]);
      // navigate("/");
      toast.success("Admin has been created");
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
    isPending: isPendingDelete,
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: updateAdmin,
    isPending: isPendingUpdate,
    isSuccess,
  } = useMutation({
    mutationFn: updateAdmins, // The update function you’ve defined earlier
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdmins"]);
      navigate("/");
      toast.success("Admin has been Updated");
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { updateAdmin, isPendingUpdate, isSuccess };
}
