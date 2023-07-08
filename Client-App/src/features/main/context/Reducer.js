export const initialState = {
  userData: [],
  entryList: [],
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

    case "SET_ENTRY_LIST":
      return {
        ...state,
        entryList: { ...action.entryList },
      };

    default:
      return state;
  }
};

export default reducer;
