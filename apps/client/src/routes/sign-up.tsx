import { api } from "@/lib/api";
import { CreateUserDto } from "@repo/contracts/users";
import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
});

function SignUp() {
  const navigate = Route.useNavigate();

  const form = useForm({
    schema: CreateUserDto,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, error } = api.users.create.useMutation({
    onSuccess: () => navigate({ to: "/" }),
  });

  const onSubmit = form.handleSubmit((values) => mutate({ body: values }));

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Cadastro</h1>
              <p className="text-balance text-muted-foreground">
                Preencha suas informações para criar um nova conta.
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={onSubmit} className="grid gap-4 max-w-sm">
                <span className="text-destructive text-sm">
                  {error?.status === 400 && error.body.message}
                </span>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Criar uma conta
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{" "}
              <Link to="/" className="underline">
                Login
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
