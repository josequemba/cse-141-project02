const { body, validationResult } = require("express-validator");

const validate = {};

validate.saveAuthorRules = () => {
  return [
    body("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide the author's name.")
      .isLength({ min: 1 })
      .withMessage("Name must be at least 1 character long."),
    
    body("birthYear")
      .notEmpty()
      .withMessage("Please provide the author's birth year.")
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage(
        `Birth year must be a valid number between 1000 and ${new Date().getFullYear()}.`
      ),
    
    body("deathYear")
      .optional()
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage(
        `Death year must be a valid number between 1000 and ${new Date().getFullYear()}.`
      ),
    
    body("nationality")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide the author's nationality.")
      .isString()
      .withMessage("Nationality must be a valid string.")
  ];
};

validate.checkData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If validation errors are found, send a 400 response with error details
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array(), // Returns the list of validation errors
    });
  }

  // If validation is successful, pass control to the next middleware
  next();
};

module.exports = validate;