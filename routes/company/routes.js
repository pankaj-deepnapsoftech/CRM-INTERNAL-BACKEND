const express = require("express");
const {
  createCompanyValidator,
  validateHandler,
  editCompanyValidator,
  deleteCompanyValidator,
  companyDetailsValidator,
  bulkCreateCompaniesValidator,
} = require("../../validators/company/validator");
const {
  createCompany,
  editCompany,
  deleteCompany,
  companyDetails,
  allCompanies,
  CompanyOtpVerification,
  CompanyResendOTP,
  addComment,
  getComments,
  bulkCreateCompanies,
} = require("../../controllers/company/controller");
const { checkAccess } = require("../../helpers/checkAccess");
const router = express.Router();

router.post(
  "/create-company",
  checkAccess,
  createCompanyValidator(),
  validateHandler,
  createCompany
);
router.post(
  "/edit-company",
  checkAccess,
  editCompanyValidator(),
  validateHandler,
  editCompany
);
router.post(
  "/delete-company",
  checkAccess,
  deleteCompanyValidator(),
  validateHandler,
  deleteCompany
);
router.post(
  "/company-details",
  checkAccess,
  companyDetailsValidator(),
  validateHandler,
  companyDetails
);
router.post("/all-companies", allCompanies);
router.patch("/verify-company/:id", checkAccess, CompanyOtpVerification);
router.post("/resend-otp/:id", checkAccess, CompanyResendOTP);

// Bulk create companies from parsed CSV/XLSX rows
router.post(
  "/bulk-create",
  checkAccess,
  bulkCreateCompaniesValidator(),
  validateHandler,
  bulkCreateCompanies
);

// Comment routes
router.post("/add-comment", checkAccess, addComment);
router.get("/comments/:companyId", checkAccess, getComments);

module.exports = router;