import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto mx-auto mt-24 bg-white rounded-md md:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-black py-5">
          Create a New Account
        </h1>
        {/* Signup Form */}
        <form className="mt-3">
          {/* First Name  Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              First Name
            </label>
            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
          </div>
          {/* Last Name Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Last Name
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
          </div>
          {/* Email address */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Email address
            </label>
            <input
              type="email"
              autoComplete="email"
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-5">
            <button
              className="w-full px-5 py-2 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-5">
          <p className="text-center text-sm text-gray-800">
            Already a member ? &nbsp;
            <Link
              to="/login"
              className="font-semibold leading-6 text-[#300] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
