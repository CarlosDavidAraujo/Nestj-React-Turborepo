import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <div className="flex flex-col min-h-screen w-screen">
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
