var urlAPI = require('url');

function data(pathname,url) {
    console.log('the data is' + pathname+'\n'+urlAPI.parse(url).query);
}

function post(pathname) {
    console.log('the post is' + pathname);
}
exports.data = data;
exports.post = post;
