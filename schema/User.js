import { times } from "../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/async";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    rank:Number,
    regtime:times,
    updatetime:times
});

var User = mongoose.model("User",userSchema);

module.export = User;









