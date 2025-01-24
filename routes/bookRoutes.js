const express = require("express");
const router = express.Router();
const validation = require("../utilities/bookValidator")
const bookController = require("../controllers/bookController");

// GET all books
router.get('/', bookController.getAllBooks);

// GET a single book
router.get('/:id', bookController.getSingleBook);

// POST a new book
router.post('/', validation.saveBookRules(), validation.checkData, bookController.createBook);

// UPDATE a book
router.put("/:id", validation.saveBookRules(), validation.checkData, bookController.updateBook);

// DELETE a book
router.delete("/:id", bookController.deleteBook);

module.exports = router;