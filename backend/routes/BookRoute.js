const express = require('express');
const router = express.Router();
const booksController = require("../repositories/book.repository.js");

router.post('/addBook', booksController.addBook);
router.get('/getBooks', booksController.getBooks);
router.get('/getBookById/:id', booksController.getBookById);
router.put('/updateBook/:id', booksController.updateBook);
router.delete('/deleteBook/:id', booksController.deleteBook);

module.exports = router;
