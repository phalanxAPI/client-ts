import monitorAPIRequests from "../analytics";
import { interceptAxiosMethods } from "../intercept-axios-methods";
import { monitorSystem } from "../monitor-system";
import { extractRoutes } from "../routes-extractor";
import { buildRoutingTree } from "../routing-tree";
import { DeployOptions, FormationOptions } from "./types";

export const formation = ({
  app,
  appId,
  serverId,
  axios,
}: FormationOptions) => {
  console.log("Initializing Phalanx Formation");

  interceptAxiosMethods(axios, appId, serverId);
  monitorSystem({ appId, serverId });
  monitorAPIRequests({ app, appId, serverId });

  console.log(
    `Phalanx Formation Initialized for App ID: ${appId} and Server ID: ${serverId}`
  );
};

export const deploy = ({ app, appId, serverId }: DeployOptions) => {
  console.log("Deploying Phalanx Formation");

  const route = extractRoutes(app);
  const routingTree = buildRoutingTree(route);
  // TODO: Push To Phalanx Controller

  console.log(
    `Phalanx Formation Deployed for App ID: ${appId} and Server ID: ${serverId}`
  );
};
