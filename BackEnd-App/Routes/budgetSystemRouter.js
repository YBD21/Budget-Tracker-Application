const express = require("express");
const {
  verifyTokenAndDecodeToken,
  generateToken,
} = require("../Systems/authSystem/login");
const {
  createNewBudgetAndUpdateSummary,
} = require("../Systems/budgetSystem/budgetOperation");
const { getBudgetSummary } = require("../Systems/budgetSystem/readBudget");

const budgetSystemRouter = express.Router();

budgetSystemRouter.post("/create-budget", async (req, res) => {
  const accessToken = req.cookies.userData;
  const userData = verifyTokenAndDecodeToken(accessToken);
  if (userData !== false) {
    const formData = req.body;
    // create new budget and update Budget Summary
    const respond = await createNewBudgetAndUpdateSummary(userData, formData);
    res.send(respond);
  } else {
    res.status(401).send("Unauthorized");
  }
});

budgetSystemRouter.get("/get-budget-summary", async (req, res) => {
  const accessToken = req.cookies.userData;
  const userData = verifyTokenAndDecodeToken(accessToken);
  if (userData !== false) {
    const { firstName, lastName, role, id, email } = userData;
    //  get budget-summary
    const { totalIncome, totalExpense, totalBalance } = await getBudgetSummary(
      id
    );

    // console.log(totalIncome, totalExpense, totalBalance);

    // set HTTP Only cookies copy userData except budgetsummary
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

    res.cookie("userData", newAccessToken, {
      secure: true, // set to true to enable sending the cookie only over HTTPS
      httpOnly: true, // set to true to prevent client-side scripts from accessing the cookie
      sameSite: "strict",
    });

    res.send(newAccessToken);
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = budgetSystemRouter;
