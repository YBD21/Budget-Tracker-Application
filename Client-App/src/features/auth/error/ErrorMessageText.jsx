import React from "react";

const ErrorMessageText = (value) => {
  return (
    <div className="flex flex-row my-3 ml-2 border-red-900 rounded justify-start text-center">
      <span className="text-red-600 text-l">
        {value.props}
        {/* {console.log(value)} */}
      </span>
    </div>
  );
};

export default ErrorMessageText;
