import { useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useStateValue } from "../context/StateProvider";

const DataEntry = () => {
  const [{ isViewPage }, dispatch] = useStateValue();
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

  const cancel = () => {
    dispatch({
      type: "SET_VIEW_PAGE",
      isViewPage: true,
    });
  };

  return (
    <div className="mt-0">
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

      <div className="w-full flex flex-col gap-8 mt-5">
        {/* Type -- Select Box */}
        <div className="relative">
          <select
            className="w-full px-1 py-2.5 text-black bg-white rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-sm"
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
          <ExpandMoreIcon className="absolute right-6 top-1/4 -translate-y-1/2 svg-icons cursor-pointer pointer-events-none text-black max-sm:scale-150" />
        </div>

        {/* Reoccurring -- Select Box*/}
        <div className="relative">
          <select
            className="w-full px-1 py-2.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black
          bg-white focus:border-black focus:ring-black max-sm:text-sm"
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
          <ExpandMoreIcon className="absolute right-6 top-1/4 -translate-y-1/2 svg-icons cursor-pointer pointer-events-none text-black max-sm:top-1/2 max-sm:scale-150" />
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-between mt-10 gap-2">
        <button
          className="px-10 py-2 tracking-wide
            text-white bg-black font-semibold rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
        >
          Submit
        </button>
        <button
          className="px-10 py-2 tracking-wide border-2 border-black
            text-black bg-white font-semibold rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DataEntry;
