import { useState, useEffect } from "react";

import ErrorMessageText from "../error/ErrorMessageText";
import axiosWithBaseURL from "../../../constants/axiosRoute";
import { ForgotPasswordPagesOption } from "../../../constants/pageOptions";
import ErrorMessageBoxVerify from "../error/ErrorMessageBoxVerify";

const VerifyOtp = ({ togglePage, Email }) => {
  const [otpcode, setOtpCode] = useState("");
  const [encOtp, setEncOtp] = useState("");

  const [errorOtp, setErrorOtp] = useState({});
  const [error, setError] = useState(null);

  const switchToResetPassword = () => {
    togglePage(ForgotPasswordPagesOption[2]);
  };

  const sendEmail = () => {
    axiosWithBaseURL
      .post("/auth-system/verify-email", {
        email: Email,
      })
      .then(function (respond) {
        // console.log(respond.data);
        setEncOtp(respond.data);
      })
      .catch(function (error) {
        // console.log(error.message);
        if (error.response && error.response.statusText) {
          setError(error.response.statusText);
        } else {
          setError(error.message);
        }
      });
  };

  const reSendEmail = (e) => {
    e.preventDefault(); // prevent page refresh
    sendEmail();
  };

  const cancelVerify = (e) => {
    e.preventDefault(); // prevent page refresh
    // load ForgotPassword
    togglePage(ForgotPasswordPagesOption[0]);
  };

  // Validation

  const isValidCode = () => {
    if (otpcode.length === 0) {
      setErrorOtp({
        OtpError: true,
        Message: "This Field Cannot Be Empty !",
      });
      return false;
    }

    if (otpcode.length <= 5 || otpcode.length > 6) {
      setErrorOtp({
        OtpError: true,
        Message: "Code Must Be 6 Digits Long !",
      });
      return false;
    }

    return true;
  };

  const sendOtpToBackend = () => {
    // send entered Otp and encOtp if match to backend
    axiosWithBaseURL
      .post("/auth-system/verify-otp", {
        otp: otpcode,
        hash: encOtp,
      })
      .then(function (respond) {
        // console.log(respond.data);
        // if true switchToResetPassword else wrong Otp
        if (respond.data === true) {
          switchToResetPassword();
        } else {
          return setError("Incorrect Data");
        }
      })
      .catch(function (error) {
        // console.log(error);
        if (error.response && error.response.statusText) {
          setError(error.response.statusText);
        } else {
          setError(error.message);
        }
      });
  };

  const verifyOTP = (e) => {
    e.preventDefault(); // prevent page refresh
    setError(null);

    const isValidStatus = isValidCode();

    if (isValidStatus) {
      sendOtpToBackend();
    }
  };

  useEffect(() => {
    sendEmail();
  }, [Email]);

  // clear error while typing
  useEffect(() => {
    setErrorOtp({});
  }, [otpcode]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mb-auto mt-32 p-6 bg-white rounded-md sm:max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-black">Verify your email !</h2>
        <p className="text-lg text-center text-black mt-3">
          Verification code has been sent to <strong>{Email}</strong>
        </p>
        {/* verify code */}
        <form className="mt-6">
          {/* Code Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">Verification Code</label>
            <div className="flex flex-row cursor-pointer">
              <input
                type={"text"}
                value={otpcode}
                onChange={(e) => setOtpCode(e.target.value.trim())}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
              />
            </div>
            {/* Error Message */}
            <div className="px-24">
              {errorOtp.OtpError && <ErrorMessageText props={errorOtp.Message} />}
            </div>

            <div className="flex flex-row justify-between px-2.5 pt-2 pb-2">
              <button
                className="text-sm text-[#300]  cursor-pointer hover:underline"
                onClick={reSendEmail}
              >
                Resend Code
              </button>
              <button className="text-sm cursor-pointer hover:underline" onClick={cancelVerify}>
                Go Back
              </button>
            </div>
          </div>

          {/* Display Error Message Box  */}
          {error && <ErrorMessageBoxVerify Error_message={error} status={true} />}

          {/* Verify */}
          <div className="min-w-max mt-4">
            <button
              className="w-full px-5 py-2.5 bg-black rounded-lg text-center mr-3 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
              onClick={verifyOTP}
            >
              <p className="text-white tracking-wide font-semibold">Verify</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
