const url = require('url');
const querystring = require('querystring');

function data(pathname, opturl) {
    var urlquery = url.parse(opturl, true).query;
    /*console.log('the data is' + pathname + '\n');
    console.log(url.parse(opturl, true).query);
    console.log(querystring.parse(urlquery));*/
    var response = { "result": true, "msg": "", "data": {} };
    return response;
}

function post(pathname) {
    console.log('the post is' + pathname);
}
exports.data = data;
exports.post = post;
