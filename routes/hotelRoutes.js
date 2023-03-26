const express = require("express");
const hotelController = require("../controllers/hotelController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    upload.upload.fields([
      { name: "socialIcon", maxCount: 20 },
      { name: "socialColoredIcon", maxCount: 20 },
      { name: "mediaIcon", maxCount: 20 },
      { name: "mediaColoredIcon", maxCount: 20 },
    ]),
    hotelController.createHotel
  )
  .get(hotelController.getHotel);

router
  .route("/:id")
  .patch(
    authController.protect,
    upload.upload.fields([
      { name: "socialIcon", maxCount: 20 },
      { name: "socialColoredIcon", maxCount: 20 },
      { name: "mediaIcon", maxCount: 20 },
      { name: "mediaColoredIcon", maxCount: 20 },
    ]),
    hotelController.updateHotel,
    deleteFile
  )
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    hotelController.deleteHotel,
    deleteFile
  );

module.exports = router;
