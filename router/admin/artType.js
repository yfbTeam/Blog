var express = require('express');
var router = express.Router();
var ArticleType = require('../../schema/admin/ArticleType');

router.get("/typeList/:status",function(req,res,next){
    ArticleType.find({isDelete:req.params.status},function(err,list){
        if(err){
            return
        }
        res.render("admin/type/typeList",{typeList:list});
    })
    
});
router.get("/addType",function(req,res,next){
    res.render("admin/type/addType",{});
})
router.post("/addType",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    ArticleType.create(req.body,function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/typeList/0');
    });
});
router.get("/editType/:id",function(req,res,next){
    ArticleType.findOne({_id:req.params.id},function(err,type){
        res.render("admin/type/editType",{type:type});
    })
    
})
router.post('/editType/:id',function(req,res,next){
    ArticleType.update({_id:req.params.id},{
        $set:req.body
    },function(err,doc){
        if(err){
            return
        }
       //res.send(doc)
        //res.send("插入成功");
        res.redirect('/admin/typeList/0');
    });
})
router.get("/deleteType/:id",function(req,res,next){
    ArticleType.update({_id:req.params.id},{
        $set:{
            isDelete:1
        }
    },function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/typeList/0');
    });
})

module.exports = router;