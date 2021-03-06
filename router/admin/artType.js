var express = require('express');
var router = express.Router();
var model = require('../../modles/admin/model');
var type = require('../../schema/admin/ArticleType');
router.get("/typeList/:status",function(req,res,next){
    model.getList(type,{isDelete:req.params.status},function(err,list){
        res.render("admin/type/typeList",{typeList:list});
    })
});
router.get("/addType",function(req,res,next){
    res.render("admin/type/addType",{});
})
router.post("/addType",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    model.addModal(type,req,body,function(err,doc){
        res.redirect('/admin/typeList/0');
    })
});
router.get("/editType/:id",function(req,res,next){
    model.getOne(type,{_id:req.params.id},function(err,type){
        res.render("admin/type/editType",{type:type});
    })
})
router.post('/editType/:id',function(req,res,next){
    model.editModal(type,{_id:req.params.id},req.body,function(err,doc){
        res.redirect('/admin/typeList/0');
    })
   
})
router.get("/deleteType/:id",function(req,res,next){
    model.editModal(type,{_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/typeList/0');
    })
})

module.exports = router;