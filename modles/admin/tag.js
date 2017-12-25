var express = require('express');
var router = express.Router();
var Tag = require("../../schema/admin/Tag");
module.exports = {
    getList:function(params,callback){
        Tag.find(params,function(err,list){
            callback(err,list)
        })
    },
    getOne:function(params,callback){
        Tag.findOne(params,function(err,list){
            callback(err,list);
        })
    },
    addModal:function(params,callback){
        Tag.create(params,function(err,item){
            callback(err,list)
        });
    },
    editModal:function(params1,params2,callback){
        Tag.update(params1,{
            $set:params2
        },function(err,item){
            callback(err,item);
        })
    }
}