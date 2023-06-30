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
      <div className="flex flex-col justify-center mx-auto max-sm:max-w-sm sm:max-w-2xl max-sm:mx-2.5">
        <Summary />
        {isViewPage ? <ViewBudget /> : <DataEntry />}
      </div>
    </>
  );
};

export default HomePage;
