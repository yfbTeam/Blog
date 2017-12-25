var express = require('express');
var router = express.Router();
var tagModal = require('../../modles/admin/tag')
router.get('/tagList/:status',function(req,res,next){
    tagModal.getList({isDelete:req.params.status},function(err,list){
        res.render("admin/tag/index",{tagList:list});
    })
    
})
router.get("/addTag",function(req,res,next){
    res.render("admin/tag/createModal",{});
})
router.post("/addTag",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    tagModal.addModal(req.body,function(err,doc){
        res.redirect('/admin/tagList/0');
    })
});
router.get("/editTag/:id",function(req,res,next){
    tagModal.getOne({_id:req.params.id},function(err,doc){
        res.render("admin/tag/editModal",{tag:doc});
    })
})
router.post('/editTag/:id',function(req,res,next){
    tagModal.editModal({_id:req.params.id},req.body,function(err,doc){
        res.redirect('/admin/tagList/0');
    })
})
router.get("/deleteTag/:id",function(req,res,next){
    tagModal.editModal({_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/tagList/0');
    })
})

module.exports = router;