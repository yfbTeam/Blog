var express = require('express');
var router = express.Router();
var UserModal = require('../../modles/admin/user')
router.get('/userList/:status',function(req,res,next){
    UserModal.getList({isDelete:req.params.status},function(err,list){
        res.render("admin/user/index",{userList:list});
    })   
})
router.get("/addUser",function(req,res,next){
    res.render("admin/user/createModal",{});
})
router.post("/addUser",function(req,res,next){
    var data = Object.assign({},req.body,{regtime:new Date(),updatetime:new Date()})
    UserModal.addModal(data,function(err,doc){
        res.redirect('/admin/userList/0');
    })
});
router.get("/editUser/:id",function(req,res,next){
    UserModal.getOne({_id:req.params.id},function(err,doc){
        res.render("admin/user/editModal",{user:doc});
    }) 
})
router.post('/editUser/:id',function(req,res,next){
    var data = Object.assign({},req.body,{updatetime:new Date()});
    UserModal.editModal({_id:req.params.id},data,function(err,doc){
        res.redirect('/admin/userList/0');
    })
})
router.get("/deleteUser/:id",function(req,res,next){
    UserModal.editModal({_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        res.redirect('/admin/userList/0');
    })
})


module.exports = router;