import type { Express } from "express";
import { Route } from "../types";

export const extractRoutes = (app: Express): Route[] => {
  const routes: Route[] = [];

  const split = (thing: any): string[] => {
    if (typeof thing === "string") {
      return thing.split("/");
    } else if (thing.fast_slash) {
      return [""];
    } else {
      const match = thing
        .toString()
        .replace("\\/?", "")
        .replace("(?=\\/|$)", "$")
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
      return match
        ? match[1].replace(/\\(.)/g, "$1").split("/")
        : [`<complex:${thing.toString()}>`];
    }
  };

  const print = (path: string[], layer: any) => {
    if (layer.route) {
      layer.route.stack.forEach(
        print.bind(null, path.concat(split(layer.route.path)))
      );
    } else if (layer.name === "router" && layer.handle.stack) {
      layer.handle.stack.forEach(
        print.bind(null, path.concat(split(layer.regexp)))
      );
    } else if (layer.method) {
      routes.push({
        path: "/" + path.concat(split(layer.regexp)).filter(Boolean).join("/"),
        method: layer.method.toUpperCase(),
      });
    }
  };

  app._router.stack.forEach(print.bind(null, []));

  return routes;
};
