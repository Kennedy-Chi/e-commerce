const express = require("express");
const emailController = require("../controllers/emailController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router.patch("/send-email/:id", emailController.sendEmail);

router
  .route("/")
  .post(upload.upload.single("banner"), emailController.createEmail)
  .get(authController.protect, emailController.getEmails);

router
  .route("/:id")
  .patch(
    authController.protect,
    upload.upload.single("banner"),
    emailController.updateEmail,
    deleteFile
  )
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    emailController.deleteEmail,
    deleteFile
  );

module.exports = router;
