const express = require("express");

const authSystemRouter = express.Router();

const {
  generateOTP,
  generateHashFromOTP,
  sendVerificationEmail,
  verifyHash,
} = require("../Systems/authSystem/emailVerification");
const { createAccount } = require("../Systems/authSystem/createAccount");

//  Verify Email
authSystemRouter.post("/verify-email", async (req, res) => {
  const data = req.body;
  const userEmail = data.email;

  const otp = generateOTP();

  const respond = await sendVerificationEmail(userEmail, otp);

  if (respond) {
    const hashOfOTP = generateHashFromOTP(otp);
    res.json(hashOfOTP);
  } else {
    res
      .status(400)
      .send("Error sending verification email \n Try Again Later !");
  }
});

// Veriy OTP
authSystemRouter.post("/verify-otp", (req, res) => {
  const { otp, hash } = req.body;
  const isCorrect = verifyHash(otp, hash);
  res.send(isCorrect);
});

//Create Account
authSystemRouter.post("/create-account", async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  const respond = await createAccount(FirstName, LastName, Email, Password);
  res.json(respond);
});

// Login
authSystemRouter.post("login", async (req, res) => {
  const { email, password } = req.body;

  console.log(`User : ${email} Trying To Logged In !`);

  const { Message, accessToken } = await login(email, password);

  if (Message === true) {
    // set HTTP Only Cookie
    res.cookie("userData", accessToken, {
      secure: true, // set to true to enable sending the cookie only over HTTPS
      httpOnly: true, // set to true to prevent client-side scripts from accessing the cookie
      sameSite: "strict", // change to none for render hosting
    });
    console.log(`User : ${email} is Logged In ! `);
  }
});

module.exports = authSystemRouter;
