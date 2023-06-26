import { useState, useEffect } from "react";

const Loading = () => {
  const [ellipsisPosition, setEllipsisPosition] = useState(1);

  useEffect(() => {
    // Move the ellipsis forward every 500ms
    const intervalId = setInterval(() => {
      setEllipsisPosition((prevPosition) => {
        if (prevPosition === 3) {
          return 1;
        } else {
          return prevPosition + 1;
        }
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 z-50">
      <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <svg
          fill="none"
          className="w-10 h-10 animate-spin mt-4"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <p className=" text-2xl font-bold text-black mt-4 animate-pulse">
          Loading <span>{".".repeat(ellipsisPosition)}</span>
        </p>
      </div>
    </div>
  );
};

export default Loading;
