import type { Express } from "express";

export type AnalyticsMonitorOptions = {
  app: Express;
  appId: string;
  serverId: string;
};
