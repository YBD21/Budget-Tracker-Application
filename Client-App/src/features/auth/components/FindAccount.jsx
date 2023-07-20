import { useState } from "react";
import { Link } from "react-router-dom";

import { hashKey } from "../../../constants/hashKey";
import { ForgotPasswordPagesOption } from "../../../constants/pageOptions";

import ReCAPTCHA from "react-google-recaptcha";
import SearchIcon from "@mui/icons-material/Search";
import axiosWithBaseURL from "../../../constants/axiosRoute";
import ErrorMessageText from "../error/ErrorMessageText";

const FindAccount = ({ togglePage, setEmailToParent }) => {
  const [recapchaStatus, setRecapchaStatus] = useState(false);
  const [email, setEmail] = useState("");

  const [error, setError] = useState(null);
  const [errorFindAccount, setErrorFindAccount] = useState({});
  const [errorEmail, setErrorEmail] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateStatus = validateEmail();
    if (validateStatus === true) {
      setRecapchaStatus(true);
    }
  };

  const handleChangeRecapcha = (response) => {
    verifyRecapcha(response);
  };

  const validateEmail = () => {
    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
      setErrorEmail({
        Email: true,
        Message: "Email Cannot Be Empty !",
      });
      return false;
    }

    if (!emailPattern.test(email)) {
      setErrorEmail({
        Email: true,
        Message: "Invalid Email !",
      });
      return false;
    }

    return true;
  };

  const switchToVerifyOTP = () => {
    togglePage(ForgotPasswordPagesOption[1]);
    setEmailToParent(email);
  };

  const verifyRecapcha = (response) => {
    axiosWithBaseURL
      .post(
        "/auth-system/verify-captcha",
        {
          recaptchaResponse: response,
        },
        {
          withCredentials: true, // enable sending and receiving cookies
        }
      )
      .then(function (respond) {
        console.log(respond.data);
        // request backend to find Account
        if (respond.data === true) {
          findAccount();
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const findAccount = () => {
    axiosWithBaseURL
      .post(
        "/auth-system/find-account",
        { userName: email },
        {
          withCredentials: true, // enable sending and receiving cookies
        }
      )
      .then(function (respond) {
        if (respond.data === true) {
          switchToVerifyOTP();
        } else {
          setErrorFindAccount({
            Find: true,
            Message: "Email not registered. Please sign up to continue.",
          });
        }
      })
      .catch(function (error) {
        console.log(error.message);
        // throw error message
        if (error?.response?.statusText) {
          // console.log(error.response.statusText);
          setError(error?.response?.statusText);
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-full p-6 mb-auto mx-auto mt-32 rounded-md sm:max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">
          Find Account
        </h2>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="pb-2">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />

            {errorEmail.Email && (
              <ErrorMessageText props={errorEmail?.Message} />
            )}

            {errorFindAccount.Find && (
              <ErrorMessageText props={errorFindAccount?.Message} />
            )}
          </div>

          {/* Error Message Box*/}

          {error && (
            <ErrorMessageBoxForgorPassword
              Error_message={error}
              status={true}
            />
          )}

          {/* ReCapcha */}
          {recapchaStatus ? (
            <div className="flex justify-center mt-2">
              <ReCAPTCHA
                sitekey={hashKey.reCaptchaKey}
                size="normal"
                onChange={handleChangeRecapcha}
              />
            </div>
          ) : (
            <div className="min-w-max">
              {/* Search */}
              <button
                className="w-full px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-3 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
              >
                <SearchIcon className="scale-150 mr-4" />
                Search
              </button>
            </div>
          )}
        </form>

        <div className="mt-5">
          <p className="text-center text-sm text-gray-800">
            Return to Login ? &nbsp;
            <Link
              to="/Login"
              className="font-semibold leading-6 text-[#300] hover:underline"
            >
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FindAccount;
