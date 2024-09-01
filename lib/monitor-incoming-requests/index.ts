import { client } from "./grpc";
import { Options } from "./types";

const monitorIncomingRequests = ({ app, appId, serverId }: Options) => {
  let requestId = "";
  const requestTimestamp = Date.now();

  app.use((req, res, next) => {
    client.reportInbound(
      {
        appId,
        serverId,
        method: req.method,
        url: req.url,
        params: req.params || {},
        body: req.body
          ? {
              type: req.get("Content-Type") || typeof req.body,
              data:
                typeof req.body === "object"
                  ? JSON.stringify(req.body)
                  : req.body,
            }
          : null,
        headers: req.headers || {},
        timestamp: {
          seconds: Math.floor(requestTimestamp / 1000),
          nanos: 0,
        },
      },
      (err: any, response: any) => {
        if (err) {
          console.error("PHALANX: Error in reporting inbound request", err);
          return;
        }
        requestId = response.requestId;
      }
    );

    res.on("finish", () => {
      const endTimestamp = Date.now();

      setTimeout(() => {
        if (requestId) {
          // TODO: Extract body by overriding res.write and res.end
          const body = {};
          const headers = res.getHeaders();

          client.reportResponseToInbound(
            {
              requestId: requestId,
              statusCode: res.statusCode,
              body: {
                type: headers["Content-Type"] || typeof body,
                data: typeof body === "object" ? JSON.stringify(body) : body,
              },
              headers: headers,
              processingTimeMs: endTimestamp - requestTimestamp,
            },
            (err: any) => {
              if (err) {
                console.error(
                  "PHALANX: Error in reporting inbound response",
                  err
                );
                return;
              }
            }
          );
        }
      }, 500);
    });
    next();
  });
};

export default monitorIncomingRequests;
