import NavBar from "../features/main/components/NavBar";
import DataEntry from "../features/main/components/DataEntry";
import Summary from "../features/main/components/Summary";
import ViewBudget from "../features/main/components/ViewBudget";
import { useStateValue } from "../features/main/context/StateProvider";

const HomePage = () => {
  const [{ isViewPage }] = useStateValue();
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center max-sm:max-w-sm max-sm:mx-3 sm:max-w-3xl sm:mx-auto">
        <Summary />
        {isViewPage ? <ViewBudget /> : <DataEntry />}
      </div>
    </>
  );
};

export default HomePage;
