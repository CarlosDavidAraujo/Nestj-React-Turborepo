import { api } from "@/lib/api";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const { status } = await api.auth.getSession.query();

    if (status !== 200) {
      throw redirect({ to: "/" });
    }
  },
  component: Outlet,
});
