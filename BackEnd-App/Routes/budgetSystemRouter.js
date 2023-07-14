const express = require("express");
const { generateToken } = require("../Systems/authSystem/login");
const {
  createNewBudgetAndUpdateSummary,
  deleteBudgetEntryAndUpdateSummary,
} = require("../Systems/budgetSystem/budgetOperation");
const {
  getBudgetSummary,
  getBudgetEntryData,
} = require("../Systems/budgetSystem/readBudget");

const authMiddleware = require("../ middleware/authMiddleware");

const budgetSystemRouter = express.Router();

budgetSystemRouter.post("/create-budget", authMiddleware, async (req, res) => {
  const userData = req.userData;
  const formData = req.body;
  // console.log("formData", req.body);
  // console.log("User data", userData);
  // create new budget and update Budget Summary
  const respond = await createNewBudgetAndUpdateSummary(userData, formData);
  res.send(respond);
});

budgetSystemRouter.get(
  "/get-budget-summary",
  authMiddleware,
  async (req, res) => {
    const userData = req.userData;
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
  }
);

budgetSystemRouter.get("/get-entry-data", authMiddleware, async (req, res) => {
  const userData = req.userData;

  const { id } = userData;
  const { orderByDate } = req.query;

  //  get budget entry data
  const userEntryData = await getBudgetEntryData(id, orderByDate);
  console.log(`User requested BudgetEntry Data`);
  res.status(200).send(userEntryData);
});

budgetSystemRouter.delete("/delete-budget-data", async (req, res) => {
  const userData = req.userData;
  const { id: userId } = userData;
  const data = req.query;
  console.log(`User requested to Delete BudgetEntry Data`);
  const respond = await deleteBudgetEntryAndUpdateSummary(userId, data);
  res.status(200).send(respond);
});

module.exports = budgetSystemRouter;
