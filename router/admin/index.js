var express = require("express");

var router = express.Router();

var userRouter = require('./user')
var tagRouter = require('./tag')
var typeRouter  =require('./artType')
var attributeRouter = require('./attribute')
var articleRouter = require('./article')
//当我们访问/admin之后，全部都会进入到这个模块来

router.use("/",function(req,res,next){ 
    next();
});

router.get("/",function(req,res,next){
    res.render("admin/index",{});    
});

router.use(userRouter)
router.use(tagRouter)
router.use(typeRouter)
router.use(attributeRouter)
router.use(articleRouter)

module.exports = router;