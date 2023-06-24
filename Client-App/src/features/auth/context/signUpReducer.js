export const initialSignUpState = {
  firstname: "",
  lastname: "",
  Email: "",
  password: "",
  showVerifyPage: false,
};

const signUpReducer = (state, action) => {
  switch (action.type) {
    case "SET_SIGNUP_DATA":
      return {
        ...state,
        firstname: action.firstname,
        lastname: action.lastname,
        Email: action.Email,
        password: action.password,
      };

    case "EMPTY_SIGNUP_DATA":
      return {
        ...state,
        initialSignUpState,
      };

    case "SET_VERIFY_PAGE":
      return {
        ...state,
        showVerifyPage: action.showVerifyPage,
      };

    default:
      return state;
  }
};

export default signUpReducer;
