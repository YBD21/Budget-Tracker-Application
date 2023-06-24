import CreateAccount from "../features/auth/components/CreateAccount";
import { useSignUpStateValue } from "../features/auth/context/SignupStateProvider";

const SignUpPage = () => {
  const [{ showVerifyPage }] = useSignUpStateValue();
  return <CreateAccount />;
};

export default SignUpPage;
