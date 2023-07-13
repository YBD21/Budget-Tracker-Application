const { createBudget } = require("./createBudget");
const { deleteSingleBudgetEntryData } = require("./deleteBudget");
const {
  updateBudgetSummary,
  subtractBudgetSummary,
} = require("./updateBudget");

const createNewBudgetAndUpdateSummary = async (userData, formData) => {
  // formData -- Title, Amount, Date, Type, Reoccure
  // userData -- firstName , lastName , role , id , email
  let sendData = false;

  const userId = userData.id;

  const isNewBudgetCreated = await createBudget(userId, formData);

  const { Amount, Type } = formData;

  const updateSummaryStatus = await updateBudgetSummary(userId, Amount, Type);

  if (isNewBudgetCreated && updateSummaryStatus) {
    sendData = true;
  }

  return sendData;
};

const deleteBudgetEntryAndUpdateSummary = async (userId, dataToDelete) => {
  let sendData = false;
  const { id, data } = dataToDelete;
  const amount = data?.Amount;
  const type = data?.Type;

  // subtractBudgetSummary
  const updateSummaryStatus = await subtractBudgetSummary(userId, amount, type);

  // deletebudget
  const isBudgetDeleted = await deleteSingleBudgetEntryData(userId, id);

  if (isBudgetDeleted && updateSummaryStatus) {
    sendData = true;
  }

  return sendData;
};

module.exports = {
  createNewBudgetAndUpdateSummary,
  deleteBudgetEntryAndUpdateSummary,
};
