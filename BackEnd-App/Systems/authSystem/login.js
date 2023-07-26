const { dataBase } = require("../../firebaseConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getEmailUniqueId } = require("./createAccount");
const { getBudgetSummary } = require("../budgetSystem/readBudget");

require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;
const reCaptchaSecretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

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

const verifyFindAccessTokenAndDecode = (token) => {
  let sendData = false;
  jwt.verify(token, reCaptchaSecretKey, function (err, decoded) {
    if (err) {
      console.log(err.message);
    } else {
      sendData = { ...decoded };
    }
  });
  return sendData;
};

const login = async (email, password) => {
  try {
    const sendData = { Message: "", Error: "" };

    const mailName = email.split("@")[1].split(".")[0];
    const userId = getEmailUniqueId(email);
    const loginRef = `SignWithEmail/${mailName}/${userId}`;
    const refToLogin = dataBase.ref(loginRef);
    const snapshot = await refToLogin.once("value");

    if (!snapshot.exists()) {
      sendData.Error = "Incorrect Data";
      return sendData;
    }

    if (snapshot.val().IsDisable) {
      sendData.Error = "Disable Account";
      return sendData;
    }

    const isPasswordCorrect = checkPassword(snapshot.val().Password, password);
    if (!isPasswordCorrect) {
      sendData.Error = "Incorrect Data";
      return sendData;
    }

    const {
      FirstName: firstName,
      LastName: lastName,
      AccountType: role,
      AccountID: accountId,
      Email: userEmail,
    } = snapshot.val();

    const { totalIncome, totalExpense, totalBalance } = await getBudgetSummary(
      userId
    );

    const token = generateToken(
      firstName,
      lastName,
      role,
      accountId,
      userEmail,
      totalIncome,
      totalExpense,
      totalBalance
    );

    const currentDate = new Date().toString();
    await refToLogin.update({
      LastSeen_At: currentDate,
    });

    sendData.Message = isPasswordCorrect;
    sendData.accessToken = token;
    return sendData;
  } catch (error) {
    console.error("Error occurred:", error);
    return { Message: "", Error: "An error occurred" };
  }
};

module.exports = {
  login,
  checkPassword,
  generateToken,
  verifyToken,
  verifyTokenAndDecodeToken,
  verifyFindAccessTokenAndDecode,
};
