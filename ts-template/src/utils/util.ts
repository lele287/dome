import moment from "moment";
import md5Encode from "../plugins/md5";
import { TOKEN_KEY } from "../config";
import store from "../store";

let id = 1;
/**
 * Return a unique numeric id, starting at 1 and incrementing with
 * each call.
 *
 * @returns unique numeric id.
 * @private
 */
export function uniqueId(): number {
  return id++;
}
/**
 *
 *
 * @returns unique tring id.
 * @private
 */
export function uniqueStringId(prx: string = "cus"): string {
  const tmp = id++;
  return `${prx}-${tmp}`;
}
/****
 * @description 判断是否为空字符串
 * @param {string} s 输入字符串
 * @returns {boolean} true 表示空字符串
 */
export function isEmptyStr(s: string): boolean {
  if (s == null || s == undefined) {
    return true;
  }
  s = s.trim();
  return s.length == 0 ? true : false;
}

/****
 * @description 判断类型是否为数组
 * @returns {boolean}
 */
export function isArray(val: any): boolean {
  return Object.prototype.toString.call(val) === "[object Array]";
}
/****
 * @description 判断类型是否为字符串
 * @returns {boolean}
 */
export function isString(val: any): boolean {
  return Object.prototype.toString.call(val) === "[object String]";
}
/****
 * @description 判断类型是否为字符串
 * @returns {boolean}
 */
export function isNumber(val: any): boolean {
  return Object.prototype.toString.call(val) === "[object Number]";
}
/****
 * @description 判断类型是否为布尔
 * @returns {boolean}
 */
export function isBoolean(val: any): boolean {
  return Object.prototype.toString.call(val) === "[object Boolean]";
}
/***
 * @description 获取当前日期
 * @param {string} format 日期格式化
 * @returns {string} 返回日期字符串
 */
export function nowDate(format: string = "YYYY-MM-DD"): string {
  return moment().format(format);
}
/***
 * @description 格式化日期
 * @param {string} format 日期格式化
 * @returns {string} 返回日期字符串
 */
export function fortmatDate(date: any, format: string = "YYYY-MM-DD"): string {
  if (moment(date).isValid()) {
    return moment(date).format(format);
  } else {
    return "";
  }
}
/***
 * @description 获取当前时间之前差
 * @param {string} format 日期格式化
 * @returns {string} 返回日期字符串
 */
export function sub(
  diff: number,
  unitOfTime: any = "d",
  format: string = "YYYY-MM-DD"
): string {
  return moment().subtract(diff, unitOfTime).format(format);
}

export function bind(fn, obj, ...args) {
  const slice = Array.prototype.slice;

  if (fn.bind) {
    return fn.bind.apply(fn, ...slice.call(args, 1));
  }

  const args2 = slice.call(args, 2);

  return function () {
    return fn.apply(
      obj,
      ...(args2.length ? args2.concat(slice.call(args)) : args)
    );
  };
}
let lastTime = 0;
// fallback for IE 7-8
function timeoutDefer(fn) {
  const time = +new Date();
  const timeToCall = Math.max(0, 16 - (time - lastTime));

  lastTime = time + timeToCall;
  return window.setTimeout(fn, timeToCall);
}
function getPrefixed(name) {
  return window["webkit" + name] || window["moz" + name] || window["ms" + name];
}
export const requestFn =
  window.requestAnimationFrame ||
  getPrefixed("RequestAnimationFrame") ||
  timeoutDefer;
export const cancelFn =
  window.cancelAnimationFrame ||
  getPrefixed("CancelAnimationFrame") ||
  getPrefixed("CancelRequestAnimationFrame") ||
  function (id) {
    window.clearTimeout(id);
  };

export function requestAnimFrame(fn, context, immediate) {
  if (immediate && requestFn === timeoutDefer) {
    fn.call(context);
  } else {
    return requestFn.call(window, bind(fn, context));
  }
}

// @function cancelAnimFrame(id: Number): undefined
// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
export function cancelAnimFrame(id) {
  if (id) {
    cancelFn.call(window, id);
  }
}

export function md5(val: string): string {
  return md5Encode(val);
}
/***
 * @description 获取url query后面的参数
 * @returns {string}
 */
export function getQueryString(name: string): string {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
export function serviceKey(type: string): string {
  return `service_${type}`;
}
/***
 * @description 获取服务接口url
 * @param {string} host 服务主机
 * @param {string} subUrl 服务二级主目录
 * @param {string} moduleUrl 具体服务url
 * @param {object} query k-v内容
 * @param {boolean} needToken 是否需要token
 * @returns {string} 返回字符串
 *
 */
export function formatServiceUrl(
  host: string,
  subUrl: string,
  moduleUrl: string = "",
  query: any = {},
  needToken: boolean = true
): string {
  if (needToken) {
    query[TOKEN_KEY] = store.state.accessToken;
  }
  const keys = Object.keys(query) || [];
  const len = keys ? keys.length : 0;
  let sQuery = "";
  keys.forEach((key, index) => {
    if (index + 1 == len) {
      sQuery += key + "=" + query[key];
    } else {
      sQuery += key + "=" + query[key] + "&";
    }
  });
  const mainUrl: string = `${host}${subUrl}`;
  let url: string = mainUrl;
  if (moduleUrl) {
    url = mainUrl + `${moduleUrl}`;
  }
  if (sQuery) {
    url += `?${sQuery}`;
  }
  return url;
}
