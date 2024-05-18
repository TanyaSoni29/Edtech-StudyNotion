const express = require("express")
const router = express.Router()

const {createCourse, getAllCourses, getCourseDetails, getFullCourseDetails, editCourse, getInstructorCourses, deleteCourse} = require("../controllers/Course");

const {createSection, updateSection, deleteSection} = require("../controllers/Section");

const {updateSubSection, deleteSubSection, createSubSection} = require("../controllers/SubSection");

const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Categories")

const {createRating, getAvgRating, getAllRating} = require("../controllers/RatingAndReviews")

const { isInstructor, auth, isAdmin, isStudent } = require("../midlewares/auth");

const {updateCourseProgress, getProgressPercentage} = require("../controllers/courseProgress")

router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
router.post("/addSection", auth , isInstructor, createSection )
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection",auth, isInstructor, deleteSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth,getFullCourseDetails)
router.get("/getInstructorCourses", auth , isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.post("/getProgressPercentage", auth, isStudent, getProgressPercentage)


router.post("/createCategory", auth, isAdmin, createCategory )
router.get("/showAllCategories", showAllCategories )
router.post("/getCategoryPageDetails", categoryPageDetails )


router.post("/createRating", auth, isStudent, createRating)
router.get("/getAvgRating", getAvgRating);
router.get("/getReviews", getAllRating);

module.exports = router;