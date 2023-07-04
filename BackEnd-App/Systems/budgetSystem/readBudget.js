const { fireStoreDB } = require("../../firebaseConfig");

const getBudgetSummary = async (userId) => {
  const budgetSummaryRef = fireStoreDB.collection("Users").doc(userId);

  try {
    const doc = await budgetSummaryRef.get();
    if (doc.exists) {
      const { totalIncome, totalExpense, totalBalance } = doc.data();

      return { totalIncome, totalExpense, totalBalance };
    } else {
      console.log("Budget summary document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error while retrieving budget summary:", error);
    return null;
  }
};

module.exports = { getBudgetSummary };
