const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {passwordUpdated} = require("../mail/templates/PasswordUpdate");
const mailSender = require("../utils/mailSender");

exports.sendOtp = async(req, res) => {
    try {
        
        const {email} = req.body;
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
          return  res.status(401).json({
                success: false,
                message: "User is Already Registered."
            })
        }
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
      })

      console.log("Generated Otp--", otp)

      // now check uniqueness of otp but this is not exist in industry so find another method which will unique otp always

      let result = await OTP.findOne({otp: otp})

      while(result){
         otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
          });
         
      }

     const otpPayload = {email, otp};

     // store otp in db

     const otpBody = await OTP.create(otpPayload);

     console.log(otpBody);

     res.status(200).json({
        success: true,
        message: "Otp Sent Successfully.",
        otp
     })

    } catch (error) {
       
        console.log(error);
       return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}



exports.signUp = async(req, res) => {
  try {
    const {
        firstName, lastName, email, password, confirmPassword, accountType, otp, contactNumber
    } = req.body ;

    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
        return res.status(403).json({
            success: false,
            message: "All Fields are Required."
        })
    }

    if(password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password does not match, please try again."
        })
    }
     
    const existingUser = await User.findOne({email});

    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: "User is already registered."
        })
    }

    const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
    console.log(recentOtp);

    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message:"Otp Not found."
      })

    } else if (otp !== recentOtp[0].otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid Otp."
        })
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    let approved ="";
    approved === "Instructor" ? (approved = false) : (approved=true);
    const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null
    })
     

    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType: accountType,
        approved: approved,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

    })

    return res.status(200).json({
        success: true,
        message: 'User is regitered Successfully.',
        user
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
        success: false,
        message: "User cannot be registered, Please try again."
    })
  }



}


exports.login = async(req, res) => {
    try {
      
         const {email, password} = req.body;

         if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            })
         }

         const user = await User.findOne({email}).populate("additionalDetails");

         if(!user) {
            return res.status(401).json({
                success: false, 
                message: "User is not registered, please signup first."
            })
         }

        

         if(bcrypt.compare(password, user.password)) {
         const payload = {
           email: user.email,
           id: user._id,
           accountType: user.accountType
            }


            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"24h",
            })
            user.token = token;
            user.password = undefined;
            
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in Successfully."
            })


         }
         else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect"
         })
         }

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Login failure, Please try again"
      })
    }
  
  
  
  }


  exports.changePassword = async(req, res) =>{
    try {

        const userDetails = await User.findById(req.user.id);

        const {oldPassword, newPassword} = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if(!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message:" Password doesnot match , please try again"
            })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,{password: encryptedPassword}, {new: true});

        try {
            const emailResponse = await mailSender(updatedUserDetails.email, passwordUpdated(updatedUserDetails.email,`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`));

            console.log("Email sent Successfully:", emailResponse.response);

        } catch (error) {
            console.error("Error occured while sending email:", error)

            return res.status(500).json({
                success: false,
                message:"Error occured while sending email.",
                error: error.message
            })
        }

        return res.status(200).json({
            success: true ,
            messgae: "Password updated successfully"
        })

        
    } catch (error) {
        console.error("Error occured while updating the password", error)
        return res.status(500).json({
            success: false,
            message:"Unable to update your password, please try again",
            error: error.message
        })
    }



  }