import nodemailer from "nodemailer";
import { SETTINGS } from "../config";
import { IUserDB } from "../@types/users";
import { registrationEmail } from "../utils/mailing-helper";

export const emailService = {
  
  async sendEmailConfirmationMessage(newUser: IUserDB) {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use false for STARTTLS; true for SSL on port 465
      auth: {
        user: SETTINGS.EMAIL,
        pass: SETTINGS.EMAIL_PASSWORD,
      }
    });

    // Configure the mailoptions object
    const mailOptions = {
      from: SETTINGS.EMAIL,
      to: newUser.email,
      subject: 'Sending Email using Node.js',
      html: registrationEmail(newUser.registerConfirmation.confirmationCode)
    };

    let result;

    // Send the email
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error);
      } else {
        result = info;
        console.log('Email sent: ', info.response);
      }
    });

    return result;
  }
}

