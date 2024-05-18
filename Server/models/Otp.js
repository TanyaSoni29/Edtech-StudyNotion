const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/EmailVerificationTemplate")
const otpSchema = new mongoose.Schema({

email: {
    type: String,
    required: true
},
otp: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5*60,
}
})

async function sendVerificationMail(email, otp ) {
  try {
    
  const mailResponse = await mailSender(email, "verification Email", emailTemplate(otp))
  console.log("Mail Send Successfully: ", mailResponse.response)
  } catch (error) {
    consle.log("error occure while sending mails",error)
    throw error;
  }
}

otpSchema.pre("save", async function(next) {
  if(this.isNew){
    await sendVerificationMail(this.email, this.otp)
  }
    
    next();
} )


module.exports = mongoose.model("OTP", otpSchema)