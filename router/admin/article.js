var express = require('express');
var router = express.Router();
var Article = require("../../schema/admin/Article.js");
router.get("/articleList/:status",function(req,res,next){
    /*
        列表：标题、推荐属性、作者、分类名称（不是ID）、内容、点赞、文章Tag、修改时间
    */
   
    var status = req.params.status;
    
    Article.find({isDelete:status}).populate("type").populate('Tag').populate('attribute').exec(function(err,art){
        if(err){
            return
        }
       res.render("admin/article/articleList",{art:art});
    });
});

router.get("/addArticle",function(req,res,next){
   
    //查询分类
    ArticleType.find({isDelete:0},function(err,type){
        Tag.find({isDelete:0},function(err,tag){
            Attribute.find({isDelete:0},function(err,attribute){
                res.render("admin/article/addArticle",{type:type,tag:tag,attribute:attribute});
            })
        })
    });
    
    
    
});

router.post("/addArticle",function(req,res,next){
   var fields = req.body;
   if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.Tag != "" && fields.content  != ""){
    var data = Object.assign({},fields,{createtime:new Date(),support:0,updatetime:new Date()})  
    
    Article.create(data,function(err,doc){
            if(err){
                return
            }
            //res.send("插入成功");
            res.redirect('/admin/articleList/0');
        });
    }else{
        res.send("填写不及格，请继续填写");
    }
});
router.get('/editArticle/:id',function(req,res,next){
    
    Article.findOne({_id:req.params.id},function(err,article){
        ArticleType.find({isDelete:0},function(err,type){
            Tag.find({isDelete:0},function(err,tag){
                Attribute.find({isDelete:0},function(err,attribute){
                    res.render("admin/article/editArticle",{article:article,type:type,tag:tag,attribute:attribute});
                })
            })
        });
    })

    
})
router.post('/editArticle/:id',function(req,res,next){
    var data  = Object.assign({},req.body,{updatetime:new Date()});
    console.log(util.inspect(data))
    Article.update({_id:req.params.id},{
        $set:data
    },function(err,doc){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/admin/articleList/0');
    })
    
})
router.get("/deleteArticle/:id",function(req,res,next){
    
    Article.update({_id:req.params.id},{
        $set:{
            isDelete:1
        }
    },function(err,doc){
        if(err){
            return
        }
        res.redirect('/admin/articleList/0');
    });
})

module.exports = router;