const { fireStoreDB } = require("../../firebaseConfig");

const createBudget = async (userData, formData) => {
  // formData -- Name, Amount, Date, Type, Reoccure
  // userData -- firstName , lastName , role , id , email
  // path of firestore -- User/userid/BudgetEntry/createdDate
  let sendData = false;
  const userId = userData.id;
  const unixTimestamp = new Date().getTime();

  const newEntry = {
    Title: formData.Title,
    Amount: formData.Amount,
    Date: formData.Date,
    Type: formData.Type,
    Reoccure: formData.Reoccure,
    Created_At: unixTimestamp,
  };

  const budgetCollectionRef = fireStoreDB
    .collection("Users")
    .doc(userId)
    .collection("BudgetEntry")
    .doc(unixTimestamp.toString());

  try {
    await budgetCollectionRef.set(newEntry);
    sendData = true;
    // sendData = await createBudgetSummary(userId);
  } catch (error) {
    console.error("Error while adding new Budget to Firestore: ", error);
  }

  return sendData;
};

const createBudgetSummary = async (userId) => {
  let sendData = false;
  const budgetSummaryRef = fireStoreDB.collection("Users").doc(userId);

  const newSummary = {
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  };

  try {
    await budgetSummaryRef.set(newSummary);
    sendData = true;
  } catch (error) {
    console.error("Error while adding new Budget to Firestore: ", error);
  }
  return sendData;
};

const updateBudgetSummary = (Amount, Type) => {
  const budgetSummaryRef = fireStoreDB
    .collection("Users")
    .doc(userId)
    .collection("Summary");
};

module.exports = { createBudget, createBudgetSummary, updateBudgetSummary };
