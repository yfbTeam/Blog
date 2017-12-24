var express = require("express");

var router = express.Router();

var util = require("util");

var ArticleType = require("../../schema/admin/ArticleType.js");

var Article = require("../../schema/admin/Article.js");
var User = require("../../schema/admin/User.js");
var Tag = require("../../schema/admin/Tag.js");
var Attribute = require('../../schema/admin/Attribute.js')
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
    
    Article.find({isDelete:status}).populate("type").populate('Tag').populate('attribute').exec(function(err,art){
        if(err){
            console.log(err)
            return
        }
        console.log(art)
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
                console.log(err)  
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

    Article.update({_id:req.params.id},{
        $set:data
    },function(err,doc){
        if(err){
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

router.get('/userList/:status',function(req,res,next){
    User.find({isDelete:req.params.status},function(err,list){
        res.render("admin/user/index",{userList:list});
    })
    
    /* User.find({isDelete:req.params.status},function(err,result){
        
    }); */
})
router.get("/addUser",function(req,res,next){
    res.render("admin/user/createModal",{});
})
router.post("/addUser",function(req,res,next){
    var data = Object.assign({},req.body,{regtime:new Date(),updatetime:new Date()})
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    User.create(data,function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/userList/0');
    });
});
router.get("/editUser/:id",function(req,res,next){
    User.findOne({_id:req.params.id},function(err,doc){
        res.render("admin/user/editModal",{user:doc});
    })
})
router.post('/editUser/:id',function(req,res,next){
    var data = Object.assign({},req.body,{updatetime:new Date()});
    User.update({_id:req.params.id},{
        $set:data
    },function(err,doc){
        if(err){
            return
        }
       //res.send(doc)
        //res.send("插入成功");
        res.redirect('/admin/userList/0');
    });
})
router.get("/deleteUser/:id",function(req,res,next){
    User.update({_id:req.params.id},{
        $set:{
            isDelete:1
        }
    },function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/userList/0');
    });
})

router.get('/tagList/:status',function(req,res,next){
    Tag.find({isDelete:req.params.status},function(err,list){
        res.render("admin/tag/index",{tagList:list});
    })
})
router.get("/addTag",function(req,res,next){
    res.render("admin/tag/createModal",{});
})
router.post("/addTag",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    Tag.create(req.body,function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/tagList/0');
    });
});
router.get("/editTag/:id",function(req,res,next){
    Tag.findOne({_id:req.params.id},function(err,doc){
        res.render("admin/tag/editModal",{tag:doc});
    })
})
router.post('/editTag/:id',function(req,res,next){
    Tag.update({_id:req.params.id},{
        $set:req.body
    },function(err,doc){
        if(err){
            return
        }
        res.redirect('/admin/tagList/0');
    })
})
router.get("/deleteTag/:id",function(req,res,next){
    Tag.update({_id:req.params.id},{
        $set:{
            isDelete:1
        }
    },function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/tagList/0');
    });
})

router.get('/attributeList/:status',function(req,res,next){
    Attribute.find({isDelete:req.params.status},function(err,list){
        res.render("admin/attribute/index",{attributeList:list});
    })
})
router.get("/addAttribute",function(req,res,next){
    res.render("admin/attribute/createModal",{});
})
router.post("/addAttribute",function(req,res,next){
    //简单的操作是可以直接在这个路由文件中写，如果有稍微复杂的处理逻辑，那么还是应该放在业务层去处理
    Attribute.create(req.body,function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/attributeList/0');
    });
});
router.get("/editAttribute/:id",function(req,res,next){
    Attribute.findOne({_id:req.params.id},function(err,doc){
        res.render("admin/attribute/editModal",{attribute:doc});
    })
})
router.post('/editAttribute/:id',function(req,res,next){
    Attribute.update({_id:req.params.id},{
        $set:req.body
    },function(err,doc){
        if(err){
            return
        }
        res.redirect('/admin/attributeList/0');
    })
})
router.get("/deleteAttribute/:id",function(req,res,next){
    Attribute.update({_id:req.params.id},{
        $set:{
            isDelete:1
        }
    },function(err,doc){
        if(err){
            return
        }
        //res.send("插入成功");
        res.redirect('/admin/attributeList/0');
    });
})

module.exports = router;

























