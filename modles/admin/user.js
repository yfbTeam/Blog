var express = require('express');
var router = express.Router();
var User = require("../../schema/User");
module.exports = {
    getList:function(params,callback){
        User.find(params,function(err,list){
            callback(err,list)
        })
    },
    getOne:function(params,callback){
        User.findOne(params,function(err,list){
            callback(err,list);
        })
    },
    addModal:function(params,callback){
        User.create(params,function(err,item){
            callback(err,list)
        });
    },
    editModal:function(params1,params2,callback){
        User.update(params1,{
            $set:params2
        },function(err,item){
            callback(err,item);
        })
    }
}