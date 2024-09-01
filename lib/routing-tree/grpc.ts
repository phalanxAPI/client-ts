import * as gRPC from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import * as path from "path";

const packageDef = loadSync(
  path.join(__dirname, "../../arsenal/proto/navigator.lighthouse.proto"),
  {}
);

const gRPCObject = gRPC.loadPackageDefinition(packageDef);
const phalanxPackage = gRPCObject.phalanx as GrpcObject;
const arsenalPackage = phalanxPackage.arsenal as GrpcObject;
const lighthousePackage = arsenalPackage.lighthouse as GrpcObject;
export const navigatorPackage = lighthousePackage.navigator as GrpcObject;

const navigatorConstructor =
  navigatorPackage.NavigatorService as ServiceClientConstructor;

export var client = new navigatorConstructor(
  process.env.NAVIGATOR_SERVICE_URL || "localhost:9005",
  gRPC.credentials.createInsecure()
);
