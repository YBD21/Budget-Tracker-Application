const { updateUserName } = require("./updateUser");

const updateUserNameAndGetUpdatedUserData = async (
  firstName,
  lastName,
  userData
) => {
  try {
    const { id, role, email, totalIncome, totalExpense, totalBalance } =
      userData;

    // Wait for the updateUserName function to complete using await
    const updateUserNameStatus = await updateUserName(firstName, lastName, id);

    if (updateUserNameStatus === true) {
      // If the update is successful, return the updated data
      return {
        firstName,
        lastName,
        role,
        id,
        email,
        totalIncome,
        totalExpense,
        totalBalance,
      };
    } else {
      // If the update failed, return false
      return false;
    }
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error updating user name:", error);
    // Return false
    return false;
  }
};

module.exports = { updateUserNameAndGetUpdatedUserData };
