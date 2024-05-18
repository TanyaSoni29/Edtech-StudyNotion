// reset password token -- for the genaration of link that will be sent on mail 
 const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

exports.resetPasswordToken = async(req, res) =>{

try {
    const {email} = req.body;
    const user = await User.findOne({email: email});
    
    if(!user){
        return res.json({
            success:false,
            message:`This Email: ${email} is not Registered with us enter a valid Email`
        })
    }
    
    const token = crypto.randomBytes(20).toString("hex");
    
    const updatedDetails = await User.findOneAndUpdate({email: email}, {
        token: token,
        resetPasswordExpires: Date.now() + 3600000
    }, {new:true})

    console.log("Details", updatedDetails)
     
    const url = `http://localhost:3000/update-password/${token}`;
    
    await mailSender(email, "Password Reset Link", `Your Link for email verification is ${url}. Please click this url to reset your password.`)
    
    return res.json({
        success:true,
        message:"Email Sent Successfully, Please check email and change password."
    });


} catch (error) {
    console.log(error);
    return res.status(500).json({
        error: error.message,
        success: false,
        message:"Something Went wrong, again reset ur password."
    })
}
}





// reset password -- update in db 

exports.resetPassword = async(req, res) =>{

    try {
        const {password , confirmPassword, token} = req.body;

        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: "Password and Confirm Password doesnot match."
            })
        }

        const userDetails = await User.findOne({token: token});

        if(!userDetails) {
            return res.json({
                success: false,
                message: "Invalid Token"
            })
        }

        if(!(userDetails.resetPasswordExpires > Date.now()) ) {
            return res.json({
                success: false,
                message:"Reset link is expired, Please regenrate this link."
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        await User.findOneAndUpdate({token: token}, {password: hashedPassword}, {new: true})
        
        return res.status(200).json({
            success: true,
            message: "Passord reset Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Unable reset your password. please try again"
        })
    }
}