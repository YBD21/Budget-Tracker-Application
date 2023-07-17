const secretKey = import.meta.env.VITE_SECRET_KEY;
const userName = import.meta.env.VITE_USER_NAME;
const Password = import.meta.env.VITE_PASSWORD;
const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_KEY;
export const hashKey = {
  secretKey,
  userName,
  Password,
  reCaptchaKey,
};
