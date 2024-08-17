import { extractRoutes } from "../routes-extractor";
import { buildRoutingTree } from "../routing-tree";
import { FormationOptions } from "./types";

export const formation = (options: FormationOptions) => {
  console.log("Initializing Phalanx Formation");

  const route = extractRoutes(options.app);
  const routingTree = buildRoutingTree(route);
  console.log("TREE", routingTree);

  // TODO: Push To Phalanx Controller
  // TODO: Continuosly log health checks and send to Phalanx Controller
  // TODO: Add phalanx/status endpoint to parent express app

  console.log(
    `Phalanx Formation Initialized for App ID: ${options.appId} and Server ID: ${options.serverId}`
  );
};
