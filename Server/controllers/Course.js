const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection")
const User = require("../models/User");
const {imageUploadToCloudinary} = require("../utils/imageUpload");
const CourseProgress = require("../models/CourseProgress")
const {convertSecondsToDuration} = require("../utils/secToDuration")


exports.createCourse = async (req, res) =>{

    try {

        const {courseName, courseDescription, whatYouWillLearn, price, tag:_tag,category , status, instructions:_instructions} = req.body;
        const thumbnail = req.files.thumbnailImage;

        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag.length || !category || !thumbnail || !instructions.length) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        if(!status || status === undefined) {
            status = "Draft"
        }
        // validation for instructor

        const userId = req.user.id;

        const instructorDetails = await User.findById(userId, {accountType: "Instructor"});

        console.log("instructor Details --", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found."
            })
        }

        const categoryDetails = await Category.findById(category) // here we are doing by id because course model me tag as an reference pass hua hai.

         if(!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "category details not found"
            })
         }

         const thumbnailImage = await imageUploadToCloudinary(thumbnail, process.env.FOLDER_NAME);
  
         const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            price,
            tag,
            thumbnail: thumbnailImage.secure_url,
            whatYouWillLearn: whatYouWillLearn,
            category: categoryDetails._id,
            status: status,
             instructions
         })
 
         await User.findByIdAndUpdate({
            _id: instructorDetails._id
         },
         {
            $push: {courses: newCourse._id}
         }, {new: true})

         await Category.findByIdAndUpdate({
            _id: category
         },
         {
            $push : {
                courses: newCourse._id
            }
         }, {new: true})

         return res.status(200).json({
            success: true,
            message: "Course created Successfully",
            data: newCourse
         })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Failed To create course.",
            error: error.message
        })
    }
}
exports.editCourse = async (req, res) => {
    try {
        const {courseId} = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId)

        if(!course) {
            return res.status(404).json({
                error: "Course not found"
            })
        }

        if(req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await imageUploadToCloudinary(thumbnail, process.env.FOLDER_NAME)
            course.thumbnail = thumbnailImage.secure_url
        }

        for (const key in updates) {
            if(updates.hasOwnProperty(key)) {
                if(key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }
        await course.save()

        const updatedCourse = await Course.findOne({_id: courseId}).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        }).populate("category").populate("ratingAndReviews").populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
            
        }).exec();

        res.json({
            success: true,
            message: "Course updated Successfully",
            data: updatedCourse
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message:"Internal Server error",
            error: error.message
        })
    }
}

exports.getAllCourses = async (req, res) =>{

    try {
        
        const allCourses = await Course.find({status: "Published"}, {courseName: true, price: true, thumbnail: true, instructor: true, ratingAndReviews: true, studentsEnrolled: true}).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data For All Courses Fetched Successfully.",
            data: allCourses
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:"Can't fetch course data.",
            error: error.message
        })
    }
}

// exports.getCourseDetails = async (req, res) => {
//     try {
//         const {courseId} = req.body;
//         const courseDetails = await Course.findOne({
//             _id: courseId,
//         }).populate({
//             path: "instructor",
//             populate: {
//                 path:"additionalDetails"
//             }
//         }).populate("category").populate("ratingAndReviews").populate({
//             path : "courseContent",
//             populate : {
//                 path: "subSection"
//             }
//         }).exec();

//         if(!courseDetails || !courseDetails.length) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Could not find course with id: ${courseId}`
//             })
//         }

//         if (courseDetails.status === "Draft") {
//             return res.status(403).json({
//                 success: false,
//                 message: "Accessing a Draft Course is forbidden"
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             data: courseDetails
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

exports.getCourseDetails = async(req, res) =>{
    try {
        const {courseId} = req.body;


        const courseDetails = await Course.findOne({_id: courseId})
        .populate({
            path:"instructor",
            populate:{
                path: "additionalDetails"
            }
        })
        .populate( "category")
        .populate("ratingAndReviews")
        .populate({path:"courseContent",
        populate:{
        path: "subSection",
        select: "-videoURL"
         }}).exec();

         if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find Course with ${courseId}`
            })
        }
        if(courseDetails.status === "Draft") {
            return res.status(403).json({
                success: false,
                message: "Accessing a draft course is forbidden"
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

         const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            message: "Course detail fetched successfully.",
            data: {courseDetails, totalDuration}
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to fetch Course details.",
            error: error.message
        })
    }
}

exports.getFullCourseDetails = async(req, res) => {
    try {
        const {courseId} = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
            _id: courseId,
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        })
        .populate("category").populate("ratingAndReviews").populate({
            path:"courseContent",
            populate: {
                path: "subSection"
            }
        }).exec()
         
        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId
        })

        console.log("courseProgressCount", courseProgressCount)

        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message:`Could not find course with id: ${courseId}`
            })
        }
        
    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : []
            }
        })

    } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
      const instructorId = req.user.id;
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({createdAt: -1})

      res.status(200).json({
        success: true,
        data: instructorCourses

    })
    } catch(error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses ",
        error: error.message
      })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const {courseId} = req.body

        const course = await Course.findById(courseId)

        if(!course) {
            return res.status(404).json({message: "Course not found"})
        }

        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull : {courses: courseId}
            })
        }

        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId)

            if(section) {
                const subSections = section.subSection
                for(const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            await Section.findByIdAndDelete(sectionId)
        }

        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
          })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
    }
}