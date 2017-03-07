const http = require('http');
const urlapi = require('url');
const fs = require('fs'); //引入文件读取模块

var documentRoot = 'E:/nodejs';
//需要访问的文件的存放目录

const server = http.createServer(function(req, res) {

    var url = urlapi.parse(req.url);
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 

    var file = documentRoot + url.href;

    var filename = url.pathname.substring(1); // 去掉前导'/'
    var type = getType(filename.substring(filename.lastIndexOf('.') + 1));
    console.log(filename); //取得文件类型  css   js  ....
    // 异步读取文件,并将内容作为单独的数据模块传给回调函数
    // 对于确实很大的文件,使用流API fs.createReadStream()更好
    fs.readFile(file, function(err, data) {
        /*
            一参为文件路径
            二参为回调函数
                回调函数的一参为读取错误返回的信息，返回空就没有错误
                二参为读取成功返回的文本内容
        */
        if (err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        } else {
            res.writeHeader(200, {
                'content-type': type
            });
            res.write(data); //将index.html显示在客户端
            res.end();

        }

    });

}).listen(8888);
//这里定义了一个用来判断文件类型的函数
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
console.log('服务器开启成功');
