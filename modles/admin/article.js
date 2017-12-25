var Article = require("../../schema/admin/Article");
module.exports= {
    getList:function(params,callback){
        Article.find(params).populate("type").populate('Tag').populate('attribute').exec(function(err,list){
            callback(err,list);
        });
    }
}