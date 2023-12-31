const { fireStoreDB } = require("../../firebaseConfig");
const { createBudgetSummary } = require("./createBudget");

const getBudgetSummary = async (userId) => {
  const budgetSummaryRef = fireStoreDB.collection("Users").doc(userId);

  try {
    const doc = await budgetSummaryRef.get();

    if (doc.exists) {
      const { totalIncome, totalExpense, totalBalance } = doc.data();
      return { totalIncome, totalExpense, totalBalance };
    } else {
      console.log("Budget summary document does not exist");
      // Call createBudgetSummary to create the budget summary document
      const status = await createBudgetSummary(userId);

      // If createBudgetSummary was successful, get the budget summary again
      if (status === true) {
        const updatedDoc = await budgetSummaryRef.get();
        if (updatedDoc.exists) {
          const { totalIncome, totalExpense, totalBalance } = updatedDoc.data();
          return { totalIncome, totalExpense, totalBalance };
        }
      }
    }
  } catch (error) {
    console.error("Error while retrieving budget summary:", error);
    return null;
  }
};

const getBudgetEntryData = async (userId, orderByDate) => {
  let orderBy = "desc";
  // Latest == desc
  // Oldest = asc
  const dateRangeOptions = ["Latest", "Oldest"];

  if (orderByDate === dateRangeOptions[1]) {
    orderBy = "asc";
  }

  const budgetEntryDataRef = fireStoreDB
    .collection(`Users/${userId}/BudgetEntry`)
    .orderBy("Created_At", orderBy);
  // .limit(15);
  try {
    const snapshot = await budgetEntryDataRef.get();

    const entryDataList = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return entryDataList;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

module.exports = { getBudgetSummary, getBudgetEntryData };
