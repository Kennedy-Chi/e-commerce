const express = require("express");
const salesController = require("../controllers/salesController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, salesController.getAllSales)
  .delete(authController.protect, salesController.deleteAllSales);

router
  .route("/:id")
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    salesController.deleteSales
  )
  .patch(authController.protect, salesController.updateSales);
module.exports = router;
