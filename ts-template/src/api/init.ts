import request, { CustomResponse } from "./request";
import { rasterManage } from "../config";
import * as util from "@/utils/util";

const { host, subUrl } = rasterManage;
export default {
  /***
   * @description 获取区域信息
   */
  queryRegion(id: number): Promise<CustomResponse> {
    const url = util.formatServiceUrl(
      host,
      subUrl,
      `/region`,
      { pid: id },
      false
    );
    return request.get(url);
  },
};