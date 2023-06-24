import { useState } from "react";
import { Link } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [open, setOpen] = useState(false);

  const handelCreateAccountSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(createPassword);
    console.log(confirmPassword);
  };

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
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
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800">
              First Name
            </label>
            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
          </div>
          {/* Last Name Input Box */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800">
              Last Name
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
          </div>
          {/* Email address */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800">
              Email address
            </label>
            <input
              type="email"
              autoComplete="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Create password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800">
              Create Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                autoComplete="true"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
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
          </div>

          {/* Confirm password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                autoComplete="true"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              to="/login"
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
