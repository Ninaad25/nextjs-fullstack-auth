import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"


export const sendMail = async({email, emailType, userId} : any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10) // create hashed token

       if (emailType === "VERIFY") {
         await User.findByIdAndUpdate(userId, {
           verifyToken: hashedToken,
           verifyTokenExpiry: Date.now() + 3600000,
         });
       } else if (emailType === "RESET") {
         await User.findByIdAndUpdate(userId, {
           forgotPasswordToken: hashedToken,
           forgotPasswordTokenExpiry: Date.now() + 3600000,
         });
       }

       var transporter = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
           user: "0ce6ccd7d55b86",
           pass: "6db1279aaa2e01",
         },
       });

       const mailOption = {
         from: "ninaad@email.com",
         to: email,
         subject:
           emailType === "VERIFY" ? "Verify your email" : "Reset your password",
         html: `<p>Click <a href="${process.env.DOMAIN}/
         verifyemail?token=${hashedToken}">here</a> to 
         ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
           or copy & paste the below link in your browser:
           <br> ${process.env.DOMAIN}/verifyemail?
           token=${hashedToken}
           </p>`,
       };

       const mailResponse = await transporter.sendMail(mailOption)
       return mailResponse;

    } catch(error:any){
        throw new Error(error.message)
    }
    
}

