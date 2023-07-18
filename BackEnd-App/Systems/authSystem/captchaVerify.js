const axios = require("axios");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const googleVerifyUrl = process.env.GOOGLE_SITE_VERIFY_URL;
const reCaptchaSecretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

const verifyCaptcha = async (recaptchaResponse) => {
  let sendData = { success: false };

  const data = new URLSearchParams();
  data.append("secret", reCaptchaSecretKey);
  data.append("response", recaptchaResponse);

  try {
    const respond = await axios.post(googleVerifyUrl, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(respond.data);

    if (respond.data.success) {
      // ReCAPTCHA verification successful
      sendData.success = true;
      const token = generateCaptchaVerifyToken();
      sendData = { ...sendData, token };
      console.log("Captcha verification successful !");
    } else {
      // ReCAPTCHA verification failed
      console.log("Captcha verification failed !");
    }
  } catch (error) {
    // ReCAPTCHA Error
    console.error("Error verifying ReCAPTCHA:", error);
  }

  return sendData;
};

const generateCaptchaVerifyToken = () => {
  const message = { verifyStatus: true };
  const token = jwt.sign(message, reCaptchaSecretKey, { expiresIn: "10m" });
  return token;
};

module.exports = { verifyCaptcha };
