import monitorIncomingRequests from "../monitor-incoming-requests";
import { monitorOutgoingRequests } from "../monitor-outgoing-requests";
import { monitorSystem } from "../monitor-system";
import { extractRoutes } from "../routes-extractor";
import { buildRoutingTree, saveRoutingTree } from "../routing-tree";
import { DeployOptions, FormationOptions } from "./types";

export const formation = ({
  app,
  appId,
  serverId,
  axios,
}: FormationOptions) => {
  console.log("Initializing Phalanx Formation");

  monitorSystem({ appId, serverId });
  monitorIncomingRequests({ app, appId, serverId });
  monitorOutgoingRequests({ axios, appId, serverId });

  console.log(
    `Phalanx Formation Initialized for App ID: ${appId} and Server ID: ${serverId}`
  );
};

export const deploy = ({ app, appId, serverId, baseUrl }: DeployOptions) => {
  console.log("Deploying Phalanx Formation");

  const route = extractRoutes(app);
  const routingTree = buildRoutingTree(route);
  saveRoutingTree({ appId, serverId, baseUrl, tree: routingTree });
  // TODO: Push To Phalanx Controller

  console.log(`Phalanx Formation Deployed for App ID: ${appId}`);
};
