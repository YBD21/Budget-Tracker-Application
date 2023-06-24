import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import { SignupStateProvider } from "../features/auth/context/SignupStateProvider";
import signUpReducer, {
  initialSignUpState,
} from "../features/auth/context/signUpReducer";
const AccessOnceRoute = () => {
  return (
    <SignupStateProvider
      initialState={initialSignUpState}
      reducer={signUpReducer}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/ForgetPassword" element={<ForgetPassword />} />
     

      {/* Redirect from anywhere to /  */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </SignupStateProvider>
  );
};

export default AccessOnceRoute;
