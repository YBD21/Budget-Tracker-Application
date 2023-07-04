export const initialState = {
  userData: [],
  isViewPage: true,
  isSubmitClicked: false,
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

    case "SET_SUBMIT_CLICK":
      return {
        ...state,
        isSubmitClicked: action.isSubmitClicked,
      };

    default:
      return state;
  }
};

export default reducer;
