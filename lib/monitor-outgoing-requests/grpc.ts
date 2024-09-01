import * as gRPC from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const packageDef = loadSync(
  path.join(__dirname, "../../arsenal/proto/outbound.lighthouse.proto")
);
const gRPCObject = gRPC.loadPackageDefinition(packageDef);

const phalanxPackage = gRPCObject.phalanx as GrpcObject;
const arsenalPackage = phalanxPackage.arsenal as GrpcObject;
const lighthousePackage = arsenalPackage.lighthouse as GrpcObject;
const outboundPackage = lighthousePackage.outbound as GrpcObject;

const outboundConstructor =
  outboundPackage.OutboundService as ServiceClientConstructor;

export var client = new outboundConstructor(
  process.env.OUTBOUND_SERVICE_URL || "localhost:9004",
  gRPC.credentials.createInsecure()
);
