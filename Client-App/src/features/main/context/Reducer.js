export const initialState = {
  userData: [],
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userData: { ...action.userData },
      };

    default:
      return state;
  }
};

export default reducer;
