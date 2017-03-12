const express = require('express');
const EXP = express();
const pathName='E:/nodejs'
//静态资源文件路由
EXP.use(express.static(pathName+'/'));
EXP.use(express.static(pathName+'/css'));
EXP.use(express.static(pathName+'/js'));
EXP.use(express.static(pathName+'/js/lib'));
EXP.use(express.static(pathName+'/images'));

//请求路由
EXP.get('/', function(req, res) {
    res.send('/nodejs/index.html');
});
EXP.post('/sever/data', function(req, res) {
    res.send('this is post request');
});
EXP.put('/user', function(req, res) {
    res.send('this is put request from /user');
});
//预置404
EXP.use(function(req, res, next) {
  res.status(404).sendFile('/nodejs/404.html');
});
var server = EXP.listen(3000, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
