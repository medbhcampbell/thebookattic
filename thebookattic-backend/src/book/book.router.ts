// This file is just for testing with express! Should be replaced with Lambda
import express from 'express';

import bookService from './book.service';

const router = express.Router();

// Get all books
router.get('/', function(req, res, next) {
    bookService.getBooks().then((books) => {
        res.send(JSON.stringify(books));
    });
});

export default router;