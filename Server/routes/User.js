 const express = require("express");
 const router = express.Router();

 const {login, signUp, sendOtp, changePassword} = require('../controllers/Auth');

 const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

 const {auth} = require("../midlewares/auth");

 router.post("/login", login);
 router.post("/signup", signUp);
 router.post("/sendotp", sendOtp);
 router.post("/changepassword", auth, changePassword);
 router.post("/reset-password-token", resetPasswordToken);
 router.post("/reset-password", resetPassword);


 module.exports = router;