import { Route, RoutingTree } from "../types";
import { client } from "./grpc";
import { SaveOptions } from "./types";

class RoutingTreeBuilder {
  _routingTree = {} as RoutingTree;

  registerRoute(route: Route) {
    const segments = route.path.split("/").filter(Boolean);
    let currentMap = this._routingTree;

    segments.forEach((segment) => {
      if (!currentMap.children) {
        currentMap.children = {};
      }
      if (!currentMap.children[segment]) {
        currentMap.children[segment] = { methods: {}, children: {} };
      }
      currentMap = currentMap.children[segment];
    });

    if (!currentMap.methods) {
      currentMap.methods = {};
    }
    currentMap.methods[route.method.toLowerCase()] = true;
  }

  getRoutingTree() {
    return this._routingTree;
  }
}

export const buildRoutingTree = (routes: Route[]) => {
  const mapBuilder = new RoutingTreeBuilder();

  routes.forEach((route) => {
    mapBuilder.registerRoute(route);
  });

  return mapBuilder.getRoutingTree();
};

export const saveRoutingTree = async (options: SaveOptions) => {
  await new Promise<void>((resolve, reject) => {
    client.updateRoutes(
      {
        appId: options.appId,
        serverId: options.serverId,
        baseUrl: options.baseUrl,
        routingTree: options.tree,
      },
      (err: any) => {
        if (err) {
          console.error("PHALANX: Error Updating Routing Tree", err);
          reject(err);
          return;
        }
        console.log("PHALANX: Routing Tree Updated");
        resolve();
      }
    );
  });
};

export default RoutingTreeBuilder;
