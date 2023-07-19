const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Email = process.env.MAIL;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: Email,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Generate a random OTP
const generateOTP = () => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// Generate a hash from OTP
const generateHashFromOTP = (otp) => {
  const salt = bcrypt.genSaltSync(7);
  const hashOfOTP = bcrypt.hashSync(otp, salt);
  return hashOfOTP;
};

// Send verification email

const sendVerificationEmail = async (userEmail, otp) => {
  // HTML email template
  const html = `
 <h1>Verify Your Email</h1>
 <p>Please use the following OTP to verify your email:</p>
 <h2>${otp}</h2>
 <p><i>Note: This is a system-generated email. Please do not reply.</i></p>
`;

  const mailOptions = {
    from: `"BudgetTracker"${Email}`, // sender address
    to: `${userEmail}`, // list of receivers
    subject: "Email Verification", // Subject line
    html: html, // html body
    replyTo: false,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

// verify One Time Password
const verifyHash = (otp, hash) => {
  const check = bcrypt.compareSync(otp, hash);
  return check;
};

module.exports = {
  generateOTP,
  generateHashFromOTP,
  sendVerificationEmail,
  verifyHash,
};
