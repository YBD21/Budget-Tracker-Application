import { useState, useEffect } from "react";
import { useStateValue } from "../../../../context/StateProvider";

import jwt_decode from "jwt-decode";

import axiosWithBaseURL from "../../../../../../constants/axiosRoute";
import ErrorMessageText from "../../../../../auth/error/ErrorMessageText";

const UserInfo = () => {
  const [{ userData }, dispatch] = useStateValue();
  const [isEdit, setIsEdit] = useState(false);

  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);

  const [errorFirstName, setErrorFirstName] = useState({});
  const [errorLastName, setErrorLastName] = useState({});

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

  const edit = () => {
    setIsEdit(true);
  };

  const cancel = () => {
    setIsEdit(false);
    setFirstName(userData?.firstName);
    setLastName(userData?.lastName);
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

  const saveChanges = () => {
    const isEmpty = checkEmptyField();
    const isName = validateName();
    // run only if all fields are correct
    const sumTotal = isEmpty + isName;
    if (sumTotal === 0) {
      if (
        firstName === userData?.firstName &&
        lastName === userData?.lastName
      ) {
        setIsEdit(false);
      } else {
        // send request to backend here
        sendChangesToBackend();
      }
    }
  };

  const sendChangesToBackend = () => {
    axiosWithBaseURL
      .patch(
        "/user-management/edit-user-name",
        {
          FirstName: firstName,
          LastName: lastName,
        },
        {
          withCredentials: true,
        }
      )
      .then((respond) => {
        // console.log(respond.data);
        if (respond.data !== false) {
          const data = jwt_decode(respond.data);
          console.log(data);
          if (data?.id) {
            dispatch({
              type: "SET_USER",
              userData: data,
            });
          }
        } else {
          // error message here
        }
        setIsEdit(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setErrorFirstName({});
  }, [firstName]);

  useEffect(() => {
    setErrorLastName({});
  }, [lastName]);

  return (
    <div className="col-span-1 w-3/4 max-lg:w-full">
      <div className="flex flex-col">
        {/* First Name */}
        <div className=" my-4 mx-16 max-lg:mx-24 max-sm:mx-5">
          <label className="block text-sm font-semibold text-gray-800">
            First Name
          </label>

          <div className="flex flex-col">
            <input
              type="text"
              value={!isEdit ? userData?.firstName : firstName}
              onChange={handelFirstNameChange}
              className={`block w-full px-4 py-2 mt-4 text-black-700 border-2 ${
                !isEdit
                  ? "cursor-not-allowed border-gray-600 bg-gray-100 rounded-md"
                  : "border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              }`}
              disabled={!isEdit}
            />
          </div>
          {/* Error Message */}
          <div className="max-h-5">
            {errorFirstName.FirstName && (
              <ErrorMessageText props={errorFirstName.Message} />
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="my-4 mx-16 max-lg:mx-24 max-sm:mx-5">
          <label className="block text-sm font-semibold text-gray-800">
            Last Name
          </label>

          <div className="flex flex-col">
            <input
              type="text"
              value={!isEdit ? userData?.lastName : lastName}
              onChange={handelLastNameChange}
              className={`block w-full px-4 py-2 mt-4 text-black-700 border-2
            focus:ring-opacity-40 ${
              !isEdit
                ? "cursor-not-allowed border-gray-600 bg-gray-100 rounded-md"
                : "border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            }`}
              disabled={!isEdit}
            />
            {/* Error Message */}
            <div className="max-h-5">
              {errorLastName.LastName && (
                <ErrorMessageText props={errorLastName.Message} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  Action */}
      <div className="w-full flex mt-5">
        <div className="w-full mx-16 max-lg:mx-24 max-sm:mx-5">
          {!isEdit ? (
            <button
              className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
              onClick={edit}
            >
              <span className="text-white font-semibold">Edit</span>
            </button>
          ) : (
            <div className="flex justify-between gap-10 max-sm:flex-col max-sm:gap-6">
              <button
                className="w-full px-5 py-2.5 tracking-wide
              text-white bg-black rounded-lg text-center mr-2 mb-2
              focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={saveChanges}
              >
                <span className="text-white font-semibold text-center">
                  Save Changes
                </span>
              </button>
              <button
                className="w-full px-5 py-2.5 tracking-wide
              text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2
              focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={cancel}
              >
                <span className="text-white font-semibold">Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
