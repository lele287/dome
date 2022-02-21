/**
 *  接口定义
 */
export interface IBase {
  [propName: string]: any;
}
export interface IAny {
  [propName: string]: any;
}
export interface IServer {
  host: string;
  subUrl: string;
}
export interface IState {
  accessToken: string;
}
export interface IConfig {
  userService: IServer;
  rasterService: IServer;
  rasterManage: IServer;
  vectorService: IServer;
  crsService: IServer;
  token: string;
  tokenKey: string;
  [propName: string]: any;
}
export interface IRasterSource {
  type?: string;
  minzoom?: number;
  zoomOffset?: number;
  maxzoom?: number;
  tileSize?: number;
  tiles?: string[];
  [propName: string]: any;
}
export interface IRasterLayer {
  id?: string;
  type?: string;
  source?: string;
  minzoom?: number;
  maxzoom?: number;
  [propName: string]: any;
}
export interface IBound {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
