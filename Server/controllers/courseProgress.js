const mongoose = require("mongoose")
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");


exports.updateCourseProgress = async (req, res) => {
    const {courseId, subSectionId} = req.body
    const userId = req.user.id
    try {
     const subSection = await SubSection.findById(subSectionId)
     if(!subSection) {
        return res.status(404).json({
            error: "Invalid SubSection"
        })
     } 
     
     let courseProgress = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
     })

     if(!courseProgress) {
        return res.status(404).json({
            success: false,
            message: "Course progress Does not exist",
        })
     } else {
        if(courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(400).json({
                error: "SubSection already completed"
            })
        }
        courseProgress.completedVideos.push(subSectionId)
     }

     await courseProgress.save()

     return res.status(200).json({message: "Course progress updated"})
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
}
  
exports.getProgressPercentage = async (req, res) => {
    const {courseId} = req.body;
    const userId = req.user.id;

    if(!courseId) {
        return res.status(400).json({
            error: "Course ID not provided."
        })
    }

    try {
        
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId
        }).populate({
            path: "courseID",
            populate: {
                path: "courseContent"
            }
        }).exec();

        if(!courseProgress) {
            return res.status(400).json({
              error: " Can not find course Progress with these IDs.",
            })
        }
        let lectures = 0
        courseProgress.courseID.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })

        let progressPercentege = (courseProgress.completedVideos.length / lectures) * 100

        const multiplier = Math.pow(10,2)
        progressPercentege = Math.round(progressPercentege * multiplier) / multiplier

        return res.status(200).json({
            data: progressPercentege,
            message: "Successfully fetched Course Progress"
        })


    } catch (error) {
     console.log(error);
     return res.status(500).json({
        error:"Internal Server Error"
     })
    }

}