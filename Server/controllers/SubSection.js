const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { imageUploadToCloudinary } = require("../utils/imageUpload");


exports.createSubSection = async(req, res) => {
    try {

        const {sectionId, title, description} = req.body;

        const video = req.files.video;

        if(!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required."
            })
        }

        const uploadDetails = await imageUploadToCloudinary(video, process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`, description:description, videoUrl: uploadDetails.secure_url, 
        });

        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId}, {$push: {subSection: newSubSection._id }}, {new: true}).populate("subSection")

        return res.status(200).json({
            success: true,
            message: "SubSection created successfully.",
            data: updatedSection
        })

        
    } catch (error) {
        console.error("Error creating new sub-section:", error)
        return res.status(500).json({
            success: false,
            message:'Unable to create SubScetion.',
            error:error.message
        })
    }
}

exports.updateSubSection = async(req, res) => {
    try {
        const {title, description, sectionId, subSectionId} = req.body;
        const subSection = await SubSection.findById(subSectionId)

        if(!subSection) {
            return res.status(404).json({
                success: false,
                message:"SubSection not found."
            })
        }

        if(title !== undefined) {
            subSection.title = title
        }

        if(description !== undefined){
            subSection.description = description
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await imageUploadToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }

          await subSection.save();

          const updatedSection = await Section.findById(sectionId).populate("subSection")

          console.log("updated section", updatedSection)
        return res.json({
            success: true,
            message: "SubSection updated successfully.",
            data: updatedSection,
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Unable to update Subsection.",
            error: error.message
        })
    }
}

exports.deleteSubSection = async(req, res) => {
    try {
        const {subSectionId, sectionId} = req.body;

        await Section.findByIdAndUpdate({_id: sectionId},{
            $pull: {
                subSection: subSectionId
            }
        })

        const subSection = await SubSection.findByIdAndDelete({_id: subSectionId})

        if(!subSection) {
            return res.status(400).json({
                success: false,
                message: "SubSection not found"
            })
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            message: "SubSection deleted successfully.",
            data: updatedSection,
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Unable to delete SubSection.",
            error: error.message
        })
    }
}