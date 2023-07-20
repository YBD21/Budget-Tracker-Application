import { useState } from "react";
import FindAccount from "../features/auth/components/FindAccount";
import ResetPassword from "../features/auth/components/ResetPassword";
import VerifyOtp from "../features/auth/components/VerifyOtp";
import { ForgotPasswordPagesOption } from "../constants/pageOptions";

const ForgotPasswordPage = () => {
  //ForgotPasswordPagesOption[0]
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
        <FindAccount
          togglePage={switchPage}
          setEmailToParent={setEmailfromChild}
        />
      );
  }
};

export default ForgotPasswordPage;
