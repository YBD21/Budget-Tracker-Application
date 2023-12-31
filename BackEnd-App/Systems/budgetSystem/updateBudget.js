const { fireStoreDB } = require("../../firebaseConfig");

const typeOptions = ["Income", "Expense"];

const updateBudgetSummary = async (userId, amount, type) => {
  if (!typeOptions.includes(type)) {
    console.log("Invalid type provided");
    return false;
  }

  const budgetSummaryRef = fireStoreDB.collection("Users").doc(userId);

  try {
    const transactionStatus = await fireStoreDB.runTransaction(async (transaction) => {
      const doc = await transaction.get(budgetSummaryRef);
      if (!doc.exists) {
        console.log("Budget summary document does not exist");
        return false;
      }

      const { totalIncome, totalExpense } = doc.data();
      let updatedSummary = {};

      if (type === typeOptions[0]) {
        // Income
        updatedSummary = {
          totalIncome: totalIncome + parseInt(amount),
          totalBalance: totalIncome + parseInt(amount) - totalExpense,
        };
      } else if (type === typeOptions[1]) {
        // Expense
        updatedSummary = {
          totalExpense: totalExpense + parseInt(amount),
          totalBalance: totalIncome - (totalExpense + parseInt(amount)),
        };
      }

      transaction.update(budgetSummaryRef, updatedSummary);
      return true;
    });

    if (transactionStatus) {
      console.log("Budget summary updated successfully");
    } else {
      console.log("Error updating budget summary");
    }

    return transactionStatus;
  } catch (error) {
    console.log("Error updating budget summary:", error);
    return false;
  }
};

const subtractBudgetSummary = async (userId, amount, type) => {
  if (!typeOptions.includes(type)) {
    console.log("Invalid type provided");
    return false;
  }

  const budgetSummaryRef = fireStoreDB.collection("Users").doc(userId);

  try {
    const transactionStatus = await fireStoreDB.runTransaction(async (transaction) => {
      const doc = await transaction.get(budgetSummaryRef);
      if (!doc.exists) {
        console.log("Budget summary document does not exist");
        return false;
      }

      const { totalIncome, totalExpense, totalBalance } = doc.data();
      let updatedSummary = {};

      if (type === typeOptions[0]) {
        // Income
        updatedSummary = {
          totalIncome: totalIncome - parseInt(amount),
          totalBalance: totalBalance - parseInt(amount),
        };
      } else if (type === typeOptions[1]) {
        // Expense
        updatedSummary = {
          totalExpense: totalExpense - parseInt(amount),
          totalBalance: totalBalance + parseInt(amount),
        };
      }

      transaction.update(budgetSummaryRef, updatedSummary);
      return true;
    });

    if (transactionStatus) {
      console.log("Budget summary updated successfully");
    } else {
      console.log("Error updating budget summary");
    }

    return transactionStatus;
  } catch (error) {
    console.log("Error updating budget summary:", error);
    return false;
  }
};

const updateBudget = async (userId, budgetId, formData) => {
  let sendData = false;

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
    .doc(budgetId);

  try {
    await budgetCollectionRef.update(newEntry);
    sendData = true;
  } catch (error) {
    console.error("Error while adding new Budget to Firestore: ", error);
  }

  return sendData;
};

module.exports = { updateBudgetSummary, subtractBudgetSummary, updateBudget };
