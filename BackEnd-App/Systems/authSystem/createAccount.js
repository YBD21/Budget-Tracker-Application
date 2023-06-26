const { dataBase } = require("../../firebaseConfig");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const getEmailUniqueId = (email) => {
  const hash = crypto.createHash("sha256");
  const uniqueId = hash.update(email).digest("hex");
  return uniqueId;
};

// Generate a hash from OTP
const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const encPass = bcrypt.hashSync(password, salt);
  return encPass;
};

const createAccount = async (firstName, lastName, email, password) => {
  // account operation
  // create data here
  let sendData = { Message: "", Error: "" };
  let userExist = false;

  const mailName = email.split("@")[1].split(".")[0];
  const uniqueId = getEmailUniqueId(email);

  const createAccountRef = `SignWithEmail/${mailName}/${uniqueId}`;

  const refToCreateAccount = dataBase.ref(createAccountRef);

  await refToCreateAccount.once("value", (snapshot) => {
    // console.log(snapshot.val());
    // if email is found
    if (snapshot.exists()) {
      userExist = true;
      return (sendData = {
        ...sendData,
        Error: `${email} is already registered !`,
      });
    }
  });

  const createdDate = new Date().toString();

  const encPass = encryptPassword(password);

  if (!userExist) {
    await refToCreateAccount.update(
      {
        Created_At: createdDate,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        LastSeen_At: createdDate,
        Password: encPass,
        AccountType: "Client",
        AccountID: uniqueId,
      },
      (error) => {
        if (error === null) {
          return (sendData = { ...sendData, Message: true });
        } else {
          return (sendData = { ...sendData, Error: error });
        }
      }
    );
  }
  return sendData;
};

module.exports = { createAccount, getEmailUniqueId };
