const express = require("express");
const companyController = require("../controllers/companyController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.fields([
      { name: "socialIcon", maxCount: 20 },
      { name: "coloredSocialIcon", maxCount: 20 },
      { name: "mediaIcon", maxCount: 20 },
      { name: "coloredMediaIcon", maxCount: 20 },
    ]),
    companyController.createCompany
  )
  .get(companyController.getCompany);

router.route("/:id").patch(
  // authController.protect,
  upload.upload.fields([
    { name: "socialIcon", maxCount: 20 },
    { name: "coloredSocialIcon", maxCount: 20 },
    { name: "mediaIcon", maxCount: 20 },
    { name: "coloredMediaIcon", maxCount: 20 },
  ]),
  companyController.updateCompany,
  deleteFile,
  companyController.getCompany
);
//   .delete(
//     authController.protect,
//     // authController.restrictTo("room"),
//     hotelController.deleteHotel,
//     deleteFile
//   );

module.exports = router;
