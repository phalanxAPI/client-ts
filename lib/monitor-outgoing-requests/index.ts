import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { client } from "./grpc";
import { Options } from "./types";

const monitorRequest = async ({
  appId,
  serverId,
  method,
  url,
  reqBody = {},
  reqParams = {},
  reqHeaders = {},
  resBody = {},
  resHeaders = {},
  statusCode,
  timestamp,
  duration,
}: {
  appId: string;
  serverId: string;
  method: string;
  url: string;
  reqBody: Record<string, any>;
  reqParams: Record<string, any>;
  reqHeaders: Record<string, any>;
  resBody: Record<string, any>;
  resHeaders: Record<string, any>;
  statusCode: number;
  timestamp: number;
  duration: number;
}) => {
  reqHeaders = JSON.parse(JSON.stringify(reqHeaders));
  reqBody = {
    bodyType: typeof reqBody,
    data: typeof reqBody === "object" ? JSON.stringify(reqBody) : reqBody,
  };

  resHeaders = JSON.parse(JSON.stringify(resHeaders));
  resBody = {
    bodyType: typeof resBody,
    data: typeof resBody === "object" ? JSON.stringify(resBody) : resBody,
  };

  await new Promise<void>((resolve, reject) => {
    client.reportOutbound(
      {
        appId,
        serverId,
        method,
        url,
        reqBody,
        reqParams,
        reqHeaders,
        resBody,
        resHeaders,
        statusCode,
        duration,
        timestamp: {
          seconds: Math.floor(timestamp / 1000),
          nanos: 0,
        },
      },
      (err: any, response: any) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve();
      }
    );
  });
};

export const monitorOutgoingRequests = ({
  axios: parentAxiosStatic,
  appId,
  serverId,
}: Options) => {
  const parentGet = parentAxiosStatic.get;
  const parentPost = parentAxiosStatic.post;
  const parentPut = parentAxiosStatic.put;
  const parentDelete = parentAxiosStatic.delete;
  const parentPatch = parentAxiosStatic.patch;

  parentAxiosStatic.get = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    console.log("GET Request Intercepted", url);

    const start = Date.now();
    const response = await parentGet<T>(url, config);
    await monitorRequest({
      appId,
      serverId,
      method: "GET",
      url,
      reqBody: {},
      reqParams: config?.params || {},
      reqHeaders: config?.headers || {},
      resBody: response.data as Record<string, any>,
      resHeaders: response.headers,
      statusCode: response.status,
      timestamp: start,
      duration: Date.now() - start,
    });

    return response as R;
  };

  parentAxiosStatic.post = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("POST Request Intercepted", url);

    const start = Date.now();
    const response = await parentPost<T>(url, data, config);
    await monitorRequest({
      appId,
      serverId,
      method: "POST",
      url,
      reqBody: data || {},
      reqParams: config?.params || {},
      reqHeaders: config?.headers || {},
      resBody: response.data as Record<string, any>,
      resHeaders: response.headers,
      statusCode: response.status,
      timestamp: start,
      duration: Date.now() - start,
    });

    return response as R;
  };

  parentAxiosStatic.put = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("PUT Request Intercepted", url);

    const start = Date.now();
    const response = await parentPut<T>(url, data, config);
    await monitorRequest({
      appId,
      serverId,
      method: "PUT",
      url,
      reqBody: data || {},
      reqParams: config?.params || {},
      reqHeaders: config?.headers || {},
      resBody: response.data as Record<string, any>,
      resHeaders: response.headers,
      statusCode: response.status,
      timestamp: start,
      duration: Date.now() - start,
    });

    return response as R;
  };

  parentAxiosStatic.delete = async <
    T = any,
    R = AxiosResponse<T, any>,
    D = any
  >(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("DELETE Request Intercepted", url);

    const start = Date.now();
    const response = await parentDelete<T>(url, config);
    await monitorRequest({
      appId,
      serverId,
      method: "DELETE",
      url,
      reqBody: {},
      reqParams: config?.params || {},
      reqHeaders: config?.headers || {},
      resBody: response.data as Record<string, any>,
      resHeaders: response.headers,
      statusCode: response.status,
      timestamp: start,
      duration: Date.now() - start,
    });

    return response as R;
  };

  parentAxiosStatic.patch = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("PATCH Request Intercepted", url);

    const start = Date.now();
    const response = await parentPatch<T>(url, data, config);
    await monitorRequest({
      appId,
      serverId,
      method: "PATCH",
      url,
      reqBody: data || {},
      reqParams: config?.params || {},
      reqHeaders: config?.headers || {},
      resBody: response.data as Record<string, any>,
      resHeaders: response.headers,
      statusCode: response.status,
      timestamp: start,
      duration: Date.now() - start,
    });

    return response as R;
  };
};
