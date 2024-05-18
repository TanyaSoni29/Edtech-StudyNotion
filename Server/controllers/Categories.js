const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {

  try {
    const {name, description} = req.body;
    
    if(!name) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        })
    }

    const categoryDetails = await Category.create({
        name: name, 
        description: description
    });

    console.log(categoryDetails);

    return res.status(200).json({
          success: true,
          message: "Category created successfully. "
    })

  } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
  }

}

exports.showAllCategories = async (req, res) => {

    try {
        
        const allCategorys = await Category.find();
        
        res.status(200).json({
            success: true,
            message: "All Categories return successfully.",
            data: allCategorys
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.categoryPageDetails = async(req, res) =>{
    try {
        
        const {categoryId} = req.body;

        const selectedCategory = await Category.findById(categoryId).populate({
            path: "courses",
            match: {status: "Published" },
            populate: "ratingAndReviews",
        }).exec();

        if(!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Selected category courses are not found."
            })
        }

        if (selectedCategory.courses.length === 0 ) {
            console.log("No courses found foe the selected Category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected Category."
            })
        }

        const categoriesExceptSelected = await Category.find({_id: {$ne: categoryId}})

        let differentCategory = await Category.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id).populate({path:"courses", match: {status: "Published"}}).exec();

        const allCategories = await Category.find().populate({path: "courses", match: {status: "Published"},}).exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10)

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong in fetching category page detail.",
            error: error.message
        })
    }
}