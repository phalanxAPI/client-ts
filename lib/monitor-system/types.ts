export type NetworkStats = {
  interface: string;
  rx_sec: number;
  tx_sec: number;
};

export type SystemInfo = {
  cpuLoad: string;
  memUsage: {
    active: number;
    total: number;
    usagePercent: string;
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

export type SystemMonitorOptions = {
  appId: string;
  serverId: string;
};
