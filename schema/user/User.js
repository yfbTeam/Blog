
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    rank:Number,
    regtime:Date,
    updatetime:Date,
    isDelete:{
        type:Number,
        default:0
    }
});

var User = mongoose.model("User",userSchema);

module.exports = User;










