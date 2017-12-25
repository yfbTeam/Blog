var express = require("express");
var router = express.Router();
//当我们访问/admin之后，全部都会进入到这个模块来
router.use("/",function(req,res,next){ 
    next();
});
router.get("/",function(req,res,next){
    res.render("admin/index",{});    
});
router.use(require('./user'))
router.use(require('./tag'))
router.use(require('./artType'))
router.use(require('./attribute'))
router.use(require('./article'))
module.exports = router;