const express = require("express");
const bannerController = require("../controllers/bannerController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/update-status/:id")
  .patch(authController.protect, bannerController.updateBannerStatus);

router
  .route("/")
  .post(upload.upload.single("image"), bannerController.createBanner)
  .get(bannerController.getAllBanner);

router
  .route("/:id")
  .patch(
    authController.protect,
    upload.upload.single("image"),
    bannerController.updateBanner,
    deleteFile
  )
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    bannerController.deleteBanner,
    deleteFile
  );

module.exports = router;
