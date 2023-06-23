import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import ErrorMessageBoxSignin from "../error/ErrorMessageBoxSignin";

const SignIn = () => {
  const Email = "E-Mail";
  const Password = "Password";

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const [error, setError] = useState(null); // capture error with this state

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    setError(null); // reset previous error_message
    // console.log(email);
    // console.log(password);
    setError("Network Error");
  };

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
    // console.log(open);
  };

  // remember me function here
  const setCookies = () => {
    if (email.length != 0 && password.length != 0 && isChecked === true) {
      console.log("saved cookies");
      // set cookies expire date on 7th day.
      Cookies.set(Email, email, { expires: 7 });
      Cookies.set(Password, password, { expires: 7 });
    }
    setIsChecked(!isChecked);
  };

  // get saved email and password from cookie

  const getCookies = () => {
    const emailFromCookie = Cookies.get(Email);
    const passwordFromCookie = Cookies.get(Password);

    // console.log(emailFromCookie);
    // console.log(passwordFromCookie);

    return { emailFromCookie, passwordFromCookie };
  };

  useEffect(() => {
    // load saved email and password from cookie
    try {
      const outPutCookies = getCookies();
      const userEmail = outPutCookies.emailFromCookie;
      const userPassword = outPutCookies.passwordFromCookie;

      setEmail(userEmail);
      setPassword(userPassword);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto mx-auto mt-24 rounded-md md:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-black">Login</h1>
        {/* login submit */}
        <form className="mt-3" onSubmit={handleLoginSubmit}>
          <div className="pb-5">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="pb-3">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {/* hide/unhide password */}
              <div className="text-2xl ml-[-2.5rem] mt-2.5">
                {open === false ? (
                  <VisibilityIcon onClick={toggle} />
                ) : (
                  <VisibilityOffIcon onClick={toggle} />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                onClick={setCookies}
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

          {/* Display Error Message  */}
          {error && (
            <ErrorMessageBoxSignin Error_message={error} status={true} />
          )}

          <div className="pt-5">
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
