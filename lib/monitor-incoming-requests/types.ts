import type { Express } from "express";

export type Options = {
  app: Express;
  appId: string;
  serverId: string;
};
