import Dashboard from "../features/main/components/Dashboard";
import Summary from "../features/main/components/Summary";
import ViewBudget from "../features/main/components/ViewBudget";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center mx-auto max-sm:max-w-sm sm:max-w-2xl max-sm:mx-2.5">
      <Dashboard />
      <Summary />

      <ViewBudget />
    </div>
  );
};

export default HomePage;
