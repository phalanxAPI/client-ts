import * as gRPC from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const packageDef = loadSync(
  path.join(__dirname, "../../arsenal/proto/sysmon.lighthouse.proto")
);

const gRPCObject = gRPC.loadPackageDefinition(packageDef);
const phalanxPackage = gRPCObject.phalanx as GrpcObject;
const arsenalPackage = phalanxPackage.arsenal as GrpcObject;
const lighthousePackage = arsenalPackage.lighthouse as GrpcObject;
const sysmonPackage = lighthousePackage.sysmon as GrpcObject;

const sysmonConstructor =
  sysmonPackage.SysmonService as ServiceClientConstructor;

export var client = new sysmonConstructor(
  process.env.SYSMON_SERVICE_URL || "localhost:9002",
  gRPC.credentials.createInsecure()
);
