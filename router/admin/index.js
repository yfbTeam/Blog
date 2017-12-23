var express = require("express");

var router = express.Router();

var util = require("util");
var formidable = require("formidable");

var ArticleType = require("../../schema/admin/ArticleType.js");

var Article = require("../../schema/admin/Article.js");

//当我们访问/admin之后，全部都会进入到这个模块来

router.use("/",function(req,res,next){ 
    /*
    //权限控制
    if(req.isAdmin){
        return;
    }*/
    next();
});

router.get("/",function(req,res,next){
    res.render("admin/index",{});    
});

router.get("/articleList/:status",function(req,res,next){
    /*
        列表：标题、推荐属性、作者、分类名称（不是ID）、内容、点赞、文章Tag、修改时间
    */
    var status = req.params.status;
    Article.find({isDelete:status}).populate("type").exec(function(err,art){
        if(err){
            console.log(err);
            return
        }
        console.log(art);
        res.render("admin/articleList",{art:art});
    });
});

router.get("/addArticle",function(req,res,next){
    //查询分类
    ArticleType.find({},function(err,result){
        res.render("admin/addArticle",{type:result});
    });
});

router.post("/addArticle",function(req,res,next){
   var fields = req.body;
   if(fields.title != "" && fields.author != "" && fields.type != "" && fields.read != "" && fields.tag != "" && fields.content  != ""){
        Article.create(fields,function(err,doc){
            if(err){
                console.log(err);
                return
            }
            //res.send("插入成功");
            res.redirect('/admin/articleList/0');
        });
    }else{
        res.send("填写不及格，请继续填写");
    }
});
router.get("/deleteArticle/:id",function(req,res,next){
    
    Article.update({_id:req.params.id},{
        $set:{
            isDelete:1
        }
    },function(err,doc){
        if(err){
            console.log(err);
            return
        }
        console.log(doc)
        res.redirect('/admin/articleList/0');
    });
})
router.get("/typeList/:status",function(req,res,next){
    ArticleType.find({isDelete:req.params.status},function(err,list){
        if(err){
            console.log(err);
            return
        }
        res.render("admin/typeList",{typeList:list});
    })
    
});
router.get("/addType",function(req,res,next){
    res.render("admin/addType",{});
})
router.post("/addType",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    ArticleType.create(req.body,function(err,doc){
        if(err){
            console.log(err);
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/typeList/0');
    });
});
router.get("/editType/:typename",function(req,res,next){

    res.render("admin/editType",{typename:req.params.typename});
})
router.post('/editType',function(req,res,next){
    ArticleType.update(req.body,function(err,doc){
        if(err){
            console.log(err);
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/typeList/0');
    });
})
router.get("/deleteType/:typename",function(req,res,next){
    ArticleType.update({typename:req.params.typename},{
        $set:{
            isDelete:1
        }
    },function(err,doc){
        if(err){
            console.log(err);
            return
        }
        console.log(doc)
        //res.send("插入成功");
        res.redirect('/admin/typeList/0');
    });
})
module.exports = router;

























