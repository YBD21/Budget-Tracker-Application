import { useState } from "react";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import ResetPassword from "../features/auth/components/ResetPassword";
import VerifyOtp from "../features/auth/components/VerifyOtp";
import { ForgotPasswordPagesOption } from "../constants/pageOptions";

const ForgotPasswordPage = () => {
  const [pageName, setPageName] = useState(ForgotPasswordPagesOption[0]);

  const switchPage = (name) => {
    setPageName(name);
  };

  switch (pageName) {
    case ForgotPasswordPagesOption[1]:
      // Verify
      return <VerifyOtp togglePage={switchPage} />;

    case ForgotPasswordPagesOption[2]:
      // reset password
      return <ResetPassword />;

    default:
      return <ForgotPassword togglePage={switchPage} />;
  }
};

export default ForgotPasswordPage;
