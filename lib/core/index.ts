import { interceptAxiosMethods } from "../intercept-axios-methods";
import { extractRoutes } from "../routes-extractor";
import { buildRoutingTree } from "../routing-tree";
import { FormationOptions } from "./types";

export const formation = (options: FormationOptions) => {
  console.log("Initializing Phalanx Formation");

  const route = extractRoutes(options.app);
  const routingTree = buildRoutingTree(route);
  // TODO: Push To Phalanx Controller
  interceptAxiosMethods(options.axios);
  // TODO: Continuosly log health checks and send to Phalanx Controller

  console.log(
    `Phalanx Formation Initialized for App ID: ${options.appId} and Server ID: ${options.serverId}`
  );
};
