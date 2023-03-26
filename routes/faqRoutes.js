const express = require("express");
const faqController = require("../controllers/faqController");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/update-status/:id")
  .patch(authController.protect, faqController.updateStatus);

router
  .route("/")
  .post(faqController.createFaq)
  .get(authController.protect, faqController.getFaq);

router
  .route("/:id")
  .patch(authController.protect, faqController.updateFaq, deleteFile)
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    faqController.deleteFaq,
    deleteFile
  );

module.exports = router;
