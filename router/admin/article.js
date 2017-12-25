var express = require('express');
var router = express.Router();
var articleModal = require('../../modles/admin/article');
var typeModal = require('../../modles/admin/type');
var tagModal = require('../../modles/admin/tag');
var attributeModal = require('../../modles/admin/attribute')
router.get("/articleList/:status",function(req,res,next){
    /*
        列表：标题、推荐属性、作者、分类名称（不是ID）、内容、点赞、文章Tag、修改时间
    */ 
    articleModal.getList({isDelete:req.params.status},function(err,art){
        res.render("admin/article/articleList",{art:art});
    });
});
router.get("/addArticle",function(req,res,next){
    //查询分类
    typeModal.getList({isDelete:0},function(err,typeList){
        tagModal.getList({isDelete:0},function(err,tagList){
            attributeModal.getList({isDelete:0},function(err,attributeList){
                console.log(attributeList)
                res.render("admin/article/addArticle",{type:typeList,tag:tagList,attribute:attributeList});
            })
        })
    })
    
});
router.post("/addArticle",function(req,res,next){
   var fields = req.body;
   if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.Tag != "" && fields.content  != ""){
        var data = Object.assign({},fields,{createtime:new Date(),support:0,updatetime:new Date()})  
        articleModal.addModal(data,function(err,doc){
            if(err){
                return
            }
            res.redirect('/admin/articleList/0');
        })
    }else{
        res.send("填写不及格，请继续填写");
    }
});
router.get('/editArticle/:id',function(req,res,next){
    articleModal.getOne({_id:req.params.id},function(err,articleList){
        typeModal.getList({isDelete:0},function(err,typeList){
            tagModal.getList({isDelete:0},function(err,tagList){
                attributeModal.getList({isDelete:0},function(err,attributeList){
                    res.render("admin/article/editArticle",{article:articleList,type:typeList,tag:tagList,attribute:attributeList});
                })
            })
            
        })
    })
})
router.post('/editArticle/:id',function(req,res,next){
    var data  = Object.assign({},req.body,{updatetime:new Date()});
    articleModal.editModal({_id:req.params.id},data,function(err,doc){
        res.redirect('/admin/articleList/0');
    })
})
router.get("/deleteArticle/:id",function(req,res,next){
    articleModal.editModal({_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/articleList/0');
    })
})
module.exports = router;