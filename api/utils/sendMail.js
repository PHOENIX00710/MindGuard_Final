import User from "../models/userSchema.js"
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

export const sendConfirmMail=async(newDass,email)=>{
    console.log(email)
    const oAuth2Client = new google.auth.OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.REDIRECT_URL // Typically http://localhost if you're running locally
      );

    /*console.log('Authorize this app by visiting:', oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://mail.google.com/']
    }));
    */
   oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
        
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'rishavbiswas33@gmail.com',
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN, // Generated or obtained when authorizing the app
          accessToken: oAuth2Client.getAccessToken(), // Optional, will be generated automatically
          expires: 3599 // Optional, will be generated automatically
        }
      });
    transporter.verify((error,success)=>{
        if(error){
            console.log(error)
        }else{
            console.log("Ready for Messages")
            console.log(success)
        }
    })

    try {
    const user=await User.findOne({email})
    const mailOptions={
        from:`${process.env.AUTH_EMAIL}`,
        to:user.email,
        subject:"Your Dass Scores",
        text:`Dear ${user.name},\n

        We are pleased you took DASS questionairre survey, your depression, anxiety and stress levels are mentioned below:-!\n
        
        Depression Levels : ${newDass.depression_label}\n

        Anxiety Levels : ${newDass.anxiety_label}\n

        Stress Levels : ${newDass.stress_label}\n
        
        Thank you for your patience and understanding. We wish you all the best!\n
        
        Best regards,\n
        
        Swapnil,\n
        Developer,\n
        MindGuard Team\n`,
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    } catch (error) {
    console.log("Error in sending OTP:",error.message)
    //res.status(500).json({error:"Internal Server Error!!"})
}}