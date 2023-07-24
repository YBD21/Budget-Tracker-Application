const { dataBase } = require("../../firebaseConfig");

const updateUserName = async (firstName, lastName, email, userId) => {
  try {
    const mailName = email.split("@")[1].split(".")[0];
    const userRef = `SignWithEmail/${mailName}/${userId}`;
    const refToUserName = dataBase.ref(userRef);

    // update firstName and LastName
    await refToUserName.update({
      FirstName: firstName,
      LastName: lastName,
    });

    // If the update is successful, set the status to true
    return true;
  } catch (error) {
    // If an error occurs during the update process, handle it here
    console.error("Error updating user name:", error);
    // Return false to indicate that the update failed
    return false;
  }
};

module.exports = { updateUserName };
