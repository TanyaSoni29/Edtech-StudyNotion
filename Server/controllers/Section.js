const Section  = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async(req, res) =>{
    try {
        
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }

        const newSection = await Section.create({sectionName});

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push : {
                courseContent : newSection._id
            }
        }, {new: true}).populate({
            path: "courseContent",
            populate:{
                path: "subSection"
            }
        }).exec();
      
        res.status(200).json({
            success: true,
            message: "Section created successfully.",
            updatedCourseDetails
        })
     
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Unable to update section, please try again.",
            error: error.message
        })
    }
}

exports.updateSection = async(req, res) =>{
    try {
        const {sectionName, sectionId, courseId} = req.body;

        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});

        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();
        console.log(course)

         res.status(200).json({
            success: true,
            message: section,
            data: course,
        })

    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).json({
            success: false,
            message:"Unable to create section, please try again.",
            error: error.message
        })
    }
}


exports.deleteSection = async(req, res) =>{
    try {
        const { sectionId, courseId} = req.body;

        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })

        const section = await Section.findById(sectionId);

        if(!section) {
            return res.status(400).json({
                success: false,
                message: "Section Not Found."
            })
        }

     await SubSection.deleteMany({_id: {$in: section.subSection}});

     await Section.findByIdAndDelete(sectionId)

     const course = await Course.findById(courseId).populate({
        path: "courseContent",
        populate: {
            path: "subSection"
        }
     }).exec();
    

        res.status(200).json({
            success: true,
            message: "Section deleted Successfully.",
            data: course,
        })

    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({
            success: false,
            message:"Unable to delete section, please try again.",
            error: error.message
        })
    }
}