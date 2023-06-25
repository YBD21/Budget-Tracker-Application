import { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import ErrorMessageText from "../error/ErrorMessageText";
import { useSignUpStateValue } from "../context/SignupStateProvider";

const CreateAccount = () => {
  const [{ firstname, lastname, Email, password }, dispatch] =
    useSignUpStateValue();

  const [firstName, setFirstName] = useState(firstname);
  const [lastName, setLastName] = useState(lastname);
  const [email, setEmail] = useState(Email);
  const [createPassword, setCreatePassword] = useState(password);
  const [confirmPassword, setConfirmPassword] = useState(password);

  const [open, setOpen] = useState(false);

  const [errorfirstname, setErrorFirstName] = useState({});
  const [errorlastname, setErrorLastName] = useState({});
  const [erroremail, setErrorEmail] = useState({});
  const [errorcreatepassword, setErrorCreatePassword] = useState({});
  const [errorconfirmpassword, setErrorConfirmPassword] = useState({});

  const handelFirstNameChange = (e) => {
    const trimmedFirstName = e.target.value.trim();
    const capitalizedValue =
      trimmedFirstName.charAt(0).toUpperCase() + trimmedFirstName.slice(1);

    setFirstName(capitalizedValue);
  };

  const handelLastNameChange = (e) => {
    const trimmedLastName = e.target.value.trim();
    // uppercase first char and remove prev first char and concate it
    const capitalizedValue =
      trimmedLastName.charAt(0).toUpperCase() + trimmedLastName.slice(1);

    setLastName(capitalizedValue);
  };

  const checkEmptyField = () => {
    let count = 0;
    if (firstName.length === 0) {
      setErrorFirstName({
        FirstName: true,
        Message: "First Name Cannot Be Empty !",
      });
      count += 1;
    }

    if (lastName.length === 0) {
      setErrorLastName({
        LastName: true,
        Message: "Last Name Cannot Be Empty !",
      });
      count += 1;
    }

    if (createPassword.length === 0) {
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Create Password Cannot Be Empty !",
      });
      count += 1;
    }

    if (confirmPassword.length === 0) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Confirm Password Cannot Be Empty !",
      });
      count += 1;
    }

    if (email.length === 0) {
      setErrorEmail({
        Email: true,
        Message: "Email Cannot Be Empty !",
      });
      count += 1;
    }

    return count;
  };

  const reValidate = () => {
    let count = 5;

    if (firstName.length > 0) {
      setErrorFirstName({});
      count -= 1;
    }

    if (lastName.length > 0) {
      setErrorLastName({});
      count -= 1;
    }

    if (createPassword.length > 0) {
      setErrorCreatePassword({});
      count -= 1;
    }

    if (confirmPassword.length > 0) {
      setErrorConfirmPassword({});
      count -= 1;
    }

    if (email.length > 0) {
      setErrorEmail({});
      count -= 1;
    }

    return count;
  };

  const checkPasswordStrength = () => {
    let count = 0;
    if (createPassword === confirmPassword) {
      if (createPassword.length >= 8 && createPassword.length <= 16) {
        setErrorCreatePassword({});
      }

      if (confirmPassword.length >= 8 && confirmPassword.length <= 16) {
        setErrorConfirmPassword({});
      }
    }

    if (createPassword !== confirmPassword) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Does Not Match !",
      });
      count += 1;
    }

    if (createPassword.length < 8) {
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Password Must Be 8 Character Long !",
      });
      count += 1;
    }

    if (confirmPassword.length > 16) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Cannnot Be More Than 16 Character Long !",
      });
      count += 1;
    }

    if (createPassword.length > 16) {
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Password Cannnot Be More Than 16 Character Long !",
      });
      count += 1;
    }

    return count;
  };

  const validateEmail = () => {
    let count = 0;
    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) && email.length !== 0) {
      setErrorEmail({
        Email: true,
        Message: "Invalid email !",
      });
      count += 1;
    }

    return count;
  };

  const validateName = () => {
    let count = 0;

    if (firstName.length <= 2 && firstName.length !== 0) {
      setErrorFirstName({
        FirstName: true,
        Message: "First Name Should Be More Than 2 Character Long !",
      });
      count += 1;
    }

    if (lastName.length <= 2 && lastName.length !== 0) {
      setErrorLastName({
        LastName: true,
        Message: "Last Name Should Be More Than 2 Character Long !",
      });
      count += 1;
    }

    // "/^[a-zA-Z]+$/" regular expression. This regular expression will match any string that contains only letters from the alphabet, without any other characters or whitespace.

    if (!/^[a-zA-Z]+$/.test(firstName) && firstName.length !== 0) {
      setErrorFirstName({
        FirstName: true,
        Message:
          "Invalid First Name format. Only alphabetic characters are allowed !",
      });
      count += 1;
    }

    if (!/^[a-zA-Z]+$/.test(lastName) && lastName.length !== 0) {
      setErrorLastName({
        LastName: true,
        Message:
          "Invalid Last Name format. Only alphabetic characters are allowed.",
      });
      count += 1;
    }

    // console.log(/^[a-zA-Z]+$/.test(firstname));
    return count;
  };

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  const sendDataToStateProvider = () => {
    // set stateProvider with signup form data
    dispatch({
      type: "SET_SIGNUP_DATA",
      firstname: firstName,
      lastname: lastName,
      Email: email,
      password: confirmPassword,
    });

    // load verify Email
    dispatch({
      type: "SET_VERIFY_PAGE",
      showVerifyPage: true,
    });
  };

  const handelCreateAccountSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    const checkEmpty = checkEmptyField();
    const checkEmail = validateEmail();
    const reCheck = reValidate();
    const checkName = validateName();
    const checkPass = checkPasswordStrength();

    // run only if all fields are correct
    const sumTotal = reCheck + checkPass + checkEmpty + checkEmail + checkName;
    // console.log(sumTotal);
    if (sumTotal === 0) {
      // send data to signUpContextProvider
      sendDataToStateProvider();
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto mx-auto mt-12 bg-white rounded-md md:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-black py-5">
          Create a New Account
        </h1>
        {/* Logo here */}

        {/* Signup Form */}
        <form className="mt-3" onSubmit={handelCreateAccountSubmit}>
          {/* First Name  Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              First Name
            </label>
            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                value={firstName}
                onChange={handelFirstNameChange}
                placeholder={"What is your First Name ?"}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
            {/* Error Message */}
            {errorfirstname.FirstName && (
              <ErrorMessageText props={errorfirstname.Message} />
            )}
          </div>
          {/* Last Name Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Last Name
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                value={lastName}
                onChange={handelLastNameChange}
                placeholder={"What is your Last Name ?"}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
            {/* Error Message */}
            {errorlastname.LastName && (
              <ErrorMessageText props={errorlastname.Message} />
            )}
          </div>
          {/* Email address */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email address
            </label>
            <input
              type="email"
              autoComplete="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"example@email.com"}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {/* Error Message */}
            {erroremail.Email && (
              <ErrorMessageText props={erroremail.Message} />
            )}
          </div>

          {/* Create password */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Create Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                autoComplete="true"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value.trim())}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
              <div className="text-2xl ml-[-2.5rem] mt-2.5">
                {open === false ? (
                  <VisibilityIcon onClick={toggle} />
                ) : (
                  <VisibilityOffIcon onClick={toggle} />
                )}
              </div>
            </div>
            {/* Error Message */}
            {errorcreatepassword.CreatePassword && (
              <ErrorMessageText props={errorcreatepassword.Message} />
            )}
          </div>

          {/* Confirm password */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                autoComplete="true"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
              <div className="text-2xl ml-[-2.5rem] mt-2.5">
                {open === false ? (
                  <VisibilityIcon onClick={toggle} />
                ) : (
                  <VisibilityOffIcon onClick={toggle} />
                )}
              </div>
            </div>
            {/* Error Message */}
            {errorconfirmpassword.ConfirmPassword && (
              <ErrorMessageText props={errorconfirmpassword.Message} />
            )}
          </div>

          <div className="mt-8">
            <button
              className="w-full px-5 py-2 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-5">
          <p className="text-center text-sm text-gray-800">
            Already a member ? &nbsp;
            <Link
              to="/"
              className="font-semibold leading-6 text-[#300] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
