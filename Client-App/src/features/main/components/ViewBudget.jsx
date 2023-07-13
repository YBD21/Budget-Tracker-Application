import { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import axiosWithBaseURL from "../../../constants/axiosRoute";

import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

import DeleteIcon from "@mui/icons-material/Delete";
import PopupPortal from "../../../constants/PopupPortal";
import DeleteBudgetPopup from "./DeleteBudgetPopup";

const ViewBudget = () => {
  const [{ entryList }, dispatch] = useStateValue();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const dateRangeOptions = ["Latest", "Oldest"];
  const typeOptions = ["Type", "Income", "Expense"];
  const reoccurringOptions = ["Reoccure", "Monthly", "One Time"];

  const [orderByDate, setOrderByDate] = useState(dateRangeOptions[0]);
  const [type, setType] = useState(typeOptions[0]);
  const [reoccure, setReoccure] = useState(reoccurringOptions[0]);

  const [search, setSearch] = useState("");

  const [isDelete, setDelete] = useState(false);
  const [currentDeleteData, setCurrentDeleteData] = useState({});

  const itemsPerPage = 5;

  const setEntryDataList = (data) => {
    dispatch({
      type: "SET_ENTRY_LIST",
      entryList: data,
    });
  };

  const fetchEntryData = () => {
    axiosWithBaseURL
      .get("/budget-system/get-entry-data", {
        params: {
          orderByDate,
        },
        withCredentials: true,
      })
      .then((response) => {
        setEntryDataList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch entry data when orderByDate changes
    fetchEntryData();
    setPage(1);
  }, [orderByDate]);

  useEffect(() => {
    setPage(1);
  }, [type]);

  useEffect(() => {
    setPage(1);
  }, [reoccure]);

  const countTotalPage = (dataCount) => {
    let count = Math.ceil(dataCount / itemsPerPage);
    setTotalPage(count);
  };

  const handleAdd = () => {
    dispatch({
      type: "SET_VIEW_PAGE",
      isDeletePage: false,
    });
  };

  const handleNextClick = () => {
    if (totalPage > page) {
      setPage(page + 1);
    }
    // else fetchMoreEntryData
  };

  const handlePreviousClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const tableRows = [];

  const filteredEntries = entryList.filter((entry) => {
    if (type !== typeOptions[0] && entry.data.Type !== type) {
      return false; // Filter based on type
    }

    if (
      reoccure !== reoccurringOptions[0] &&
      entry.data.Reoccure !== reoccure
    ) {
      return false; // Filter based on reoccurrence
    }

    if (search && entry?.data?.Title) {
      const title = entry.data.Title.toLowerCase();
      const searchValueLower = search.toLowerCase();
      const regex = new RegExp(searchValueLower, "g");
      if (!regex.test(title)) {
        return false; // Filter based on Title not matching the regex search
      }
    }

    return true; // Entry passes the selected filters
  });

  useEffect(() => {
    countTotalPage(filteredEntries.length);
  }, [filteredEntries]);

  const handleDelete = (viewData) => {
    setDelete(true);
    setCurrentDeleteData(viewData);
  };

  const handleDeleteFromChild = (data) => {
    setDelete(data);
  };

  for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage; i++) {
    const entry = filteredEntries[i];

    const textColorOfType =
      entry?.data?.Type === typeOptions[2] ? "text-red-600" : "text-green-600";

    const textColorOfReoccure =
      entry?.data?.Reoccure === reoccurringOptions[2]
        ? "text-lime-800"
        : "text-amber-800";

    const amount = +entry?.data?.Amount;

    if (entry !== undefined) {
      tableRows.push(
        <tr key={i}>
          <td className="border px-4 py-2.5">{entry?.data?.Date}</td>
          <td className="border px-4 py-2.5">{entry?.data?.Title}</td>
          <td className={`border px-4 py-2.5 font-semibold ${textColorOfType}`}>
            {entry?.data?.Type}
          </td>
          <td
            className={`border px-4 py-2.5 font-semibold ${textColorOfReoccure}`}
          >
            {entry?.data?.Reoccure}
          </td>
          <td className={`border px-4 py-2.5 font-semibold`}>
            Rs.
            {amount.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </td>
          <td className={`border px-4 py-3.5 font-semibold`}>
            {/* Delete */}
            <button
              className="py-2 px-2.5 bg-red-900 rounded-lg group relative"
              onClick={() => handleDelete(entry)}
            >
              <DeleteIcon className="scale-125 text-white pointer-events-none" />
            </button>
          </td>
        </tr>
      );
    }
  }

  return (
    <>
      {/* Search Bar */}
      <div className="relative flex flex-1 items-center mb-10">
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-3 py-2 w-full border border-gray-800 rounded-lg focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none scale-110" />
      </div>

      {/* Select DropDown Group */}
      <div className="flex flex-row justify-between gap-6 max-sm:gap-2">
        {/* Select Dropdown Date Range */}
        <div className="relative inline-block w-1/3">
          <select
            className="w-full px-1 py-1.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black
           bg-white focus:border-black focus:ring-black max-sm:text-xs"
            value={orderByDate}
            onChange={(e) => {
              setOrderByDate(e.target.value);
            }}
          >
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
          <select
            className="w-full px-1 py-1.5 text-black bg-white rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-xs"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
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
            value={reoccure}
            onChange={(e) => {
              setReoccure(e.target.value);
            }}
          >
            {reoccurringOptions.map((element, index) => (
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
                  Title
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Type
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Reoccure
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Amount
                </th>
                <th className="px-4 py-3 text-gray-800 border-2 border-gray-200 max-sm:px-8">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="text-center">{tableRows}</tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-row justify-between mt-5 mx-4">
          {/* Previous Button */}
          <button
            className="px-10 py-1.5 tracking-wide border-2 border-black
            text-black bg-white font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:ring-4 active:ring-gray-400 active:ring-opacity-50"
            onClick={handlePreviousClick}
          >
            <WestIcon className="scale-150" />
          </button>

          {/* Next Button */}
          <button
            className="px-10 py-1.5 tracking-wide border-2 border-black
            text-black bg-white font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:ring-4 active:ring-gray-400 active:ring-opacity-50"
            onClick={handleNextClick}
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

      {/* View Single Budget Popup */}
      {isDelete ? (
        <PopupPortal>
          <DeleteBudgetPopup
            onChild={handleDeleteFromChild}
            deteteData={currentDeleteData}
          />
        </PopupPortal>
      ) : (
        false
      )}

      {/* Delete Single Budget Popup*/}
    </>
  );
};

export default ViewBudget;
