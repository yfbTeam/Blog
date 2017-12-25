
var ArticleType = require('../../schema/admin/ArticleType');
module.exports = {
    getList:function(params,callback){
        ArticleType.find(params,function(err,list){
            callback(err,list)
        })
    },
    getOne:function(params,callback){
        ArticleType.findOne(params,function(err,list){
            callback(err,list);
        })
    },
    addModal:function(params,callback){
        ArticleType.create(params,function(err,item){
            callback(err,list)
        });
    },
    editModal:function(params1,params2,callback){
        ArticleType.update(params1,{
            $set:params2
        },function(err,item){
            callback(err,item);
        })
    }
}