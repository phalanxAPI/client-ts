import type { Express } from 'express';
import { Route } from '../types';

export const extractRoutes = (app: Express): Route[] => {
    const routes = app._router.stack
        .filter((r: any) => r.route)
        .map((r: any) => {
            return {
                method: Object.keys(r.route.methods)[0].toUpperCase(),
                path: r.route.path,
            }
        })

    return routes;
}