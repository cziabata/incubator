import nodemailer from "nodemailer";
import { SETTINGS } from "../config";

export const emailService = {
  async send() {
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
      to: SETTINGS.TO_EMAIL,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
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

