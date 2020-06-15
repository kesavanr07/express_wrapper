require("./my-node-profiler");
var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function (req, res) {
    var getAllEmp=require("./utility/mysqldb/getAllEmployee");
    getAllEmp(req, res);
});

app.get('/employee', function (req, res) {
    var editEmp=require("./utility/mysqldb/editEmployee");
    var getEmp=require("./utility/mysqldb/getEmployee");
    editEmp(req, res, function(flag){
        getEmp(req, res, flag);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});