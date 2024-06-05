import { initContract } from "@ts-rest/core";
import * as z from "zod";

const c = initContract();

export const LoginCreadentialsDto = z.object({
  username: z.string().min(1),
  password: z.string().min(6, "A senha deve possuir no mínimo 6 caractéres"),
});

export type LoginCredentials = z.infer<typeof LoginCreadentialsDto>;

export const SessionDto = z.object({
  sub: z.number(),
  username: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type User = z.infer<typeof SessionDto>;

export const authContract = c.router({
  signIn: {
    method: "POST",
    path: "/auth/login",
    body: LoginCreadentialsDto,
    responses: {
      201: z
        .object({
          status: z.literal("ok"),
        })
        .optional(),
      401: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  },
  signOut: {
    method: "POST",
    path: "/auth/logout",
    body: null,
    responses: {
      201: z
        .object({
          message: z.string(),
        })
        .optional(),
    },
  },
  getSession: {
    method: "GET",
    path: "/auth/session",
    responses: {
      200: SessionDto,
    },
  },
});
