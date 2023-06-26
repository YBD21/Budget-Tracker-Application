const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authSystemRouter = require("./Routes/authSystemRouter.js");

const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;
const url = process.env.URL || "http://localhost:3000";

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: url,
    credentials: true,
  })
);

// limit incomming json data to 1 MB
app.use(express.json({ limit: "1mb" }));

// gives ability to read cookies
app.use(cookieParser());

// Mount userRouter middleware at "/auth-System" path
app.use("/auth-system", authSystemRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
