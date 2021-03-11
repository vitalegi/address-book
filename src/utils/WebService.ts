import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { timestamp } from "@/utils/TimeUtil";

import { factory } from "@/utils/ConfigLog4j";
const logger = factory.getLogger("Utils.WebService");

export type Method =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch"
  | "link"
  | "unlink"
  | "GET"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "LINK"
  | "UNLINK"
  | undefined;

export type ResponseType =
  | "json"
  | "arraybuffer"
  | "blob"
  | "document"
  | "text"
  | "stream"
  | undefined;

export class WebService {
  private _url = "";
  private _method: Method = undefined;
  private _headers: any = {};
  private _responseType: ResponseType = "json";
  private _spinner = true;

  public constructor(url = "") {
    this.url(url);
  }
  private _requestSerializer(request: object | undefined): any {
    if (request == undefined) {
      return undefined;
    }
    return JSON.stringify(request);
  }

  public url(url: string): WebService {
    this._url = url;
    return this;
  }
  public header(name: string, value: string): WebService {
    this._headers[name] = value;
    return this;
  }
  public responseType(responseType: ResponseType): WebService {
    this._responseType = responseType;
    return this;
  }
  public headerJson(): WebService {
    this.header("Content-Type", "application/json; charset=utf-8");
    return this;
  }
  public method(method: Method): WebService {
    this._method = method;
    return this;
  }
  public get(): WebService {
    return this.method("get");
  }
  public delete(): WebService {
    return this.method("delete");
  }
  public post(): WebService {
    return this.method("post");
  }
  public put(): WebService {
    return this.method("put");
  }
  public patch(): WebService {
    return this.method("patch");
  }
  public requestSerializer(serializer: (request: object) => any): WebService {
    this._requestSerializer = serializer;
    return this;
  }

  public spinner(spinner: boolean): WebService {
    this._spinner = spinner;
    return this;
  }

  public call(payload: object | undefined = undefined) {
    const startTime = timestamp();
    const instance = axios.create();

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      logger.debug(`WS_CALL_START uri=${config.url}`);
      return config;
    });
    instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const duration = timestamp() - startTime;
        logger.info(
          `WS_CALL_SUCCESS uri=${response.config.url} duration=${Math.round(
            duration
          )} status=${response.status} statusText=${response.statusText}`
        );
        return response;
      },
      (error: any) => {
        const duration = timestamp() - startTime;
        logger.error(
          () => `WS_CALL_FAILURE uri=${error.config.url} duration=${duration}`
        );
        throw { data: error.response.data };
      }
    );

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    });

    instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        return response;
      },
      (error: any) => {
        throw error;
      }
    );
    const serializedPayload = this._requestSerializer(payload);
    return instance({
      url: this._url,
      method: this._method,
      headers: this._headers,
      responseType: this._responseType,
      data: serializedPayload,
    });
  }
}

export class BackendWebService extends WebService {
  public constructor() {
    super();
    if (localStorage.getSecret()) {
      this.header("X-Secret", localStorage.getSecret());
    }

    if (localStorage.getPlayerId() >= 0) {
      logger.info("user is logged, add auth header");
      this.header("userId", "" + localStorage.getPlayerId());
    }
  }
  public url(url: string): WebService {
    const fullUrl = process.env.VUE_APP_BACKEND_API + url;
    logger.debug(`URL: ${url} WindowLocation: ${window.location}`);
    return super.url(fullUrl);
  }
}
