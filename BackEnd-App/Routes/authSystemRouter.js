const express = require("express");

const authSystemRouter = express.Router();

const {
  generateOTP,
  generateHashFromOTP,
  sendVerificationEmail,
  verifyHash,
} = require("../Systems/authSystem/emailVerification");
const { createAccount } = require("../Systems/authSystem/createAccount");

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

authSystemRouter.post("/verify-otp", (req, res) => {
  const { otp, hash } = req.body;
  const isCorrect = verifyHash(otp, hash);
  res.send(isCorrect);
});

authSystemRouter.post("/create-account", async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  const respond = await createAccount(FirstName, LastName, Email, Password);
});

module.exports = authSystemRouter;
