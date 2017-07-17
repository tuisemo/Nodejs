var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var ejsresult = {
        haslogin: true,
        hello: '晚上好',
        userName: 'tuisemo',
        title: '<h1>Express</h1>',
        users: [{ username: 'alone' },
            { username: 'king' },
            { username: 'superme' }
        ]
    };

    res.render('hack', ejsresult);
});

module.exports = router;