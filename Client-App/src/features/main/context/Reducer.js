export const initialState = {
  userData: [],
  isViewPage: true,
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userData: { ...action.userData },
      };

    case "SET_VIEW_PAGE":
      return {
        ...state,
        isViewPage: action.isViewPage,
      };

    default:
      return state;
  }
};

export default reducer;
