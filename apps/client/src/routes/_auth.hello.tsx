import { useSession } from "@/hooks/useSession";
import { useSignOut } from "@/hooks/useSignOut";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/hello")({
  component: Page,
});

function Page() {
  const { data: session } = useSession();
  const { mutate: signOut } = useSignOut();

  return (
    <div className="flex-1 flex flex-col gap-4 justify-center items-center">
      <p className="text-primary font-bold text-3xl">
        Olá {session?.body.username}
      </p>
      <Button onClick={() => signOut({})}>Logout</Button>
    </div>
  );
}
