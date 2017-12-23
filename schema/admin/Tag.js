var mongoose = require("mongoose");

var tagSchema = new mongoose.Schema({
    tagname:String,
    isDelete:{
        type:Number,
        default:0
    }
});

var Tag = mongoose.model("Tag",tagSchema);

module.exports = Tag;