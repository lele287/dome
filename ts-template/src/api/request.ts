import axios, { Method, AxiosRequestConfig, ResponseType } from "axios";
import { errorMsg } from "../utils/message";
import { IBase } from "../types";
import * as util from "../utils/util";
import * as localUtil from "../utils/local_util";
import store from "../store";
interface IOptions {
  responseType?: ResponseType;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
}

export interface CustomResponse {
  status?: string;
  command?: string;
  message?: string;
  result?: any;
}
type Params = IBase;
type Headers = IBase;
type Data = IBase;
type CallBack = () => void;

// 定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Canceler;
}
interface Canceler {
  (message?: string): void;
}
// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const value: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (
      value.url === config.url &&
      value.method === config.method &&
      JSON.stringify(value.params) === JSON.stringify(config.params) &&
      JSON.stringify(value.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      value.cancel("cancel");
      // 从数组中移除记录
      if (pending.length > 1) {
        pending.splice(item, 1);
      }
    }
  }
};
// 添加请求拦截器
axios.interceptors.request.use(
  (request) => {
    removePending(request);
    if (["POST", "DELETE", "PUT"].indexOf(request.method.toUpperCase()) >= 0) {
      request.cancelToken = new CancelToken((c) => {
        pending.push({
          url: request.url,
          method: request.method,
          params: request.params,
          data: request.data,
          cancel: c,
        });
      });
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    removePending(response.config);
    const url = response.config.url;
    const isStaticData = false;
    if (isStaticData) {
      return response.data;
    } else {
      if (response.data && response.data.status == "$SUCCESS") {
        return response.data;
      } else {
        // errorMsg("服务处理失败");
        return response.data;
      }
    }
  },
  (err) => {
    if (err && err.response) {
      const response = err.response;
      switch (response.status) {
        case 400:
          err.message = "请求参数错误";
          break;
        case 401:
        case 403:
          err.message = "身份已过期，请重新登录！";
          localUtil.removeAll();
          store.commit("removeAll");
          break;
        //err.message = "未授权，请登录";
        // localUtil.removeAll();
        // store.commit("setToken", "");
        // store.commit("setName", "");
        // store.commit("setAccount", "");
        // router.push({ path: "/login" });
        //break;
        case 404:
          err.message = "请求地址出错";
          break;
        case 408:
          err.message = "请求超时";
          break;
        case 500:
          err.message = "服务器内部错误";
          break;
        case 501:
          err.message = "服务未实现";
          break;
        case 502:
          err.message = "网关错误";
          break;
        case 503:
          err.message = "服务不可用";
          break;
        case 504:
          err.message = "网关超时";
          break;
        case 505:
          err.message = "HTTP版本不受支持";
          break;
        default: {
          err.message = "未定义错误";
          break;
        }
      }
      //errorMsg(err.message);
      //Message.info("AAA");
    } else {
      if (util.isString(err)) {
        err = new Error(err);
      } else {
        if (!err || !err.message) {
          err = new Error("未知错误");
        }
      }
    }
    if (err && err.message != "cancel") {
      errorMsg(err.message);
    }
    return Promise.reject(err);
  }
);

export default {
  all(values: Promise<CustomResponse>[]): Promise<CustomResponse[]> {
    return new Promise((resove) => {
      axios.all(values).then(
        axios.spread((...list) => {
          return resove(list);
        })
      );
    });
  },
  /***
   * @description GET请求
   * @returns {Promise<CustomResponse>}
   */
  get(
    url: string,
    params: Params = {},
    headers: Headers = {},
    opions: IOptions = {
      responseType: "json",
    }
  ): Promise<CustomResponse> {
    return axios.get(url, { params, headers, ...opions });
  },
  /***
   * @description PUT请求
   * @returns {Promise}
   */
  put(
    url: string,
    data: Data = {},
    params: Params = {},
    headers: Headers = {},
    opions: IOptions = {
      responseType: "json",
    }
  ): Promise<CustomResponse> {
    return axios.put(url, data, { params, headers });
  },
  /***
   * @description POST请求
   */
  post(
    url: string,
    data: Data | string = {},
    params: Params = {},
    headers: Headers = {},
    opions: IOptions = {
      responseType: "json",
    }
  ): Promise<CustomResponse> {
    return axios.post(url, data, { params, headers });
  },
  /***
   * @description DELETE请求
   */
  delete(
    url: string,
    data: Data = {},
    params: Params = {},
    headers: Headers = {},
    opions: IOptions = {
      responseType: "json",
    }
  ): Promise<CustomResponse> {
    return axios.delete(url, { data, params, headers });
  },
};
