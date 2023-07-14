const secretKey = import.meta.env.VITE_SECRET_KEY;
const userName = import.meta.env.VITE_USER_NAME;
const Password = import.meta.env.VITE_PASSWORD;
export const hashKey = {
  secretKey,
  userName,
  Password,
};
