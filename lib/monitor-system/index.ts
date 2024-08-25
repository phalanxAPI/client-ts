import * as si from "systeminformation";
import { SystemInfo, SystemMonitorOptions } from "./types";

async function getSystemInfo(): Promise<SystemInfo> {
  try {
    const [cpuLoad, memUsage, diskIO, networkStats, battery] =
      await Promise.all([
        si.currentLoad(),
        si.mem(),
        si.disksIO(),
        si.networkStats(),
        si.battery(),
      ]);

    const systemInfo: SystemInfo = {
      cpuLoad: cpuLoad.currentLoad.toFixed(2),
      memUsage: {
        active: memUsage.active,
        total: memUsage.total,
        usagePercent: ((memUsage.active / memUsage.total) * 100).toFixed(2),
      },
      diskIO: {
        read: diskIO.rIO_sec,
        write: diskIO.wIO_sec,
      },
      networkStats: networkStats.map((iface) => ({
        interface: iface.iface,
        rx_sec: iface.rx_sec,
        tx_sec: iface.tx_sec,
      })),
      battery: {
        percent: battery.percent,
        isCharging: battery.isCharging,
      },
    };

    return systemInfo;
  } catch (error) {
    console.error(`Error retrieving system information: ${error}`);
    throw error;
  }
}

export const monitorSystem = ({ serverId, appId }: SystemMonitorOptions) => {
  setInterval(async () => {
    const systemInfo = await getSystemInfo();
    // console.log(systemInfo);
    // TODO: Push data to Phalanx Controller
  }, 5000);
};
