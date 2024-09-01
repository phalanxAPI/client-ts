import { client } from "./grpc.ts";
import { Options, SystemInfo } from "./types";
import * as os from "os";
import * as si from "systeminformation";

export const monitorSystem = async ({ appId, serverId }: Options) => {
  const reportInterval = 5000; // Report every 60 seconds

  const getSystemInfo = async (): Promise<SystemInfo> => {
    const [cpu, mem, disk, networkStats, battery] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.disksIO(),
      si.networkStats(),
      si.battery(),
    ]);

    return {
      cpuLoad: cpu.currentLoad,
      memUsage: {
        active: mem.active,
        total: mem.total,
        usagePercent: ((mem.active / mem.total) * 100).toFixed(2),
      },
      diskIO: {
        read: disk.rIO,
        write: disk.wIO,
      },
      networkStats: networkStats.map((stat) => ({
        interface: stat.iface,
        rxSec: stat.rx_sec || 0,
        txSec: stat.tx_sec || 0,
      })),
      battery: {
        percent: battery.percent,
        isCharging: battery.isCharging,
      },
    };
  };

  const reportSystemState = async () => {
    try {
      const systemInfo = await getSystemInfo();
      const timestamp = Date.now();

      client.reportSystemState(
        {
          appId,
          serverId,
          timestamp: {
            seconds: Math.floor(timestamp / 1000),
            nanos: (timestamp % 1000) * 1e6,
          },
          systemInfo,
        },
        (err: any) => {
          if (err) {
            console.error("PHALANX: Error in reporting system state", err);
          }
        }
      );
    } catch (error) {
      console.error("PHALANX: Error in getting system information", error);
    }
  };

  // Start reporting system state
  setInterval(reportSystemState, reportInterval);
};
