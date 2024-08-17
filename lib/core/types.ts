import type { AxiosStatic } from 'axios';
import type { Express } from 'express';

export type FormationOptions = {
    appId: string,
    serverId: string,
    app: Express,
    axios: AxiosStatic,
}