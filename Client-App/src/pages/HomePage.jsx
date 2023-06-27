import SearchIcon from "@mui/icons-material/Search";
const HomePage = () => {
  return (
    <div className="flex flex-col justify-center">
      {/* Dashboard */}
      <div className="w-full h-14 flex flex-row justify-between rounded-md mx-auto mt-10 border-black border-2 border-dashed items-center sm:max-w-3xl">
        <p className="text-base px-4"> Dashboard</p>
        <p className="text-2xl px-4 font-semibold">Buget Tracker</p>
        <p className="text-lg px-4">Santosh Deuja</p>
      </div>
      {/* Display Total Summary */}
      <div className="w-full h-20 flex flex-row justify-between rounded-md mx-auto mt-10 border-black border-2 border-dashed items-center sm:max-w-3xl">
        {/* Total Income */}
        <div className="w-1/3 flex flex-col border-r-2 border-black  text-center">
          <p className="text-base font-semibold px-4"> Total Income </p>
          <p className="text-lg text-blue-900 font-bold px-4">NRS {2400}</p>
        </div>
        {/* Total Expense */}
        <div className="w-1/3 flex flex-col border-r-2 border-black text-center">
          <p className="text-base font-semibold px-4"> Total Expense </p>
          <p className="text-lg text-red-800 font-bold px-4">NRS {2200}</p>
        </div>
        {/* Balance */}
        <div className="w-1/3 flex flex-col text-center">
          <p className="text-base font-semibold px-4"> Balance </p>
          <p className="text-lg text-green-800 font-bold px-4">NRS {200}</p>
        </div>
      </div>
      {/* Search Bar Here */}
      <div className="relative flex items-center">
        <SearchIcon className="text-gray-800 " />
        <input
          type="text"
          placeholder="Search"
          className="w-full py-2 px-3 border border-gray-800 rounded-lg focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
    </div>
  );
};

export default HomePage;
