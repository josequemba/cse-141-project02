const express = require("express");
const router = express.Router();
const validation = require("../utilities/bookValidator")
const bookController = require("../controllers/bookController");
const { isAuthenticated } = require('../utilities/authenticate');

// GET all books
router.get('/', bookController.getAllBooks);

// GET a single book
router.get('/:id', bookController.getSingleBook);

// POST a new book
router.post('/', isAuthenticated, validation.saveBookRules(), validation.checkData, bookController.createBook);

// UPDATE a book
router.put("/:id", isAuthenticated, validation.saveBookRules(), validation.checkData, bookController.updateBook);

// DELETE a book
router.delete("/:id", isAuthenticated, bookController.deleteBook);

module.exports = router;