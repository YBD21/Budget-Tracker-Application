const { dataBase } = require("../../firebaseConfig");

const deleteUserAccountFromDatabase = async (email, userId) => {
  let sendData = false;
  const mailName = email.split("@")[1].split(".")[0];
  const userRef = `SignWithEmail/${mailName}/${userId}`;
  const refToUserAccount = dataBase.ref(userRef);

  await refToUserAccount
    .remove()
    .then(() => {
      console.log(`${email} Account has been deleted successfully`);
      sendData = true;
    })
    .catch((error) => {
      console.error(`Error deleting Account : ${email} , Error :`, error);
    });

  return sendData;
};

module.exports = { deleteUserAccountFromDatabase };
