const express = require("express");

const authSystemRouter = express.Router();

const {
  generateOTP,
  generateHashFromOTP,
  sendVerificationEmail,
  verifyHash,
} = require("../Systems/authSystem/emailVerification");

const {
  createAccount,
  getEmailUniqueId,
} = require("../Systems/authSystem/createAccount");

const {
  login,
  verifyToken,
  verifyTokenAndDecodeToken,
} = require("../Systems/authSystem/login");

const {
  createBudgetSummary,
} = require("../Systems/budgetSystem/budgetOperation");

const { verifyCaptcha } = require("../Systems/authSystem/captchaVerify");
const {
  findAccessMiddleware,
  authMiddleware,
} = require("../ middleware/authMiddleware");
const {
  findAccount,
  generateFoundAccountToken,
  resetPassword,
} = require("../Systems/authSystem/forgotPassword");
const { changePassword } = require("../Systems/authSystem/changePassword");

// read http only cookie
authSystemRouter.get("/user-data", (req, res) => {
  const accessToken = req.cookies.userData;

  if (!accessToken || !verifyToken(accessToken)) {
    res.status(401).send("Unauthorized");
  } else {
    res.json(accessToken);
  }
  console.log("User Requested AccessToken !");
});

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

// Verify Captcha
authSystemRouter.post("/verify-captcha", async (req, res) => {
  const { recaptchaResponse } = req.body;
  const verifyData = await verifyCaptcha(recaptchaResponse);

  if (verifyData.success === true) {
    // set HTTP Only Cookie
    res.cookie("findAccess", verifyData.token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
  }

  res.send(verifyData.success);
});

// Find Account
authSystemRouter.post(
  "/find-account",
  findAccessMiddleware,
  async (req, res) => {
    try {
      const { userName: email } = req.body;
      const accessData = req.accessData; // from middleware

      if (accessData?.verifyStatus === true) {
        const accountExist = await findAccount(email);

        // attach email to findAccess token

        const token = generateFoundAccountToken(email);

        // set HTTP Only Cookie
        res.cookie("findAccess", token, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });

        return res.send(accountExist);
      } else {
        return res.status(401).send("Unauthorized");
      }
    } catch (error) {
      console.error("Error occurred in Find Account Route:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Reset Password
authSystemRouter.patch("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  const resetStatus = await resetPassword(email, password);
  res.send(resetStatus);
});

// Change Password
authSystemRouter.patch("/change-password", authMiddleware, async (req, res) => {
  const { email, id } = req.userData;

  const { currentPassword, confirmPassword } = req.body;
  const respond = await changePassword(
    currentPassword,
    confirmPassword,
    email,
    id
  );
  res.json(respond);
});

//Create Account
authSystemRouter.post("/create-account", async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  const respond = await createAccount(FirstName, LastName, Email, Password);

  const userId = getEmailUniqueId(Email);

  // createBudgetSummary
  const createBudgetSummaryStatus = createBudgetSummary(userId);

  res.json(respond);
});

// Login
authSystemRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(`User : ${email} Trying To Logged In !`);

  const respond = await login(email, password);

  if (respond.Message === true) {
    // set HTTP Only Cookie
    res.cookie("userData", respond.accessToken, {
      secure: true, // set to true to enable sending the cookie only over HTTPS
      httpOnly: true, // set to true to prevent client-side scripts from accessing the cookie
      sameSite: "none",
    });

    console.log(`User : ${email} is Logged In ! `);
  }
  res.json(respond);
});

// Logout
authSystemRouter.delete("/user-data", (req, res) => {
  const accessToken = req.cookies.userData;
  const userData = verifyTokenAndDecodeToken(accessToken);

  res.clearCookie("userData", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  console.log(`User With E-Mail: ${userData?.email} LogOut X_X !`);
  res.send(true);
});

module.exports = authSystemRouter;
