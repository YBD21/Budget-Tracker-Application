import React from "react";
import { useStateValue } from "../context/StateProvider";

const Summary = () => {
  const [{ isViewPage }] = useStateValue();
  // change mb-6 to when form is DataEntry
  return (
    <div
      className={`w-full h-20 flex flex-row justify-between rounded-md mt-10 border-black border-2 items-center text-center ${
        isViewPage ? "mb-10" : "mb-6"
      }`}
    >
      {/* Total Income */}
      <div className="w-1/3 flex flex-col border-r-2 border-black">
        <p className="text-base font-semibold px-4 max-sm:text-sm">
          {" "}
          Total Income{" "}
        </p>
        <p className="text-lg text-blue-900 font-bold px-4 max-sm:text-base max-sm:py-0.5">
          Rs.{2400}
        </p>
      </div>
      {/* Total Expense */}
      <div className="w-1/3 flex flex-col border-r-2 border-black">
        <p className="text-base font-semibold px-4 max-sm:text-sm">
          {" "}
          Total Expense{" "}
        </p>
        <p className="text-lg text-red-800 font-bold px-4 max-sm:text-base max-sm:py-0.5">
          Rs.{2200}
        </p>
      </div>
      {/* Balance */}
      <div className="w-1/3 flex flex-col">
        <p className="text-base font-semibold px-4 max-sm:text-sm">
          {" "}
          Total Balance{" "}
        </p>
        <p className="text-lg text-green-700 font-bold px-4 max-sm:text-base max-sm:py-0.5">
          Rs.{200}
        </p>
      </div>
    </div>
  );
};

export default Summary;
