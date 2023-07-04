const { fireStoreDB } = require("../../firebaseConfig");

const updateBudgetSummary = async (userId, amount, type) => {
  const typeOptions = ["Income", "Expense"];

  if (!typeOptions.includes(type)) {
    console.log("Invalid type provided");
    return false;
  }

  const budgetSummaryRef = fireStoreDB.collection("Users").doc(userId);

  try {
    const transactionStatus = await fireStoreDB.runTransaction(
      async (transaction) => {
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
            totalIncome: totalIncome + amount,
            totalBalance: totalIncome + amount - totalExpense,
          };
        } else if (type === typeOptions[1]) {
          // Expense
          updatedSummary = {
            totalExpense: totalExpense + amount,
            totalBalance: totalIncome - (totalExpense + amount),
          };
        }

        transaction.update(budgetSummaryRef, updatedSummary);
        return true;
      }
    );

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

module.exports = { updateBudgetSummary };
