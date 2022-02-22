var fs = require("fs");
var express = require("express");
var multer = require("multer");
var path = require("path");
var router = express.Router();

var upload = multer({ dest: "public/images/" });

router.post("/", upload.any(), function (req, res, next) {
//   console.log(req.files); // 上传的文件信息
  req.files.map((file) => {
    const oldpath = path.join(__dirname, "..", file.path);
    const newpath = path.join(
      __dirname,
      "..",
      "/public/images/ " + file.originalname
    );
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.error("改名失败" + err);
      }
    });
  });
  res.json({ code: 200, msg: "ok" });
});

module.exports = router;
