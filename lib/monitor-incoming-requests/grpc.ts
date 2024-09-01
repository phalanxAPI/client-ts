import * as gRPC from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const packageDef = loadSync(
  path.join(__dirname, "../../arsenal/proto/inbound.lighthouse.proto")
);
const gRPCObject = gRPC.loadPackageDefinition(packageDef);

const phalanxPackage = gRPCObject.phalanx as GrpcObject;
const arsenalPackage = phalanxPackage.arsenal as GrpcObject;
const lighthousePackage = arsenalPackage.lighthouse as GrpcObject;
const inboundPackage = lighthousePackage.inbound as GrpcObject;

const inboundConstructor =
  inboundPackage.InboundService as ServiceClientConstructor;

export var client = new inboundConstructor(
  process.env.INBOUND_SERVICE_URL || "localhost:9003",
  gRPC.credentials.createInsecure()
);
