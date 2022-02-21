/***
 * @description 此模块把全局公共配置文件映射
 */
//忽略全文
// @ts-nocheck
import { IConfig } from "../types";
const config: IConfig = APP_CONFIG;
export const TOKEN_KEY: string = config.tokenKey;

export const {
  crs,
  rasterSources,
  mapOptions,
  userService,
  vectorService,
  rasterService,
  rasterManage,
  crsService,
} = config;

export default config;
