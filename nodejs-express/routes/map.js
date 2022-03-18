var express = require("express");
var router = express.Router();
var tilelive = require("tilelive");
require("node-mbtiles").registerProtocols(tilelive);

// 放置的矢量瓦片数据位置
tilelive.load("mbtiles:///Boundary _1104162417.dbf", function (err, source) {
  if (err) {
    throw err;
  }

  //访问的url是：http://localhost:7777/tiles/{z}/{x}/{y}.pbf
  router.get(/^\/tiles\/(\d+)\/(\d+)\/(\d+).pbf$/, function (req, res) {
    var z = req.params[0];
    var x = req.params[1];
    var y = req.params[2];
    console.log("get tile %d, %d, %d", z, x, y);

    source.getTile(z, x, y, function (err, tile, headers) {
      if (err) {
        res.status(404);
        res.send(err.message);
        console.log(err.message);
      } else {
        res.set(headers);
        res.send(tile);
      }
    });
  });
});

module.exports = router;
