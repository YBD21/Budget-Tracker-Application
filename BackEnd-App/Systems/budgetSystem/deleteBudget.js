const { fireStoreDB } = require("../../firebaseConfig");

const deleteSingleBudgetEntryData = async (userId, dataIdToDelete) => {
  const budgetEntryDataRef = fireStoreDB.collection(
    `Users/${userId}/BudgetEntry`
  );

  try {
    const documentRef = budgetEntryDataRef.doc(dataIdToDelete);
    await documentRef.delete();
    console.log("Document deleted successfully.");
    return true; // Return true if deletion is successful
  } catch (error) {
    console.error("Error deleting document:", error);
    return false; // Return false if deletion fails
  }
};

module.exports = { deleteSingleBudgetEntryData };
