import type { AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios";

export const interceptAxiosMethods = (
  parentAxiosStatic: AxiosStatic,
  appId: string,
  serverId: string
) => {
  const parentGet = parentAxiosStatic.get;
  const parentPost = parentAxiosStatic.post;
  const parentPut = parentAxiosStatic.put;
  const parentDelete = parentAxiosStatic.delete;
  const parentPatch = parentAxiosStatic.patch;

  parentAxiosStatic.get = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("GET Request Intercepted");
    // TODO: Push data to Phalanx Controller
    return parentGet<T>(url, config) as R;
  };

  parentAxiosStatic.post = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("POST Request Intercepted");
    // TODO: Push data to Phalanx Controller
    return parentPost<T>(url, data, config) as R;
  };

  parentAxiosStatic.put = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("PUT Request Intercepted");
    // TODO: Push data to Phalanx Controller
    return parentPut<T>(url, data, config) as R;
  };

  parentAxiosStatic.delete = async <
    T = any,
    R = AxiosResponse<T, any>,
    D = any
  >(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("DELETE Request Intercepted");
    // TODO: Push data to Phalanx Controller
    return parentDelete<T>(url, config) as R;
  };

  parentAxiosStatic.patch = async <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> => {
    console.log("PATCH Request Intercepted");
    // TODO: Push data to Phalanx Controller
    return parentPatch<T>(url, data, config) as R;
  };
};
