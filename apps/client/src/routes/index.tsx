import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useForm,
} from "@repo/ui/form";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { LoginCreadentialsDto } from "@repo/contracts/auth";
import { useSignIn } from "@/hooks/useSignIn";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  const form = useForm({
    schema: LoginCreadentialsDto,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: signIn, error } = useSignIn();

  const onSubmit = form.handleSubmit((values) => signIn({ body: values }));

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Informe seu nome de usuário abaixo para acessar sua conta.
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={onSubmit} className="grid gap-4 max-w-sm">
                <p className="text-sm text-destructive">
                  {(error?.status === 404 || error?.status === 401) &&
                    error?.body.message}
                </p>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?
              <Link to="/sign-up" className="underline">
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
