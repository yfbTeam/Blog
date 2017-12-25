var express = require('express');
var router = express.Router();
var model = require('../../modles/admin/model');
var attribute = require('../../schema/admin/Attribute');
router.get('/attributeList/:status',function(req,res,next){
    model.getList(attribute,{isDelete:req.params.status},function(err,list){
        res.render("admin/attribute/index",{attributeList:list});
    })
})
router.get("/addAttribute",function(req,res,next){
    res.render("admin/attribute/createModal",{});
})
router.post("/addAttribute",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    model.addModal(attribute,req.body,function(err,doc){
        res.redirect('/admin/attributeList/0');
    })
});
router.get("/editAttribute/:id",function(req,res,next){
    model.getOne(attribute,{_id:req.params.id},function(err,doc){
        res.render("admin/attribute/editModal",{attribute:doc});
    })
})
router.post('/editAttribute/:id',function(req,res,next){
    model.editModal(attribute,{_id:req.params.id},req.body,function(err,doc){
        res.redirect('/admin/attributeList/0');
    })
})
router.get("/deleteAttribute/:id",function(req,res,next){
    model.editModal(attribute,{_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/attributeList/0');
    })
})


module.exports = router;