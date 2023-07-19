import { useState } from "react";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import ResetPassword from "../features/auth/components/ResetPassword";
import VerifyOtp from "../features/auth/components/VerifyOtp";
import { ForgotPasswordPagesOption } from "../constants/pageOptions";

const ForgotPasswordPage = () => {
  const [pageName, setPageName] = useState(ForgotPasswordPagesOption[0]);
  const [email, setEmail] = useState("");

  const switchPage = (name) => {
    setPageName(name);
  };

  const setEmailfromChild = (Email) => {
    setEmail(Email);
  };

  switch (pageName) {
    case ForgotPasswordPagesOption[1]:
      // Verify
      return <VerifyOtp togglePage={switchPage} Email={email} />;

    case ForgotPasswordPagesOption[2]:
      // reset password
      return <ResetPassword Email={email} />;

    default:
      return (
        <ForgotPassword
          togglePage={switchPage}
          setEmailToParent={setEmailfromChild}
        />
      );
  }
};

export default ForgotPasswordPage;
