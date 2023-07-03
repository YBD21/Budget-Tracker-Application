const express = require("express");
const { verifyTokenAndDecodeToken } = require("../Systems/authSystem/login");
const { createBudget } = require("../Systems/budgetSystem/budgetOperation");

const budgetSystemRouter = express.Router();

budgetSystemRouter.post("/create-budget", async (req, res) => {
  const accessToken = req.cookies.userData;
  const userData = verifyTokenAndDecodeToken(accessToken);
  if (userData !== false) {
    const formData = req.body;
    const respond = await createBudget(userData, formData);
    res.send(respond);
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = budgetSystemRouter;
