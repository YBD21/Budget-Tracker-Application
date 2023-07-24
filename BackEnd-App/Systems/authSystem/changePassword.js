const { dataBase } = require("../../firebaseConfig");
const { encryptPassword } = require("./createAccount");
const { checkPassword } = require("./login");

const changePassword = async (currentPassword, newPassword, email, userId) => {
  const mailName = email.split("@")[1].split(".")[0];
  const accountRef = `SignWithEmail/${mailName}/${userId}`;
  const refToAccount = dataBase.ref(accountRef);

  try {
    const snapshot = await refToAccount.once("value");
    if (snapshot.exists()) {
      const isCorrect = checkPassword(snapshot.val().Password, currentPassword);
      if (isCorrect === true) {
        const encPass = encryptPassword(newPassword);
        await refToAccount.update({ Password: encPass });
        console.log(`${email} : Password change was successful !`);
        return true;
      }
    }
  } catch (error) {
    console.log(`${email} : Password change failed !`);
    console.error("Error changing password:", error);
  }

  return false;
};

module.exports = { changePassword };
