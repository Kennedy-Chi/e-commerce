const express = require("express");
const itemController = require("../controllers/itemController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(
    // authController.protect,
    upload.upload.single("image"),
    itemController.createItem,
    itemController.getAllItem
  )
  .get(itemController.getAllItem);

router
  .route("/:id")
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    itemController.deleteItem,
    deleteFile,
    itemController.getAllItem
  )
  .patch(
    // authController.protect,
    upload.upload.single("image"),
    itemController.updateItem,
    deleteFile,
    itemController.getAllItem
  )
  .get(itemController.getAnItem);

module.exports = router;
