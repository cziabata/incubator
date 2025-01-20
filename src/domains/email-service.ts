import nodemailer from "nodemailer";
import { SETTINGS } from "../config";
import { IUserDB } from "../@types/users";
import { registrationEmail, passwordRecoveryEmail } from "../utils/mailing-helper";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: SETTINGS.EMAIL,
    pass: SETTINGS.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: SETTINGS.EMAIL,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const emailService = {
  async sendEmailConfirmationMessage(newUser: IUserDB) {
    return sendEmail(
      newUser.email,
      "Confirm your registration",
      registrationEmail(newUser.registerConfirmation.confirmationCode)
    );
  },

  async sendPasswordRecoveryEmail(newUser: IUserDB) {
    return sendEmail(
      newUser.email,
      "Password recovery",
      passwordRecoveryEmail(newUser.registerConfirmation.confirmationCode)
    );
  },
};
