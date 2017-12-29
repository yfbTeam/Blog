var express = require('express');
var router = express.Router();
var model = require('../../modles/admin/model');
var user = require('../../schema/user/User');
router.get('/userList/:status',function(req,res,next){
    model.getList(user,{isDelete:req.params.status},function(err,list){
        res.render("admin/user/index",{userList:list});
    })   
})
router.get("/addUser",function(req,res,next){
    res.render("admin/user/createModal",{});
})
router.post("/addUser",function(req,res,next){
    var data = Object.assign({},req.body,{regtime:new Date(),updatetime:new Date()})
    model.addModal(user,data,function(err,doc){
        res.redirect('/admin/userList/0');
    })
});
router.get("/editUser/:id",function(req,res,next){
    model.getOne(user,{_id:req.params.id},function(err,doc){
        res.render("admin/user/editModal",{user:doc});
    }) 
})
router.post('/editUser/:id',function(req,res,next){
    var data = Object.assign({},req.body,{updatetime:new Date()});
    model.editModal(user,{_id:req.params.id},data,function(err,doc){
        res.redirect('/admin/userList/0');
    })
})
router.get("/deleteUser/:id",function(req,res,next){
    model.editModal(user,{_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/userList/0');
    })
})


module.exports = router;