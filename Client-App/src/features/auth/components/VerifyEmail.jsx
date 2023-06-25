import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSignUpStateValue } from "../context/SignupStateProvider";

const VerifyEmail = () => {
  // on mount send request to backend to send email with verification code.
  const [{ showVerifyPage }, dispatch] = useSignUpStateValue();

  const cancelVerify = (e) => {
    e.preventDefault(); // prevent page refresh
    // load CreateAccount
    dispatch({
      type: "SET_VERIFY_PAGE",
      showVerifyPage: false,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mb-auto mt-[10%] p-6 bg-white rounded-md md:max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-black">
          Verify your email !
        </h2>
        <p className="text-lg text-center text-black mt-3">
          Verification code has been sent to email@gmail.com
        </p>
        {/* verify code */}
        <form className="mt-6">
          {/* Code Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Verification Code
            </label>
            <div className="flex flex-row cursor-pointer">
              <input
                type={"number"}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
              />
            </div>
          </div>
          <div className="w-full mt-6">
            {/* Verify */}
            <div className="min-w-max mt-4">
              <button
                className="w-full px-5 py-2.5  bg-black  rounded-lg  
                text-center mr-3 mb-2
                focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50
                "
              >
                <p className="text-white tracking-wide font-semibold">Verify</p>
              </button>
            </div>
            {/* cancel */}
            <div className="min-w-max mt-4">
              <button
                className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg mr-3 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
                onClick={cancelVerify}
              >
                <KeyboardBackspaceIcon className="svg-icons" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
