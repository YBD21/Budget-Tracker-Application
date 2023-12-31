const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const authSystemRouter = require("./Routes/authSystemRouter.js");
const budgetSystemRouter = require("./Routes/budgetSystemRouter.js");
const userManagementSystemRouter = require("./Routes/userManagementSystemRouter.js");

const app = express();

app.use(helmet());

//set proxy
app.set("trust proxy", 1);

require("dotenv").config();
const port = process.env.PORT || 5000;
const url = process.env.URL || "http://localhost:3000";

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: "Too many attempts, please try again later",
});

const speedLimiter = slowDown({
  windowMs: 30 * 60 * 1000, // 30 minutes
  delayAfter: 200, // allow 200 requests per 30 minutes, then...
  delayMs: 500, // begin adding 5ms of delay per request above 50:
});

app.use(speedLimiter);

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: url,
    credentials: true,
  })
);

// limit incomming json data to 1 MB
app.use(express.json({ limit: "1Mb" }));

// gives ability to read and write cookies
app.use(cookieParser());

// Mount userRouter middleware at "/auth-System" path
app.use("/auth-system", apiLimiter, authSystemRouter);

// Mount userRouter middleware at "/budget-system" path
app.use("/budget-system", budgetSystemRouter);

// Mount userRouter middleware at "/budget-system" path
app.use("/user-management", userManagementSystemRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
