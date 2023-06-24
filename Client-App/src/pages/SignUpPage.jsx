import CreateAccount from "../features/auth/components/CreateAccount";
import VerifyEmail from "../features/auth/components/VerifyEmail";
import { useSignUpStateValue } from "../features/auth/context/SignupStateProvider";

const SignUpPage = () => {
  const [{ showVerifyPage }] = useSignUpStateValue();
  return (
    // <CreateAccount />
    <VerifyEmail />
  );
};

export default SignUpPage;
