const express = require('express')
const router = express.Router()
const BookModel = require('../models/books')

router.get('/', (req, res) => {
    BookModel.getBooks()
        .then((books) => {
            res.render('index', { books })
        })
})

router.get('/addBook', (req, res) => {
    res.render('addBook')
})

router.post('/add', (req, res) => {
    let book = req.body
    BookModel.addBook(book)
        .then((data) => {
            //res.redirect('../')
            res.json(data)
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