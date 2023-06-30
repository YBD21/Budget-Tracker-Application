import { useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DataEntry = () => {
  const inputDateRef = useRef(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [reoccure, setReoccure] = useState("");

  const typeOptions = ["Income", "Expense"];
  const reoccurringOption = ["Monthly", "One time"];

  const handleDateFocus = () => {
    inputDateRef.current.showPicker();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
  };
  return (
    <form className="mt-0" onSubmit={handleFormSubmit}>
      {/* Name Field */}
      <div className="pb-5">
        <label className="block text-sm font-semibold text-gray-800 py-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      {/* Amount Field */}
      <div className="pb-5">
        <label className="block text-sm font-semibold text-gray-800 py-2">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      {/* Date Field */}
      <div className="pb-5">
        <label className="block text-sm font-semibold text-gray-800 py-2">
          Date
        </label>
        <input
          type="date"
          value={date}
          ref={inputDateRef}
          onChange={(e) => setDate(e.target.value)}
          onClick={handleDateFocus}
          className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 cursor-pointer"
        />
      </div>

      <div className="w-full flex gap-6 mt-5">
        {/* Type -- Select Box */}
        <div className="relative w-1/2">
          <select
            className="w-full px-1 py-1.5 text-black bg-white rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-xs"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="" disabled>
              Type
            </option>
            {typeOptions.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <ExpandMoreIcon className="absolute right-3 top-1/2 -translate-y-1/2 scale-125 cursor-pointer pointer-events-none text-black max-sm:right-1 max-sm:top-4 max-sm:scale-95" />
        </div>
        {/* Reoccurring -- Select Box*/}
        <div className="relative w-1/2">
          <select
            className="w-full px-1 py-1.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black
          bg-white focus:border-black focus:ring-black max-sm:text-xs"
            value={reoccure}
            onChange={(e) => setReoccure(e.target.value)}
          >
            <option value="" disabled>
              Reoccurring
            </option>
            {reoccurringOption.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <ExpandMoreIcon className="absolute right-3 top-1/2 -translate-y-1/2 scale-125 cursor-pointer pointer-events-none text-black  max-sm:right-1 max-sm:top-4 max-sm:scale-95" />
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center mt-10">
        <button
          className="px-14 py-2 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DataEntry;
