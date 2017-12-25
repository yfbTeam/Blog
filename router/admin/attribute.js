var express = require('express');
var router = express.Router();
var attributeModal = require('../../modles/admin/attribute');
router.get('/attributeList/:status',function(req,res,next){
    attributeModal.getList({isDelete:req.params.status},function(err,list){
        res.render("admin/attribute/index",{attributeList:list});
    })
})
router.get("/addAttribute",function(req,res,next){
    res.render("admin/attribute/createModal",{});
})
router.post("/addAttribute",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    attributeModal.addModal(req.body,function(err,doc){
        res.redirect('/admin/attributeList/0');
    })
});
router.get("/editAttribute/:id",function(req,res,next){
    attributeModal.getOne({_id:req.params.id},function(err,doc){
        res.render("admin/attribute/editModal",{attribute:doc});
    })
})
router.post('/editAttribute/:id',function(req,res,next){
    attributeModal.editModal({_id:req.params.id},req.body,function(err,doc){
        res.redirect('/admin/attributeList/0');
    })
})
router.get("/deleteAttribute/:id",function(req,res,next){
    attributeModal.editModal({_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/attributeList/0');
    })
})


module.exports = router;