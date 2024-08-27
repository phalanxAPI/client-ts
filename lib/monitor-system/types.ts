export type NetworkStats = {
  interface: string;
  rx_sec: number;
  tx_sec: number;
};

export type SystemInfo = {
  cpuLoad: number;
  memUsage: {
    active: number;
    total: number;
    usagePercent: number;
  };
  diskIO: {
    read: number | null;
    write: number | null;
  };
  networkStats: NetworkStats[];
  battery: {
    percent: number;
    isCharging: boolean;
  };
};

export type Options = {
  appId: string;
  serverId: string;
};
