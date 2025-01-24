const express = require("express");
const router = express.Router();
const validation = require("../utilities/authorValidator")
const authorController = require("../controllers/authorController");

// GET all authors
router.get('/', authorController.getAllAuthors);

// GET a single author
router.get('/:id', authorController.getSingleAuthor);

// POST a new author
router.post('/', validation.saveAuthorRules(), validation.checkData, authorController.createAuthor);

// UPDATE an author
router.put("/:id", validation.saveAuthorRules(), validation.checkData, authorController.updateAuthor);

// DELETE an author
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;