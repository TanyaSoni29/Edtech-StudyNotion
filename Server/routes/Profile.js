const express = require("express");
const router = express.Router();

const {auth, isInstructor} = require("../midlewares/auth");

const {deleteAccount, updateProfile, getAllUserDetails, getEnrolledCourses, updateDisplayPicture, instructorDashboard} = require("../controllers/Profile");



router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);

router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


module.exports = router;
