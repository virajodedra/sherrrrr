const express = require("express");
const router = express.Router();
const { getLoginController } = require("./../controllers/loginController");
const { addSingupController } = require("./../controllers/signupController");
const { googleAddLoginController } = require("./../controllers/googleLoginController");
const auth = require("../middlewares/auth");
const { login, signup, googleLogin } = require("../middlewares/loginMid");


router.post("/login", login, getLoginController);
router.post("/signup", signup, addSingupController);
router.post("/Google_login", googleLogin, googleAddLoginController);


module.exports = router; 