const jwt = require("jsonwebtoken");
const { dataBase } = require("../../firebaseConfig");
const { getEmailUniqueId, encryptPassword } = require("./createAccount");

require("dotenv").config();

const reCaptchaSecretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

const findAccount = async (email) => {
  let userExist = false;

  // mail type eg- gmail, hotmail etc..
  const mailName = email.split("@")[1].split(".")[0];
  const uniqueId = getEmailUniqueId(email);

  const findAccountRef = `SignWithEmail/${mailName}/${uniqueId}`;

  const refToFindAccount = dataBase.ref(findAccountRef);

  await refToFindAccount.once("value", (snapshot) => {
    // if email is found
    if (snapshot.exists()) {
      userExist = true;
    }
  });

  return userExist;
};

const generateFoundAccountToken = (email) => {
  const message = { verifyStatus: true, email };

  const token = jwt.sign(message, reCaptchaSecretKey, { expiresIn: "10m" });
  return token;
};

const resetPassword = async (email, newPassword) => {
  const mailName = email.split("@")[1].split(".")[0];

  try {
    const [uniqueId, encPassword] = await Promise.all([
      getEmailUniqueId(email),
      encryptPassword(newPassword),
    ]);

    const accountRef = `SignWithEmail/${mailName}/${uniqueId}`;
    const refToAccount = dataBase.ref(accountRef);

    // Check if the account exists by getting the snapshot
    const snapshot = await refToAccount.once("value");
    if (!snapshot.exists()) {
      // Account not found, return false
      console.error("Account not found for email:", email);
      return false;
    }

    // Update the password
    await refToAccount.update({ Password: encPassword });

    // Update successful, return true
    return true;
  } catch (error) {
    // Error occurred, return false
    console.error("Error updating password:", error);
    return false;
  }
};

module.exports = { findAccount, generateFoundAccountToken, resetPassword };
