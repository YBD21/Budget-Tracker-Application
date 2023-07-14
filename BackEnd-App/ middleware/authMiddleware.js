const { verifyTokenAndDecodeToken } = require("../Systems/authSystem/login");

const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.cookies.userData;
    const userData = verifyTokenAndDecodeToken(accessToken);
    if (userData === false) {
      return res.status(401).send("Unauthorized");
    }
    req.userData = userData;
    next();
  } catch (error) {
    console.error("Error occurred in authMiddleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authMiddleware;
