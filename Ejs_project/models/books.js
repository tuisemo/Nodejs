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
    findBook(data) {
        return Book.findOne(data);
    },
    editBook(id, data) {
        return Book
            .findByIdAndUpdate(id, data)
            .exec()
    },
    addBook(req, res) {
        return Book.create(req.body);
    },
    delBook(id) {
        return Book
            .findByIdAndRemove(id)
            .exec()
    }
}