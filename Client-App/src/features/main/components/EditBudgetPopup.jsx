import { useState, useRef, useEffect } from "react";
import jwt_decode from "jwt-decode";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ErrorMainMessage from "../error/ErrorMainMessage";
import SuccessMessageBox from "../success/SuccessMessageBox";
import ErrorMainMessageBox from "../error/ErrorMainMessageBox";
import axiosWithBaseURL from "../../../constants/axiosRoute";
import { useStateValue } from "../context/StateProvider";

const EditBudgetPopup = ({ onChild, editData, fetchFromChild }) => {
  const [{ isViewPage }, dispatch] = useStateValue();
  // data , id
  const prevEditData = editData.data;
  const prevAmount = prevEditData.Amount;
  const prevDate = prevEditData.Date;
  const prevReoccure = prevEditData.Reoccure;
  const prevTitle = prevEditData.Title;
  const prevType = prevEditData.Type;

  const inputDateRef = useRef(null);

  const [title, setTitle] = useState(prevTitle);
  const [amount, setAmount] = useState(prevAmount);
  const [date, setDate] = useState(prevDate);
  const [type, setType] = useState(prevType);
  const [reoccure, setReoccure] = useState(prevReoccure);

  const [success, setSuccess] = useState(null);

  const [errorTitle, setErrorTitle] = useState(null);
  const [errorAmount, setErrorAmount] = useState(null);
  const [errorDate, setErrorDate] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [errorReoccure, setErrorReoccure] = useState(null);
  const [errorRespond, setErrorRespond] = useState(null);

  const typeOptions = ["Income", "Expense"];
  const reoccurringOption = ["Monthly", "One Time"];

  const handleDateFocus = () => {
    inputDateRef.current.showPicker();
  };

  const handleOnChangeTitle = (e) => {
    // .replace(/[^a-zA-Z ]/g, "")
    const inputValue = e.target.value;
    const formattedString = inputValue
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
    setTitle(formattedString);
  };

  const close = () => {
    onChild(false);
  };

  const fetchEntryDataOnParent = () => {
    fetchFromChild(true);
  };

  const checkInputFields = () => {
    const isValidTitle = checkTitle();
    const isValidAmount = checkAmount();
    const isValidDate = checkDate();
    if (isValidTitle && isValidAmount && isValidDate) {
      return true;
    }
    return false;
  };

  const checkTitle = () => {
    const maxLength = 30; // Maximum allwoed Length for Title
    const minLength = 3; // Minimum allwoed Length for Title
    let message = ""; // Initialize error message to an empty string
    let validStatus = true; // Set validStatus to true by default

    // Check if the city is empty
    if (title.trim().length === 0) {
      message = "Title is required !"; // Set the error message
      validStatus = false; // Set validStatus to false
    } else if (title.length > maxLength) {
      // Check if the title is too long
      message = `Title must be up to ${maxLength} characters !`; // Set the error message
      validStatus = false; // Set validStatus to false
    } else if (title.trim().length < minLength) {
      // Check if the city is too short
      message = `Title must be more than ${minLength} characters !`; // Set the error message
      validStatus = false; // Set validStatus to false
    }

    // Update the Title with the valid and message values
    setErrorTitle({ message });

    // Return the validStatus flag
    return validStatus;
  };

  const checkAmount = () => {
    const maxLength = 10; // Maximum allwoed Length for Amount
    let message = ""; // Initialize error message to an empty string
    let validStatus = true; // Set validStatus to true by default

    // Check if the Amount is empty
    if (amount.length === 0) {
      message = "Amount is required !"; // Set the error message
      validStatus = false; // Set validStatus to false
    } else if (amount.length > maxLength) {
      // Check if the  Amount is too long
      message = `Amount must be up to ${maxLength} characters !`; // Set the error message
      validStatus = false; // Set validStatus to false
    } else if (typeof amount !== "number") {
      const numValue = parseInt(amount);
      if (!isNaN(numValue)) {
        setAmount(numValue);
      } else {
        message = `Amount must be a Number !`; // Set the error message
        validStatus = false; // Set validStatus to false
      }
    }

    // Update the Title with the valid and message values
    setErrorAmount({ message });

    // Return the validStatus flag
    return validStatus;
  };

  const checkDate = () => {
    let message = ""; // Initialize error message to an empty string
    let validStatus = true; // Set validStatus to true by default
    const dateValue = new Date(date);
    // Check if the Date is empty
    if (date.trim().length === 0) {
      message = "Date is required !"; // Set the error message
      validStatus = false; // Set validStatus to false
    } else if (isNaN(dateValue)) {
      message = `Invalid Date !`; // Set the error message
      validStatus = false; // Set validStatus to false
    }

    // Update the Date with the valid and message values
    setErrorDate({ message });

    // Return the validStatus flag
    return validStatus;
  };

  const checkSelectFields = () => {
    const isValidType = checkSelectType();
    const isValidReoccure = checkSelectReoccure();
    if (isValidType && isValidReoccure) {
      return true;
    }
    return false;
  };

  const checkSelectType = () => {
    let message = ""; // Initialize error message to an empty string
    let validStatus = true; // Set validStatus to true by default

    // Check if the type is empty
    if (type.trim().length === 0) {
      message = "Please Select Type !"; // Set the error message
      validStatus = false; // Set valid to false
    }

    // Update the Type with the valid and message values
    setErrorType({ message });

    // Return the validStatus flag
    return validStatus;
  };

  const checkSelectReoccure = () => {
    let message = ""; // Initialize error message to an empty string
    let validStatus = true; // Set validStatus to true by default

    // Check if the type is empty
    if (reoccure.trim().length === 0) {
      message = "Please Select Reoccurring !"; // Set the error message
      validStatus = false; // Set valid to false
    }

    // Update the Reoccure with the valid and message values
    setErrorReoccure({ message });

    // Return the validStatus flag
    return validStatus;
  };

  const isValueChanged = () => {
    let changeCount = 0;
    if (prevTitle !== title) {
      changeCount++;
    }

    if (prevAmount !== amount.toString()) {
      changeCount++;
    }

    if (prevReoccure !== reoccure) {
      changeCount++;
    }

    if (prevType !== type) {
      changeCount++;
    }

    return changeCount >= 1 ? true : false;
  };

  const requestToEditBudget = () => {
    // once edit close popUp
    console.log("Request To Backend !");
    close();
  };

  const handelSaveChanges = () => {
    // validate input field
    const isInputFieldValid = checkInputFields();
    const isSelectFieldValid = checkSelectFields();
    const isChange = isValueChanged();
    console.log(isChange);
    if (isInputFieldValid && isSelectFieldValid & isChange) {
      // disable button
      requestToEditBudget();
    }
  };

  const fetchBudgetSummary = () => {
    axiosWithBaseURL
      .get("/budget-system/get-budget-summary", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then(function (respond) {
        // console.log(respond.data);

        const data = jwt_decode(respond.data);
        // console.log(data);
        if (data?.id) {
          dispatch({
            type: "SET_USER",
            userData: data,
          });
        }
        fetchEntryDataOnParent();
        close();
      })
      .catch(function (error) {
        // console.log(error.message);
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto bg-white rounded-lg max-w-2xl max-sm:max-w-xs sm:p-5 min-h-[20vh]">
        {/* Edit Single Budget */}
        <div className="mt-0">
          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Title
            </label>
            {/* Error Message Title */}
            {errorTitle?.message && (
              <ErrorMainMessage message={errorTitle?.message} />
            )}
            <input
              type="text"
              value={title}
              placeholder="Enter Title"
              onChange={handleOnChangeTitle}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none 
          focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* Amount Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Amount
            </label>
            {/* Error Message Amount */}
            {errorAmount?.message && (
              <ErrorMainMessage message={errorAmount?.message} />
            )}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none 
          focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* Date Field */}
          <div className="pb-0">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Date
            </label>
            {/* Error Message Date */}
            {errorDate?.message && (
              <ErrorMainMessage message={errorDate?.message} />
            )}
            <input
              type="date"
              value={date}
              ref={inputDateRef}
              onChange={(e) => setDate(e.target.value)}
              onClick={handleDateFocus}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none 
          focus:ring focus:ring-opacity-40 cursor-pointer"
            />
          </div>

          <div className="w-full flex flex-col">
            {/* Type -- Select Box */}
            <div className="py-2">
              <label className="block text-sm font-semibold text-gray-800 py-2">
                Type
              </label>
              {/* Error Message Type */}
              {errorType?.message && (
                <ErrorMainMessage message={errorType?.message} />
              )}
              <div className="relative mt-2">
                <select
                  className="w-full px-1 py-2.5 text-black bg-white rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-sm"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {typeOptions.map((element, index) => (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
                <ExpandMoreIcon className="absolute right-6 top-1/2 -translate-y-1/2 svg-icons cursor-pointer pointer-events-none text-black sm:scale-150" />
              </div>
            </div>

            {/* Reoccurring -- Select Box*/}

            <div className="py-2">
              <label className="block text-sm font-semibold text-gray-800 py-2">
                Reoccurring
              </label>
              {/* Error Message Reoccurring */}
              {errorReoccure?.message && (
                <ErrorMainMessage message={errorReoccure?.message} />
              )}
              <div className="relative mt-2">
                <select
                  className="w-full px-1 py-2.5 text-black bg-white rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-sm"
                  onChange={(e) => setReoccure(e.target.value)}
                  value={reoccure}
                >
                  <option value="" disabled>
                    Select Reoccurring
                  </option>
                  {reoccurringOption.map((element, index) => (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
                <ExpandMoreIcon className="absolute right-6 top-1/2 -translate-y-1/2 svg-icons cursor-pointer pointer-events-none text-black sm:scale-150" />
              </div>
            </div>
          </div>
          {/* Success Message */}
          {success && <SuccessMessageBox props={success} status={true} />}

          {/* Display Error Message  */}
          {errorRespond && (
            <ErrorMainMessageBox Error_message={errorRespond} status={true} />
          )}

          {/* Submit Button */}
          <div className="flex justify-between mt-10 gap-2 max-sm:mb-4">
            <button
              className="px-10 py-2 tracking-wide
            text-white bg-black font-semibold rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
              onClick={handelSaveChanges}
            >
              Submit
            </button>
            <button
              className="px-10 py-2 tracking-wide text-white bg-neutral-700 font-semibold rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBudgetPopup;
