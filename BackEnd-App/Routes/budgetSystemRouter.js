const express = require("express");
const {
  verifyTokenAndDecodeToken,
  generateToken,
} = require("../Systems/authSystem/login");
const {
  createNewBudgetAndUpdateSummary,
  deleteBudgetEntryAndUpdateSummary,
} = require("../Systems/budgetSystem/budgetOperation");
const {
  getBudgetSummary,
  getBudgetEntryData,
} = require("../Systems/budgetSystem/readBudget");

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

    // set cookies
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

budgetSystemRouter.get("/get-entry-data", async (req, res) => {
  const accessToken = req.cookies.userData;
  const userData = verifyTokenAndDecodeToken(accessToken);

  if (userData !== false) {
    const { id } = userData;
    const { orderByDate } = req.query;

    //  get budget entry data
    const userEntryData = await getBudgetEntryData(id, orderByDate);
    console.log(`User requested BudgetEntry Data`);
    res.status(200).send(userEntryData);
  } else {
    res.status(401).send("Unauthorized");
  }
});

budgetSystemRouter.delete("/delete-budget-data", async (req, res) => {
  const accessToken = req.cookies.userData;
  const userData = verifyTokenAndDecodeToken(accessToken);
  if (userData !== false) {
    const { id: userId } = userData;
    const data = req.query;
    console.log(`User requested to Delete BudgetEntry Data`);
    const respond = await deleteBudgetEntryAndUpdateSummary(userId, data);
    res.status(200).send(respond);
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = budgetSystemRouter;
