import Dashboard from "../features/main/components/Dashboard";
import Summary from "../features/main/components/Summary";
import ViewBudget from "../features/main/components/ViewBudget";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center mx-auto max-sm:max-w-sm sm:max-w-2xl max-sm:mx-2.5">
      <Dashboard />
      <Summary />

      <ViewBudget />

      {/* Add Button */}
      <div className="flex justify-center mt-10">
        <button
          className="px-16 py-2 tracking-wide
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
