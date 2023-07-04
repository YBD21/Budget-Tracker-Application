import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";

const Summary = () => {
  const [{ isViewPage }] = useStateValue();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  // call backend to get income,expense,balance

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
        <p className="text-lg text-green-900 font-bold px-4 max-sm:text-base max-sm:py-0.5">
          Rs. {totalIncome}
        </p>
      </div>
      {/* Total Expense */}
      <div className="w-1/3 flex flex-col border-r-2 border-black">
        <p className="text-base font-semibold px-4 max-sm:text-sm">
          {" "}
          Total Expense{" "}
        </p>
        <p className="text-lg text-red-800 font-bold px-4 max-sm:text-base max-sm:py-0.5">
          Rs. {totalExpense}
        </p>
      </div>
      {/* Balance */}
      <div className="w-1/3 flex flex-col">
        <p className="text-base font-semibold px-4 max-sm:text-sm">
          {" "}
          Total Balance{" "}
        </p>
        <p className="text-lg text-blue-500 font-bold px-4 max-sm:text-base max-sm:py-0.5">
          Rs. {totalBalance}
        </p>
      </div>
    </div>
  );
};

export default Summary;
