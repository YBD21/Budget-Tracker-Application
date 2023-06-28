import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ViewBudget = () => {
  const dateRangeOptions = ["Latest", "Oldest"];

  const typeOptions = ["Income", "Expense"];

  const reoccurringOption = ["Monthly", "One time"];

  return (
    <>
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
      <div className="flex flex-row justify-between rounded-md mt-5 border-black border-2 border-dashed items-center text-center">
        {/*  */}
      </div>
    </>
  );
};

export default ViewBudget;
