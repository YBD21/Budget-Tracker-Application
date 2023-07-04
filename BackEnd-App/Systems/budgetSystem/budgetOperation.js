const { createBudget } = require("./createBudget");
const { updateBudgetSummary } = require("./updateBudget");

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

module.exports = { createNewBudgetAndUpdateSummary };
