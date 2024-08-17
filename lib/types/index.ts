export type Route = {
    path: string,
    method: string,
}

export type RouteMap = {
    methods: Record<string, boolean>,
    children: Record<string, RouteMap>,
}
