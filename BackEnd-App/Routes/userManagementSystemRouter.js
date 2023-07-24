const express = require("express");
const { authMiddleware } = require("../ middleware/authMiddleware");
const {
  updateUserNameAndGetUpdatedUserData,
} = require("../Systems/userManagement/userOperation");
const { generateToken } = require("../Systems/authSystem/login");

const userManagementSystemRouter = express.Router();

userManagementSystemRouter.patch(
  "/edit-user-name",
  authMiddleware,
  async (req, res) => {
    const userData = req.userData;
    const { FirstName: firstName, LastName: lastName } = req.body;

    const updateUserData = await updateUserNameAndGetUpdatedUserData(
      firstName,
      lastName,
      userData
    );

    if (updateUserData !== false) {
      // set HTTP Only cookies copy userData except budgetsummary
      const newAccessToken = generateToken({ ...updateUserData });
      // set cookies
      res.cookie("userData", newAccessToken, {
        secure: true, // set to true to enable sending the cookie only over HTTPS
        httpOnly: true, // set to true to prevent client-side scripts from accessing the cookie
        sameSite: "none",
      });

      res.send(newAccessToken);
    } else {
      // send false
      res.send(false);
    }
  }
);

module.exports = userManagementSystemRouter;
