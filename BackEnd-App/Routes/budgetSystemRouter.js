const express = require("express");

const budgetSystemRouter = express.Router();

budgetSystemRouter.post("/create-budget", (req, res) => {
  const accessToken = req.cookies.userData;
});

module.exports = budgetSystemRouter;
