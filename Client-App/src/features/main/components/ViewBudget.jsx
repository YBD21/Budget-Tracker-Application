import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useStateValue } from "../context/StateProvider";

const ViewBudget = () => {
  const [{ isViewPage }, dispatch] = useStateValue();
  const [page, setPage] = useState(1);

  const dateRangeOptions = ["Latest", "Oldest"];

  const typeOptions = ["Income", "Expense"];

  const reoccurringOption = ["Monthly", "One time"];

  const itemsPerPage = 5;

  const handleClick = (event) => {
    setPage(Number(event.target.id));
  };

  const handleAdd = () => {
    dispatch({
      type: "SET_VIEW_PAGE",
      isViewPage: false,
    });
  };

  const tableRows = [];

  for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage; i++) {
    tableRows.push(
      <tr key={i}>
        <td className="border px-4 py-2.5">2023/06/28</td>
        <td className="border px-4 py-2.5">Santosh Deuja</td>
        <td className="border px-4 py-2.5 text-green-700 font-bold">Income</td>
        <td className="border px-4 py-2 font-bold">Monthly</td>
      </tr>
    );
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(45 / itemsPerPage); i++) {
    pageNumbers.push(
      <li key={i}>
        <button
          id={i}
          onClick={handleClick}
          className={`${
            i === page ? "bg-gray-400 text-white" : "bg-white text-black"
          } hover:bg-gray-500 hover:text-white py-2 px-4 border-2
           border-black rounded ml-2`}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <>
      {/* Search Bar */}
      <div className="relative flex flex-1 items-center mb-10">
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-3 py-2 w-full border border-gray-800 rounded-lg focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
      </div>

      {/* Select DropDown Group */}
      <div className="flex flex-row justify-between gap-6 max-sm:gap-2">
        {/* Select Dropdown Date Range */}
        <div className="relative inline-block w-1/3">
          <select
            className="w-full px-1 py-1.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black
           bg-white focus:border-black focus:ring-black max-sm:text-xs"
          >
            <option value="" disabled>
              Date Range
            </option>
            {dateRangeOptions.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <ExpandMoreIcon className="absolute right-3 top-1/2 -translate-y-1/2  scale-125 cursor-pointer pointer-events-none text-black max-sm:right-1 max-sm:top-4 max-sm:scale-95" />
        </div>
        {/* Select Dropdown Type */}
        <div className="relative inline-block w-1/3">
          <select className="w-full px-1 py-1.5 text-black bg-white rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-xs">
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
        {/* Select Dropdown Reoccurring */}
        <div className="relative inline-block w-1/3">
          <select
            className={`w-full px-1 py-1.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black
          bg-white focus:border-black focus:ring-black max-sm:text-xs`}
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
      {/* Table Details here */}
      <div className="border-grey-400 border rounded-md mt-6">
        <div className="flex justify-between  rounded-md items-center text-center overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-10">
                  Date
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Name
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Type
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Reoccuring
                </th>
              </tr>
            </thead>

            <tbody className="text-center">{tableRows}</tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-row justify-between mt-5 mx-6">
          <button
            className="px-10 py-2 tracking-wide border-2 border-black
            text-black bg-white font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:ring-4 active:ring-gray-400 active:ring-opacity-50"
          >
            <WestIcon className="scale-150" />
          </button>

          <button
            className="px-10 py-2 tracking-wide border-2 border-black
            text-black bg-white font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:ring-4 active:ring-gray-400 active:ring-opacity-50"
          >
            <EastIcon className="scale-150" />
          </button>
        </div>
      </div>
      {/* Add Button */}
      <div className="flex justify-center mt-10 max-sm:mb-2">
        <button
          className="px-14 py-2 tracking-wide
            text-white bg-black font-semibold rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default ViewBudget;
