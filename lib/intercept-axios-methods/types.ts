import type { AxiosStatic } from "axios";

export type AxiosInterceptorOptions = {
  parentAxiosStatic: AxiosStatic;
  appId: string;
  serverId: string;
};
