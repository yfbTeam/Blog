
var Attribute = require('../../schema/admin/Attribute')
module.exports = {
    getList:function(params,callback){
        Attribute.find(params,function(err,list){
            callback(err,list)
        })
    },
    getOne:function(params,callback){
        Attribute.findOne(params,function(err,list){
            callback(err,list);
        })
    },
    addModal:function(params,callback){
        Attribute.create(params,function(err,item){
            callback(err,list)
        });
    },
    editModal:function(params1,params2,callback){
        Attribute.update(params1,{
            $set:params2
        },function(err,item){
            callback(err,item);
        })
    }
}