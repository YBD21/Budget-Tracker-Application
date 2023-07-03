const express = require("express");
const { verifyTokenAndDecodeToken } = require("../Systems/authSystem/login");

const budgetSystemRouter = express.Router();

budgetSystemRouter.post("/create-budget", (req, res) => {
  const accessToken = req.cookies.userData;
  const decodedToken = verifyTokenAndDecodeToken(accessToken);
  if (decodedToken !== false) {
    // const { Name, Amount, Date, Type, Reoccure } = req.body;
    const data = req.body;
    console.log(data);
  }
  res.send("ok");
});

module.exports = budgetSystemRouter;
