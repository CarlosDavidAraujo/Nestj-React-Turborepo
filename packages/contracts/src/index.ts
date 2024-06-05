import {
  ServerInferRequest,
  ServerInferResponses,
  initContract,
} from "@ts-rest/core";
import { authContract } from "./auth";
import { generateOpenApi } from "@ts-rest/open-api";
import { usersContract } from "./users";

const c = initContract();

export const contract = c.router(
  {
    auth: authContract,
    users: usersContract,
  },
  { pathPrefix: "/api", strictStatusCodes: true }
);

export type InferResponse = ServerInferResponses<typeof contract>;
export type InferRequest = ServerInferRequest<typeof contract>;

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Posts API",
    version: "1.0.0",
  },
});
