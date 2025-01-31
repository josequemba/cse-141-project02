const express = require("express");
const router = express.Router();
const validation = require("../utilities/authorValidator")
const authorController = require("../controllers/authorController");
const { isAuthenticated } = require('../utilities/authenticate');

// GET all authors
router.get('/', authorController.getAllAuthors);

// GET a single author
router.get('/:id', authorController.getSingleAuthor);

// POST a new author
router.post('/', isAuthenticated, validation.saveAuthorRules(), validation.checkData, authorController.createAuthor);

// UPDATE an author
router.put("/:id", isAuthenticated, validation.saveAuthorRules(), validation.checkData, authorController.updateAuthor);

// DELETE an author
router.delete("/:id", isAuthenticated, authorController.deleteAuthor);

module.exports = router;