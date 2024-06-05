import { contract } from "@repo/contracts";
import { initQueryClient } from "@ts-rest/react-query";

export const api = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
  credentials: "include",
});
