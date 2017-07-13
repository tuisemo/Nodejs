var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '<h1>Express</h1>',
        users: [{ username: 'alone' },
            { username: 'king' },
            { username: 'superme' }
        ]
    });
});
router.get('/HACK', function(req, res, next) {

    var ejsresult = {
        haslogin: false,
        userName: ''
    };

    res.render('HACK', ejsresult);
});

module.exports = router;
