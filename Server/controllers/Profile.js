
const Profile = require("../models/Profile")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course");
const mongoose = require("mongoose")
const {convertSecondsToDuration} = require("../utils/secToDuration")
const User = require("../models/User");
const {imageUploadToCloudinary} = require("../utils/imageUpload");


 exports.updateProfile = async(req, res) =>{
    try {
        const {firstName="", lastName="", gender="", dateOfBirth="", about="", contactNumber="" } = req.body;
        const id = req.user.id;

        const userDetails = await User.findById(id)
        const profile = await Profile.findById(userDetails.additionalDetails)

        const user = await User.findByIdAndUpdate(id, {firstName, lastName})

        await user.save()

        profile.dateOfBirth = dateOfBirth;
        profile.about = about
        profile.contactNumber = contactNumber
        profile.gender = gender

        await profile.save()

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()

            return res.json({
                success: true,
                message: "Profile Updated Successfully",
                updatedUserDetails
            })
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Unable To update your Profile, please try again",
            error: error.message
        })
    }
 }

 //delete account

 exports.deleteAccount = async(req, res) =>{
    try {
        
        const userId = req.user.id;
        const userDetails = await User.findById({_id: userId});

        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        await Profile.findByIdAndDelete({_id: new mongoose.Types.ObjectId(userDetails.additionalDetails),
        });

        for (const courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(courseId, {$pull : { studentsEnrolled: userId}}, {new: true})
        }

        await User.findByIdAndDelete({_id:userId});

         res.status(200).json({
            success: true,
            message: "User Account Deleted."
        })

        await CourseProgress.deleteMany({userId: userId})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Unable To delete your Account, please try again",
            error: error.message
        })
    }
 }


 exports.getAllUserDetails = async(req, res) =>{
    try {
        const id = req.user.id

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message:"User details Fetched Successfully.",
            data: userDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"User details not Fetched.",
            error: error.message
        })
    }
 }

exports.updateDisplayPicture = async(req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id;
        const image = await imageUploadToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        console.log(image)

        const updatedProfile = await User.findByIdAndUpdate({_id: userId}, {image: image.secure_url},{new: true})
        res.send({
            success:true,
            message:`Image Updated successfully`,
            data: updatedProfile
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
    })
}
}

exports.getEnrolledCourses = async(req, res) => {

    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({_id: userId}).populate({path: "courses", populate: {path: "courseContent", populate: {
            path: "subSection"
        }}}).exec();

        userDetails = userDetails.toObject()
        var SubsectionLength = 0 
        for (var i=0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for(var j=0 ; j< userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0 )
            userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
            SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({courseID: userDetails.courses[i]._id, userId: userId})

        courseProgressCount = courseProgressCount?.completedVideos.length
        if(SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
        } else {
          const multiplier = Math.pow(10,2)
          userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier }
        }

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
          return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't get enrolled courses.",
            error: error.message
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({instructor: req.user.id})

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })

        res.status(200).json({ courses: courseData})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
}


 