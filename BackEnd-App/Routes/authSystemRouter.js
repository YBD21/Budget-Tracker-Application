const express = require("express");

const authSystemRouter = express.Router();

const {
  generateOTP,
  generateHashFromOTP,
  sendVerificationEmail,
} = require("../Systems/authSystem/emailVerification");

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

module.exports = authSystemRouter;
