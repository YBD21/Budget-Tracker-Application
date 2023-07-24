import { useEffect, useState } from "react";
import axiosWithBaseURL from "../../../../../../constants/axiosRoute";

import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import ErrorMessageBoxSignin from "../../../../../auth/error/ErrorMessageBoxSignin";
import ErrorMessageText from "../../../../../auth/error/ErrorMessageText";

const ChangePassword = ({ onChild }) => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorCurrentPassword, setErrorCurrentPassword] = useState({});
  const [errorNewPassword, setErrorNewPassword] = useState({});
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({});
  const [error, setError] = useState(null); // capture error with this state

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  const saveChanges = (e) => {
    e.preventDefault(); // prevent from page to refresh
    setError(null);
    const sumTotal = validatePassword();
    if (sumTotal === 0) {
      callBackendToChangePassword();
      // console.log("Call Backend !");
    }
  };

  const callBackendToChangePassword = () => {
    axiosWithBaseURL
      .patch(
        "/auth-system/change-password",
        {
          currentPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((respond) => {
        // console.log(respond.data);
        if (respond.data === false) {
          return (
            // console.log(false),
            setError("Incorrect Password")
          );
        } else {
          close();
        }
      })
      .catch((error) => {
        // console.log(error.message);
        if (error.response && error.response.statusText) {
          setError(error.response.statusText);
        } else {
          setError(error.message);
        }
      });
  };

  const close = () => {
    onChild(false);
  };

  const validatePassword = () => {
    let count = 0;
    if (newPassword === confirmPassword) {
      if (newPassword.length >= 8 && newPassword.length <= 16) {
        if (newPassword === currentPassword) {
          setErrorNewPassword({
            newPassword: true,
            Message: "New password cannot be the same as the current password",
          });
          count += 1;
        } else {
          setErrorNewPassword({});
        }
      }

      if (confirmPassword.length >= 8 && confirmPassword.length <= 16) {
        setErrorConfirmPassword({});
      }
    } else {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Does Not Match !",
      });
      count += 1;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      setErrorNewPassword({
        newPassword: true,
        Message: "Password must be between 8 and 16 characters long!",
      });
      count += 1;
    }

    if (currentPassword.length < 8 || currentPassword.length > 16) {
      setErrorCurrentPassword({
        CurrentPassword: true,
        Message: "Password must be between 8 and 16 characters long!",
      });
      count += 1;
    }

    if (confirmPassword.length > 16) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password cannot be more than 16 characters long!",
      });
      count += 1;
    }

    return count;
  };

  useEffect(() => {
    setErrorCurrentPassword({});
  }, [currentPassword]);

  useEffect(() => {
    setErrorNewPassword({});
  }, [newPassword]);

  useEffect(() => {
    setErrorConfirmPassword({});
  }, [confirmPassword]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto mt-10 bg-white rounded-lg transform max-w-2xl max-sm:max-w-xs sm:p-5">
        <div className="w-full flex flex-col px-12 max-sm:px-0 py-3 rounded-lg items-center">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Change Password
          </h3>
          {/* Start Change Password */}
          <form className="w-full">
            {/* Current Password Input Box */}
            <div className="py-3 w-full">
              <label className="block text-sm font-semibold text-gray-800">
                Current Password
              </label>

              <div className="flex flex-row cursor-pointer">
                <input
                  type={open === false ? "password" : "text"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="true"
                  required={true}
                  className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
            focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
            {errorCurrentPassword.CurrentPassword && (
              <ErrorMessageText props={errorCurrentPassword.Message} />
            )}

            {/*New Password Input Box */}
            <div className="py-3 w-full">
              <label className="block text-sm font-semibold text-gray-800">
                New Password
              </label>

              <div className="flex flex-row cursor-pointer">
                <input
                  type={open === false ? "password" : "text"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="true"
                  required={true}
                  className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
            focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
            {errorNewPassword.newPassword && (
              <ErrorMessageText props={errorNewPassword.Message} />
            )}

            {/*Confirm New Password Input Box */}
            <div className="py-3 w-full">
              <label className="block text-sm font-semibold text-gray-800">
                Confirm New Password
              </label>

              <div className="flex flex-row cursor-pointer">
                <input
                  type={open === false ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="true"
                  required={true}
                  className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
            focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
            {errorConfirmPassword.ConfirmPassword && (
              <ErrorMessageText props={errorConfirmPassword.Message} />
            )}

            {/* Error Message Box */}
            {error && (
              <ErrorMessageBoxSignin Error_message={error} status={true} />
            )}
          </form>
        </div>

        <div className="flex justify-between mt-2 px-12">
          <button
            className="w-full px-5 py-2.5 tracking-wide
       text-white bg-black font-medium rounded-lg text-center 
       focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
            onClick={saveChanges}
          >
            <span className="text-white font-semibold">Save Changes</span>
          </button>
        </div>
        {/*End Change Password */}

        {/* close */}
        <button
          className="absolute top-0 right-0 m-5 max-sm:m-4"
          onClick={close}
        >
          <CancelIcon className="svg-icons max-sm:scale-150 text-neutral-600" />
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
