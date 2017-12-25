var express = require('express');
var router = express.Router();
var articleModel = require('../../modles/admin/article')
var model = require('../../modles/admin/model');
var article = require('../../schema/admin/Article');
var type = require('../../schema/admin/ArticleType');
var tag = require('../../schema/admin/Tag');
var attribute = require('../../schema/admin/Attribute');
router.get("/articleList/:status",function(req,res,next){
    /*
        列表：标题、推荐属性、作者、分类名称（不是ID）、内容、点赞、文章Tag、修改时间
    */ 
    articleModel.getList({isDelete:req.params.status},function(err,art){
        res.render("admin/article/articleList",{art:art});
    });
});
router.get("/addArticle",function(req,res,next){
    //查询分类
    model.getList(type,{isDelete:0},function(err,typeList){
        model.getList(tag,{isDelete:0},function(err,tagList){
            model.getList(attribute,{isDelete:0},function(err,attributeList){
                res.render("admin/article/addArticle",{type:typeList,tag:tagList,attribute:attributeList});
            })
        })
    })
    
});
router.post("/addArticle",function(req,res,next){
   var fields = req.body;
   if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.Tag != "" && fields.content  != ""){
        var data = Object.assign({},fields,{createtime:new Date(),support:0,updatetime:new Date()})  
        model.addModal(article,data,function(err,doc){
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
    model.getOne(article,{_id:req.params.id},function(err,articleList){
        model.getList(type,{isDelete:0},function(err,typeList){
            model.getList(tag,{isDelete:0},function(err,tagList){
                model.getList(attribute,{isDelete:0},function(err,attributeList){
                    res.render("admin/article/editArticle",{article:articleList,type:typeList,tag:tagList,attribute:attributeList});
                })
            })
            
        })
    })
})
router.post('/editArticle/:id',function(req,res,next){
    var data  = Object.assign({},req.body,{updatetime:new Date()});
    model.editModal(article,{_id:req.params.id},data,function(err,doc){
        res.redirect('/admin/articleList/0');
    })
})
router.get("/deleteArticle/:id",function(req,res,next){
    model.editModal(article,{_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/articleList/0');
    })
})
module.exports = router;