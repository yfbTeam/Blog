var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");//ejs、jade、swig
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var db = require("./config/db.js");

//后台模块  30模块
app.use("/admin",require("./router/admin"));

app.listen(3000);
