import { Route, RoutingTree } from "../types";

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

export default RoutingTreeBuilder;
