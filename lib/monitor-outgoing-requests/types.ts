import type { AxiosStatic } from "axios";

export type Options = {
  axios: AxiosStatic;
  appId: string;
  serverId: string;
};
