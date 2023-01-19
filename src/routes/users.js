const express = require("express");
const router = express.Router();
const {UsersController} = require("../controllers/users");

// router.post("/register",UsersController.insert)
const {role, protect, roleToko} = require("../middleware/auth");
router.post("/register/:role", role, UsersController.insert);
router.post("/login", UsersController.login);
router.post("/verification", UsersController.otp);
router.put("/edit",protect,UsersController.EditProfile)
router.get("/",protect, UsersController.getProfile)



module.exports = router;