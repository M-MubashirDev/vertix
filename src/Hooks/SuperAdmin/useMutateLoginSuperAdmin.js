import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import loginsuperAdmin from "../../Services/useLoginSuperAdmin";
import { useNavigate } from "react-router-dom";

function useMutateLoginSuperAdmin() {
  const navigate = useNavigate();
  const { mutate: superLoginMutate, isPending: pendLogin } = useMutation({
    mutationFn: loginsuperAdmin,
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Login failed. Please try again.");
      console.error("Login failed:", error);
    },
  });
  return { superLoginMutate, pendLogin };
}

export default useMutateLoginSuperAdmin;
