const jwt = require("jsonwebtoken");
const { dataBase } = require("../../firebaseConfig");
const { getEmailUniqueId } = require("./createAccount");

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

module.exports = { findAccount, generateFoundAccountToken };
