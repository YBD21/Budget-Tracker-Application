import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto mx-auto mt-24 bg-white rounded-md  md:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-black">Login</h1>
        <form className="mt-3">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Email address
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type="password"
                autoComplete="current-password"
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="relative h-5 w-5 shrink-0 appearance-none rounded-md border-2 border-gray-600 outline-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-900 hover:ring hover:ring-gray-300"
              />

              <label className="text-sm font-semibold">Remember me</label>
            </div>

            <div>
              <Link
                to="/ForgetPassword"
                className="text-sm text-[#300] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <button
              className="w-full px-5 py-2 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-5">
          <p className="text-center text-sm text-gray-800">
            Not a member ? &nbsp;
            <Link
              to="/SignUp"
              className="font-semibold leading-6 text-[#300] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
