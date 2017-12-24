var mongoose = require("mongoose");

var attributeSchema = new mongoose.Schema({
    attributename:String,
    isDelete:{
        type:Number,
        default:0
    }
});

var Attribute = mongoose.model("Attribute",attributeSchema);

module.exports = Attribute;