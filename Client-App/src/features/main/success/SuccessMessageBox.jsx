import React, { useEffect, useState } from "react";

const SuccessMessageBox = (message) => {
  const [isClicked, setIsClicked] = useState(message.status);
  const [text, setText] = useState({});
  useEffect(() => {
    switch (message.props) {
      case "Success":
        return setText({
          First: "Great !",
          Second: "Budget entry successfully added.",
        });
      case "ResetPassword":
        return setText({
          First: "Great !",
          Second: "Your Password Has Been Reset Sucessfully.",
        });
    }
  }, [isClicked]);

  const checkClick = () => {
    setIsClicked(!isClicked);
    // console.log("Someting happend ?");
  };

  return (
    <>
      {isClicked && (
        <div
          className="flex flex-col justify-center bg-green-100 border border-green-900 text-green-800 px-4 py-3 rounded relative mt-5 max-sm:text-center"
          role="alert"
        >
          {/* Display Error Message */}
          <div className="m-auto max-sm:mx-16">
            <strong className="font-bold mr-2">{text.First}</strong>
            <span className="sm:inline text-center">{text.Second}</span>
          </div>
          <span className="absolute top-0 right-0 max-sm:top-1/2 max-sm:-translate-y-1/2 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-green-700"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={checkClick}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
};

export default SuccessMessageBox;
