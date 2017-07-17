var express = require('express');

var route = express.Router();

route.get('/', function(req, res) {
    var msg = {
        title: '<h1>Express</h1>',
        users: [{username: 'alone'},
            {username: 'king' },
            {username: 'superme'}
        ]
    };    res.render('index', msg);
});

module.exports = route;