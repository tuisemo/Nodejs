var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/test', function(req, res, next) {
    res.render('test');
});
router.post('/dis/passport/sendMsg', function(req, res) {
    var url = 'http://ixm.terton.com.cn/dis/passport/sendMsg';
    //request.post(url, { form: req.body }).pipe(res);
    res.json({
        result: false,
        code: 200,
        data: '',
        msg: '成功'
    })
});

module.exports = router;