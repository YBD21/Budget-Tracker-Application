import CreateAccount from "../features/auth/components/CreateAccount";
import VerifyEmail from "../features/auth/components/VerifyEmail";
import { useSignUpStateValue } from "../features/auth/context/SignupStateProvider";

const SignUpPage = () => {
  const [{ showVerifyPage }] = useSignUpStateValue();

  if (showVerifyPage === true) {
    return <VerifyEmail />;
  }
  return <CreateAccount />;
};

export default SignUpPage;
