const { dataBase } = require("../../firebaseConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getEmailUniqueId } = require("./createAccount");
const { getBudgetSummary } = require("../budgetSystem/readBudget");

require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const checkPassword = (hashPassword, password) => {
  const check = bcrypt.compareSync(password, hashPassword);
  return check;
};

const generateToken = (
  userFirstName,
  userLastName,
  userRole,
  userId,
  userEmail,
  totalIncome,
  totalExpense,
  totalBalance
) => {
  //firstName,lastName,mobileNumber,accountType
  const filterData = {
    firstName: userFirstName,
    lastName: userLastName,
    role: userRole,
    id: userId,
    email: userEmail,
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    totalBalance: totalBalance,
  };

  const token = jwt.sign(filterData, secretKey, { expiresIn: "1h" });

  return token;
};

const verifyToken = (token) => {
  let sendData = false;
  jwt.verify(token, secretKey, function (err) {
    if (err) {
      console.log(err.message);
    } else {
      // console.log(decoded);
      sendData = true;
    }
  });
  return sendData;
};

const verifyTokenAndDecodeToken = (token) => {
  let sendData = false;
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log(err.message);
    } else {
      sendData = { ...decoded };
    }
  });
  return sendData;
};

const login = async (email, password) => {
  let sendData = { Message: "", Error: "" };

  const mailName = email.split("@")[1].split(".")[0];
  const userId = getEmailUniqueId(email);

  // getBudgetSummary

  const { totalIncome, totalExpense, totalBalance } = await getBudgetSummary(
    userId
  );

  const loginRef = `SignWithEmail/${mailName}/${userId}`;

  const refToLogin = dataBase.ref(loginRef);

  await refToLogin.once("value", (snapshot) => {
    // email found
    if (snapshot.exists()) {
      // check if account is disable
      if (snapshot.val().IsDisable === true) {
        return (sendData = { ...sendData, Error: "Disable Account" });
      } else {
        // update lastSeen
        const currentDate = new Date().toString();
        refToLogin.update({
          lastSeen: currentDate,
        });

        // createJwtToken With userData
        const firstName = snapshot.val().FirstName;
        const lastName = snapshot.val().LastName;
        const role = snapshot.val().AccountType;
        const userId = snapshot.val().AccountID;
        const email = snapshot.val().Email;

        // update token with totalIncome,totalExpense,totalBalance

        const token = generateToken(
          firstName,
          lastName,
          role,
          userId,
          email,
          totalIncome,
          totalExpense,
          totalBalance
        );
        // checkPassword and send to client

        return (sendData = {
          ...sendData,
          Message: checkPassword(snapshot.val().Password, password),
          accessToken: token,
        });
      }
    } else {
      return (sendData = { ...sendData, Error: "Incorrect Data" });
    }
  });
  return sendData;
};

module.exports = {
  login,
  checkPassword,
  generateToken,
  verifyToken,
  verifyTokenAndDecodeToken,
};
