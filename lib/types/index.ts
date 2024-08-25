export type Route = {
  path: string;
  method: string;
};

export type RoutingTree = {
  methods: Record<string, boolean>;
  children: Record<string, RoutingTree>;
};
