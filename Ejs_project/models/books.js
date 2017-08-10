const Book = require('./lib/mongo').Book

module.exports = {
    getBooks() {
        return Book
            .find({})
            .sort({ _id: -1 })
            .exec()
    },
    getBook(id) {
        return Book
            .findById(id)
            .exec()
    },
    editBook(id, data) {
        return Book
            .findByIdAndUpdate(id, data)
            .exec()
    },
    addBook(book) {
        return Book.create(book);
        /*=======Promise写法=====*/
        /*Book.findOne({ "title": book.title }).then((data)=>{
            if (data) {
                console.log('该数据已存在！');
                return {
                    result: false,
                    msg: '该数据已存在'
                };
            } else {
                return Book.create(book);
            }
        }).catch((error)=>{
            console.log(error);
        })*/
        /*=======Promise写法=====*/
        /*return Book.findOne({ "title": book.title }, function(error, data) {
            if (error) {
                console.log(error);
            }
            if (data) {
                console.log('该数据已存在！');
                return {
                    result: false,
                    msg: '该数据已存在'
                };
            } else {
                return Book.create(book);
            }
        })*/
    },
    delBook(id) {
        return Book
            .findByIdAndRemove(id)
            .exec()
    }
}