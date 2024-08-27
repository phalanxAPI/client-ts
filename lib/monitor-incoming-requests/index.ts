import { Options } from "./types";

const monitorIncomingRequests = ({ app, appId, serverId }: Options) => {
  app.use((req, res, next) => {
    console.log("ENDPOINT TEST", req.method, req.url);
    // TODO: Push data to Phalanx Controller

    res.on("finish", () => {
      // TODO: Update data to Phalanx Controller
      console.log("ENDPOINT RESPONSE TEST", res.statusCode);
    });
    next();
  });
};

export default monitorIncomingRequests;
