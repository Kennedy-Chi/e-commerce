const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.route("/get-user").get(authController.getAUser);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

router
  .route("/")
  .get(userController.getAllUsers)
  .patch(authController.protect, userController.resetUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(
    upload.upload.single("profilePicture"),
    userController.editUser,
    deleteFile
  )
  .delete(
    authController.protect,
    authController.restrictTo("Manager"),
    userController.deleteUser,
    userController.getAllUsers
  );

module.exports = router;
