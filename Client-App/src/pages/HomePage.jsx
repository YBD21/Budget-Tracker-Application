import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HomePage = () => {
  const dateRangeOptions = ["Latest", "Oldest"];

  const typeOptions = ["Income", "Expense"];

  const reoccurringOption = ["Monthly", "One time"];

  return (
    <div className="flex flex-col justify-center mx-auto max-sm:max-w-sm sm:max-w-2xl max-sm:mx-2.5">
      {/* Dashboard */}
      <div className="h-14 flex flex-row justify-between rounded-md mt-10 border-black border-2 border-dashed items-center text-center">
        <p className="text-base px-4"> Dashboard</p>
        <p className="text-2xl max-sm:text-lg px-4 font-semibold">
          Budget Tracker
        </p>
        <p className="text-lg max-sm:text-base px-4">Santosh Deuja</p>
      </div>
      {/* Display Total Summary */}
      <div className="w-full h-20 flex flex-row justify-between rounded-md my-10 border-black border-2 border-dashed items-center text-center">
        {/* Total Income */}
        <div className="w-1/3 flex flex-col border-r-2 border-black">
          <p className="text-base font-semibold px-4 max-sm:text-sm">
            {" "}
            Total Income{" "}
          </p>
          <p className="text-lg text-blue-900 font-bold px-4 max-sm:text-base">
            NRS {2400}
          </p>
        </div>
        {/* Total Expense */}
        <div className="w-1/3 flex flex-col border-r-2 border-black">
          <p className="text-base font-semibold px-4 max-sm:text-sm">
            {" "}
            Total Expense{" "}
          </p>
          <p className="text-lg text-red-800 font-bold px-4 max-sm:text-base">
            NRS {2200}
          </p>
        </div>
        {/* Balance */}
        <div className="w-1/3 flex flex-col">
          <p className="text-base font-semibold px-4 max-sm:text-sm">
            {" "}
            Balance{" "}
          </p>
          <p className="text-lg text-green-700 font-bold px-4 max-sm:text-base">
            NRS {200}
          </p>
        </div>
      </div>
      {/* Search Bar Here */}
      <div className="relative flex flex-1 items-center mb-10">
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-3 py-2 w-full border border-gray-800 rounded-lg focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
      </div>

      {/* Select DropDown Group */}
      <div className="flex flex-row justify-betwee gap-6 max-sm:gap-2">
        {/* Select Dropdown Date Range */}
        <div className="relative inline-block w-1/3">
          <select className="w-full px-1 py-1.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-xs">
            <option value="" disabled>
              Date Range
            </option>
            {dateRangeOptions.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <ExpandMoreIcon className="absolute right-3 top-1/2 -translate-y-1/2  scale-125 cursor-pointer pointer-events-none text-black max-sm:right-2 max-sm:top-4 max-sm:scale-95" />
        </div>
        {/* Select Dropdown Type */}
        <div className="relative inline-block w-1/3">
          <select className="w-full px-1 py-1.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-xs">
            <option value="" disabled>
              Type
            </option>
            {typeOptions.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <ExpandMoreIcon className="absolute right-3 top-1/2 -translate-y-1/2 scale-125 cursor-pointer pointer-events-none text-black max-sm:right-2 max-sm:top-4 max-sm:scale-95" />
        </div>
        {/* Select Dropdown Reoccurring */}
        <div className="relative inline-block w-1/3">
          <select className="w-full px-1 py-1.5 text-black rounded-lg text-base font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black max-sm:text-xs">
            <option value="" disabled>
              Reoccurring
            </option>
            {reoccurringOption.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <ExpandMoreIcon className="absolute right-3 top-1/2 -translate-y-1/2 scale-125 cursor-pointer pointer-events-none text-black max-sm:right-2 max-sm:top-4 max-sm:scale-95" />
        </div>
      </div>
      {/* Table Details here */}

      <div className="flex justify-center mt-10">
        <button
          className="px-10 py-2 tracking-wide
            text-white bg-green-700 font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 active:ring-4 active:ring-green-400 active:ring-opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default HomePage;
