var APP_CONFIG = {
  crs: {
    code: "EPSG:4326",
  },
  mapOptions: {
    zoom: 1,
    center: [0, 0],
    minZoom: 0,
    maxZoom: 18,
  },
  rasterSources: [
    {
      type: "raster",
      minzoom: 0,
      zoomOffset: 1,
      maxzoom: 17,
      tileSize: 256,
      tiles: [
        "http://t1.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t2.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e90d56e5a09d1767899ad45846b0cefd",
        "http://t3.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e90d56e5a09d1767899ad45846b0cefd",
      ],
    },
  ],
  userService: {
    host: "http://192.168.1.145:8061", //用户服务主机
    subUrl: "/seuser/v1/api",
  },
  rasterService: {
    host: "http://192.168.1.145:9090", //影像服务主机
    subUrl: "/seraster/v1",
  },
  rasterManage: {
    host: "http://192.168.1.145:9080", //影像管理主机
    subUrl: "/seraster/v1/api",
  },
  vectorService: {
    host: "http://192.168.1.155:8080", //矢量主机
    subUrl: "/sevector/v1",
  },
  crsService: {
    host: "http://192.168.1.145:8062", //坐标系
    subUrl: "/secrs/v1/api",
  },
  //token: "mk.7be49279ea411a18dd6aface64ede5a2",
  tokenKey: "access_token",
};
