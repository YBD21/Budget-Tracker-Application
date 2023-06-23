import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const PageNotFound = () => {
  const navigate = useNavigate();

  // handle click event on the back button
  const redirect = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center h-[100vh] p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8">
            But don't worry, you can find plenty of other things on your way
            back.
          </p>
          <div className="mt-5">
            <button
              onClick={redirect}
              className="w-full px-5 py-2.5 tracking-wide transition
            text-white bg-black font-medium rounded-lg text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
           "
            >
              <KeyboardBackspaceIcon className="svg-icons" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
