module.exports = {

    getList:function(schema,params,callback){
        schema.find(params,function(err,list){
            callback(err,list)
        })
    },
    getOne:function(schema,params,callback){
        schema.findOne(params,function(err,list){
            callback(err,list);
        })
    },
    addModal:function(schema,params,callback){
        schema.create(params,function(err,item){
            callback(err,list)
        });
    },
    editModal:function(schema,params1,params2,callback){
        schema.update(params1,{
            $set:params2
        },function(err,item){
            callback(err,item);
        })
    }
}