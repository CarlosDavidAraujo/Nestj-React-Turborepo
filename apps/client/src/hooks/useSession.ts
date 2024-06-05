import { api } from "@/lib/api";

export const useSession = () => api.auth.getSession.useQuery(["session"]);
