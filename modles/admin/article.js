
var Article = require("../../schema/admin/Article");
var tagModal = require('../../modles/admin/tag')
module.exports= {
    getList:function(params,callback){
        Article.find(params).populate("type").populate('Tag').populate('attribute').exec(function(err,list){
            callback(err,list);
        });
    },
    getAll:function(params,callback){
        Article.find(params,function(err,list){
            callback(err,list);
        })
    },
    getOne:function(params,callback){
        Article.findOne(params,function(err,list){
            callback(err,list);
        })
    },
    addModal:function(params,callback){
        Article.create(params,function(err,item){
            callback(err,item)
        });
    },
    editModal:function(params1,params2,callback){
        Article.update(params1,{
            $set:params2
        },function(err,item){
            callback(err,item);
        })
    }
}