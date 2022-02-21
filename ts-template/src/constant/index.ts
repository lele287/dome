/***
 * @description 常量结构
 * @author LJ 2021-11-08
 */
import { IBase } from "../types";
//服务类型
export enum ServiceType {
  IMAGE = "image", //影像服务
  VECTOR_MAP = "vector_map", //矢量地图
  IMAGE_TF = "image_tf", //影像图幅服务
}
export enum PROJ_CODE {
  EPSG4326 = "EPSG:4326",
  EPSG3857 = "EPSG:3857",
}
export interface IGeometry {
  type?: string;
  coordinates?: any;
}
export interface IFeature {
  type?: string;
  properties?: IBase;
  geometry?: IGeometry;
}
