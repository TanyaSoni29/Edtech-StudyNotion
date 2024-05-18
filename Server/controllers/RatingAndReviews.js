const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { ObjectId } = require('mongoose').Types;
const mongoose = require("mongoose")

exports.createRating = async (req, res) =>{
    try {
        const userId = req.user.id;

        const {courseId , rating, review} = req.body;

        const courseDetails = await Course.findOne({_id: courseId,
        studentsEnrolled: {$elemMatch: {$eq: userId}}
         });
         
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course."
            })
        };

        const alreadyReviewed = await RatingAndReview.findOne({user: userId, course: courseId })

        if(alreadyReviewed) {

            return res.status(403).json({
                success: false,
                message : "Course is already reviewed by the user."
            })
        }


        const ratingReview = await RatingAndReview.create({rating, review, course: courseId, user: userId});

        await Course.findByIdAndUpdate(courseId, {$push: {
            ratingAndReviews: ratingReview
        }})
        await courseDetails.save();

        return res.status(201).json({
            success: true,
            message: "Rating and Reviewed done Successfully.",
            ratingReview
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Rating review faces some issues, please try again.",
            error: error.message
        })
    }
}

exports.getAvgRating = async(req, res) =>{
    try {

        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
              $match: {
               course: new mongoose.Types.ObjectId(courseId)
              },  
           },
           {
            $group: {
                _id: null ,
                averageRating: {$avg: "$rating"}
            }
           }
    ])

    if(result.length > 0){
        return res.status(200).json({
            success: true,
            averageRating: result[0].averageRating
        })
    }

    return res.status(200).json({
        success: true ,
        mesage: "Average Rating is 0, no rating given till now.",
        averageRating: 0
    })

         
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Average rating unable to fetch.",
            error: error.message
        })
    }
}

exports.getAllRating = async(req, res) => {
    try {
        const allRatingReview = await RatingAndReview.find({}).sort({rating: "desc"}).populate({
            path: "user",
            select: "firstName lastName email image" 
        }).populate({
            path: "course",
            select: "courseName"
        }).exec();

        return res.status(200).json({
            success: true,
            message: "All Reviews fetch Successfully.",
            data: allRatingReview
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"unable to fetch all ratings, there is some server issues. ",
            error: error.message
        })
    }
}