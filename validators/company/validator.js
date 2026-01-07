const expressValidator = require("express-validator");
const { body, validationResult } = expressValidator;

const createCompanyValidator = (req, res) => [
  // body("companyname", "Name field should not be empty").notEmpty().isAlpha('en-US', {ignore: ' '}).withMessage("Name field should only contain alphabets"),
  body("email")
    .optional()
    .if(body("email").custom((val) => /@/.test(val)))
    .isEmail()
    .withMessage("Email address field is not valid"),
  body("phone", "Phone field should not be empty")
    .notEmpty()
    .isNumeric()
    .withMessage("Phone Number should only contain digits")
    .isLength(10)
    .withMessage("Phone Number should be digits long"),
];

const editCompanyValidator = (req, res) => [
  body("companyId", "Corporate Id field should not be empty").notEmpty(),
];

const deleteCompanyValidator = (req, res) => [
  body("companyId", "Corporate Id field should not be empty").notEmpty(),
];

const companyDetailsValidator = (req, res) => [
  body("companyId", "Corporate Id field should not be empty").notEmpty(),
];

// Bulk create validator – expect `rows` to be a non-empty array
const bulkCreateCompaniesValidator = (req, res) => [
  body("rows", "Rows must be a non-empty array").isArray({ min: 1 }),
];

const validateHandler = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length === 0) {
    return next();
  }

  const errorMsg = errors.map((err) => err.msg).join(", ");
  res.status(400).json({
    status: 400,
    success: false,
    message: errorMsg,
  });
};

module.exports = {
  createCompanyValidator,
  editCompanyValidator,
  deleteCompanyValidator,
  companyDetailsValidator,
  bulkCreateCompaniesValidator,
  validateHandler,
};