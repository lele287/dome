var express = require('express');
var router = express.Router();

//这个路由可以设置用户
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello world');
});


module.exports = router;
