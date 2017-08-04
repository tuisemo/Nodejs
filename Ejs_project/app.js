var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes');

// view engine setup
app.set('views', path.join(__dirname, 'views')); //设置了模版文件夹的路径
//app.set('view engine', 'ejs');//设置使用的模板引擎，此处设置为ejs
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html'); //设置使用的模板引擎，此处设置为html

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(8080, function() {
    console.log("ejs Server Start!");
});
module.exports = app;