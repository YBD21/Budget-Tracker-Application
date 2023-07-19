import { ForgotPasswordPagesOption } from "../../../constants/pageOptions";

const VerifyOtp = ({ togglePage }) => {
  const switchToResetPassword = () => {
    togglePage(ForgotPasswordPagesOption[2]);
  };
  return <div>VerifyOtp</div>;
};

export default VerifyOtp;
