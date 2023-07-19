import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { ForgotPasswordPagesOption } from "../../../constants/pageOptions";

const ResetPassword = ({ Email }) => {
  const [open, setOpen] = useState(false);
  const [createpassword, setCreatePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  const resetPassword = (e) => {
    e.preventDefault(); // prevent page from refresh
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto mx-auto mt-32 rounded-md sm:max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-black">
          Reset Password
        </h2>

        {/* Resetpassword Form*/}
        <form className="mt-8">
          {/* Password Input Box */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Create Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={createpassword}
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
          {/* Error Message */}

          {/* Confirm Password Input Box */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
          {/* Error Message */}

          <div className="mt-8">
            <button
              className="w-full px-5 py-2.5 tracking-wide
        text-white bg-black font-medium rounded-lg t text-center mr-3 mb-2
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
        "
              onClick={resetPassword}
            >
              Reset Password
            </button>
          </div>
        </form>

        <div className="mt-5">
          <p className="text-center text-sm text-gray-800">
            Return to Login ? &nbsp;
            <Link
              to="/Login"
              replace={true}
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

export default ResetPassword;
