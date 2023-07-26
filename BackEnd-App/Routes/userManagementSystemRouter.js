const express = require("express");
const { authMiddleware } = require("../ middleware/authMiddleware");
const {
  updateUserNameAndGetUpdatedUserData,
} = require("../Systems/userManagement/userOperation");
const { generateToken } = require("../Systems/authSystem/login");
const {
  deleteUserAccountFromDatabase,
} = require("../Systems/userManagement/deleteUser");

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
      const {
        firstName,
        lastName,
        role,
        id,
        email,
        totalIncome,
        totalExpense,
        totalBalance,
      } = updateUserData;

      const newAccessToken = generateToken(
        firstName,
        lastName,
        role,
        id,
        email,
        totalIncome,
        totalExpense,
        totalBalance
      );
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

// Delete Account
userManagementSystemRouter.delete(
  "/delete-account",
  authMiddleware,
  async (req, res) => {
    const { id, email } = req.userData;

    console.log(`Delete Account hasbeen requested by ${email}`);

    const isDeleteAccount = await deleteUserAccountFromDatabase(email, id);

    if (isDeleteAccount === true) {
      // now delete HttpOnly Cookies
      res.clearCookie("userData", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.send(isDeleteAccount);
      console.log(`Delete Account Successful : ${email}`);
    } else {
      console.log(`Delete Account Failed : ${email}`);
      res.send(isDeleteAccount);
    }
  }
);

module.exports = userManagementSystemRouter;
