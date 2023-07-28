const { createBudget } = require("./createBudget");
const { deleteSingleBudgetEntryData } = require("./deleteBudget");
const { updateBudgetSummary, subtractBudgetSummary, updateBudget } = require("./updateBudget");

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

const editBudgetDataAndUpdateSummary = async (userId, PreviousBudgetData, CurrentBudgetData) => {
  let sendData = false;

  const prevBudgetId = PreviousBudgetData?.id;
  const previousBudgetData = PreviousBudgetData?.data;
  const prevAmount = previousBudgetData?.Amount;
  const prevType = previousBudgetData?.Type;

  const currentAmount = CurrentBudgetData?.Amount;
  const currentType = CurrentBudgetData?.Type;

  // subtractBudgetSummary
  const removeSummaryStatus = await subtractBudgetSummary(userId, prevAmount, prevType);

  // delete BudgetEntryData
  // const isBudgetDeleted = await deleteSingleBudgetEntryData(userId, preBudgetId);

  //addNewBudgetSummary
  const addSummaryStatus = await updateBudgetSummary(userId, currentAmount, currentType);

  // createBudget with same BudgetEntryData id
  const isBudgetUpdate = await updateBudget(userId, prevBudgetId, CurrentBudgetData);

  if (removeSummaryStatus && addSummaryStatus & isBudgetUpdate) {
    sendData = true;
  }

  return sendData;
};

module.exports = {
  createNewBudgetAndUpdateSummary,
  deleteBudgetEntryAndUpdateSummary,
  editBudgetDataAndUpdateSummary,
};
