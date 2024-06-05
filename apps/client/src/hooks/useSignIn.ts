import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useSignIn = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return api.auth.signIn.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      navigate({ to: "/hello" });
    },
  });
};
