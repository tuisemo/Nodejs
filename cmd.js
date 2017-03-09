const http = require('http');
const url = require('url');
const fs = require('fs'); //引入文件读取模块
const querystring = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;
var documentRoot = 'E:/nodejs';

function cmd(opt) {
    //配置响应
    function Server(req, res) {
        var pathname = url.parse(req.url, true).pathname;
        var urlquery = url.parse(req.url, true).query;
        switch (pathname) {
            case '/sever/data':
                {
                    var response = opt.data(pathname, req.url);
                    console.log(response);
                    res.writeHeader(200, { 'Content-Type': 'application/json; charset=UTF-8' });
                    res.write(response);
                    res.end();
                };
                break;
            case '/sever/post':
                {
                    opt.post(pathname);
                    res.writeHeader(200, { 'Content-Type': 'text/plain' });
                    res.write("success!");
                    res.end();
                };
                break;
            default:
                {
                    /*=========路由静态资源开始=========*/
                    var file = documentRoot + pathname;
                    var filename = pathname.substring(1); // 去掉前导'/'
                    var type = getType(filename.substring(filename.lastIndexOf('.') + 1));
                    fs.readFile(file, function(err, data) {
                        if (err) {
                            res.writeHeader(404, { 'content-type': 'text/html;charset="utf-8"' });
                            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
                            res.end();
                        } else {
                            res.writeHeader(200, { 'content-type': type });
                            res.write(data); //将index.html显示在客户端
                            res.end();
                        }
                    });
                    /*=========路由静态资源开始=========*/
                };
                break;
        }
    }
    http.createServer(Server).listen(port, hostname);
    console.log('服务已启动');

    function getType(endTag) {
        var type = null;
        switch (endTag) {
            case 'html':
                type = 'text/html; charset=UTF-8';
                break;
            case 'htm':
                type = 'text/html; charset=UTF-8';
                break;
            case 'js':
                type = 'application/javascript; charset="UTF-8"';
                break;
            case 'css':
                type = 'text/css;';
                break;
            case 'txt':
                type = 'text/plain; charset="UTF-8"';
                break;
            case 'woff':
                type = 'application/font-woff';
                break;
            case 'eot':
                type = 'application/octet-stream';
                break;
            case 'ttf':
                type = 'application/x-font-ttf; charset="UTF-8"';
                break;
            case 'svg':
                type = 'image/svg+xml; charset="UTF-8"';
                break;
            case 'gif':
                type = 'image/gif;';
                break;
            case 'tif':
                type = 'image/tiff;';
                break;
            case 'jpg':
                type = 'image/jpge;';
                break;
            case 'jpge':
                type = 'image/tiff;';
                break;
            case 'png':
                type = 'image/png;';
                break;
            case 'manifest':
                type = 'text/cache-manifest; charset="UTF-8"';
                break;
            default:
                type = 'application/octet-stream';
                break;
        }
        return type;
    }
}
exports.cmd = cmd;
