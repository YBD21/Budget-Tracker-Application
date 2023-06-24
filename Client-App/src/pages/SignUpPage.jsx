import { SignupStateProvider } from "../features/auth/context/SignupStateProvider";
import signUpReducer, {
  initialSignUpState,
} from "../features/auth/context/signUpReducer";

import CreateAccount from "../features/auth/components/CreateAccount";

const SignUpPage = () => {
  return (
    <SignupStateProvider
      initialState={initialSignUpState}
      reducer={signUpReducer}
    >
      <CreateAccount />
    </SignupStateProvider>
  );
};

export default SignUpPage;
