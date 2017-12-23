var mongoose = require("mongoose");

var arcTypeSchema = new mongoose.Schema({
    typename:String,
    isDelete:{
        type:Number,
        default:0
    }
});

var ArcType = mongoose.model("ArcType",arcTypeSchema);

module.exports = ArcType;




















