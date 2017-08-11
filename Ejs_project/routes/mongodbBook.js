const express = require('express')
const router = express.Router()
const BookModel = require('../models/lib/mongo').BookModel
/*
*页面路由
*/

router.get('/addBook', (req, res) => {
    res.render('addBook')
})
router.get('/signup', (req, res) => {
    res.render('signup')
})
router.get('/signin', (req, res) => {
    res.render('signin')
})

/*
*请求处理
*/

router.get('/', (req, res) => {
    BookModel.find({})
        .sort({ _id: -1 })
        .exec()
        .then((books) => {
            res.render('index', { books })
        }).catch((err) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        })
})

router.post('/add', (req, res) => {
    let book = req.body;
    BookModel.findOne({ "title": book.title }).then((data) => {
        if (data) {
            res.json({
                "result": false,
                "msg": "该数据已存在"
            });
        } else {
            BookModel.create(book);
            res.json({
                "result": true,
                "msg": ""
            });
        }
    }).catch((err) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    })
})

router.get('/:bookId/remove', (req, res) => {
    BookModel.delBook(req.params.bookId)
        .then((book) => {
            res.redirect('/')
        }).catch((err) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        })
})


router.get('/:bookId/edit', (req, res) => {
    let book = req.body
    BookModel.getBook(req.params.bookId)
        .then((book) => {
            res.render('edit', {
                book,
                bookid: req.params.bookId
            })
        }).catch((err) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        })
})

router.post('/:bookId/edit', (req, res) => {
    let book = req.body
    BookModel.editBook(req.params.bookId, book)
        .then((result) => {
            res.redirect('/')
        }).catch((err) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        })
})


module.exports = router