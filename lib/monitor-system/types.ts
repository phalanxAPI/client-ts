export type Options = {
  appId: string;
  serverId: string;
};

export type NetworkStats = {
  interface: string;
  rxSec: number;
  txSec: number;
};

export interface IMemoryUsage {
  active: number;
  total: number;
  usagePercent: string;
}

export interface IDiskIO {
  read: number | null;
  write: number | null;
}

export interface IBattery {
  percent: number;
  isCharging: boolean;
}

export type SystemInfo = {
  cpuLoad: number;
  memUsage: IMemoryUsage;
  diskIO: IDiskIO;
  networkStats: NetworkStats[];
  battery: IBattery;
};