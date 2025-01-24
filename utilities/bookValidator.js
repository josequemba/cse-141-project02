const { body, validationResult } = require("express-validator");

const validate = {};

validate.saveBookRules = () => {
  return [
    body("title")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a title.")
      .isLength({ min: 1 })
      .withMessage("Title must be at least 1 character long."),
    
    body("author")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide an author.")
      .isLength({ min: 1 })
      .withMessage("Author must be at least 1 character long."),
    
    body("publishedYear")
      .notEmpty()
      .withMessage("Please provide the published year.")
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage(
        `Published year must be a valid number between 1000 and ${new Date().getFullYear()}.`
      ),
    
    body("genre")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a genre.")
      .isString()
      .withMessage("Genre must be a valid string."),
    
    body("available")
      .notEmpty()
      .withMessage("Please provide availability status.")
      .isBoolean()
      .withMessage("Available must be a boolean (true or false).")
  ];
};

validate.checkData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If validation errors are found, send a 400 response with error details
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array() // Returns the list of validation errors
    });
  }

  // If validation is successful, pass control to the next middleware
  next();
};

module.exports = validate;