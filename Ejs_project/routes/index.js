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

module.exports = router;
