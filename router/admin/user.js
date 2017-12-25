var express = require('express');
var router = express.Router();
var User = require("../../schema/User");
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


module.exports = router;