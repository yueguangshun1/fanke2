var express = require('express');
var router = express.Router();

var Product = require("../models/product");
var Category = require("../models/category");
var myPro = new Product()
var myCate = new Category()
/* GET product api. */
router.get('/', function(req, res, next) {
  res.send("商品的接口")
});

//商品列表
router.get('/getListData', function(req, res, next) {
  console.log(req.query) 
    myPro.getListData(req.query,function(listData){
      res.send(JSON.stringify(listData))
    })
});


router.post('/add', function(req, res, next) {
  myPro.add(req.body,function(err){
    res.send({
      msgCode:err?2:1,
      err
    })
  })
});
//商品详情
router.get('/getDetailData', function(req, res, next) {
  console.log(req.query)
  myPro.getDetailData(req.query,function(detailDate){
    console.log("success")
    res.send(detailDate)
  })
  
});

//首页商品
router.get('/getHomeData', function(req, res, next) {
  var listData = [
    {
      name:1
      
    },
    {
      name:2
    }
  ]
  res.send(JSON.stringify(listData))
});


module.exports = router;
