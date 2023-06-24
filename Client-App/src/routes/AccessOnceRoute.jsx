import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const AccessOnceRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      {/* <Route path="/ForgetPassword" element={<ForgetPassword />} />
     

      {/* Redirect from anywhere to /  */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AccessOnceRoute;
