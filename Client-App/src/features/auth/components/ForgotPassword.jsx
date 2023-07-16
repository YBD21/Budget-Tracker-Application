import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-full p-6 mb-auto mx-auto mt-32 rounded-md sm:max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">
          Account Lookup
        </h2>

        <p className="text-lg font-semibold text-center text-black mt-3">
          Enter your email address to find your account.
        </p>

        <form className="mt-4">
          <div className="pb-4">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Search */}

          <div className="min-w-max mt-3">
            <button
              className="w-full px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-3 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
            >
              <SearchIcon className="scale-150 mr-4" />
              Search
            </button>
          </div>
        </form>

        <div className="mt-5">
          <p className="text-center text-sm text-gray-800">
            New here? &nbsp;
            <Link
              to="/Login"
              className="font-semibold leading-6 text-[#300] hover:underline"
            >
              Return to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
