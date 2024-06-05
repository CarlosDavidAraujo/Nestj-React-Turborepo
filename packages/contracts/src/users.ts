import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const UserDto = z.object({
  id: z.number(),
  username: z.string(),
});
export type UserDto = z.infer<typeof UserDto>;

export const CreateUserDto = UserDto.omit({ id: true }).merge(
  z.object({ password: z.string() })
);
export type CreateUserDto = z.infer<typeof CreateUserDto>;

export const usersContract = c.router({
  create: {
    method: "POST",
    path: "/users",
    body: CreateUserDto,
    responses: {
      201: UserDto,
      400: z.object({
        message: z.string(),
      }),
    },
  },
});
