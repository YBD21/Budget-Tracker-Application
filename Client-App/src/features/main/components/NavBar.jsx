import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import UserDropDown from "./userprofile/UserDropDown";

const NavBar = () => {
  const location = useLocation();
  const [isUserclicked, setIsUserClicked] = useState(false);
  const [isHome, setIsHome] = useState(true);

  const showUserMenu = () => {
    setIsUserClicked(!isUserclicked);
  };

  const handelStatusFromChild = (status) => {
    setIsUserClicked(status);
  };

  useEffect(() => {
    setIsHome(location.pathname === "/Home");
  }, [location]);

  return (
    <header className="sticky top-0 z-30 bg-gray-50 flex flex-row w-full drop-shadow-lg h-16">
      {/* Logo */}

      <div className="flex w-1/2 mx-2">
        <div className="flex items-center">
          <strong className="mx-5"> Budget Tracker</strong>
        </div>
      </div>

      <ul className="flex justify-between w-full max-w-screen-lg mx-auto lg:max-w-full">
        <li
          className={`relative m-auto ${
            isHome ? `border-b-4 border-black` : false
          } group`}
        >
          <Link to="/Home" className="block px-2 py-4">
            <HomeIcon className="navbar-svg-icons cursor-pointer transition duration-300 transform" />
          </Link>
          <div className="absolute top-5 left-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md">
            <span className="text-white font-semibold"> Home </span>
          </div>
        </li>

        <li
          className="relative m-auto group cursor-pointer"
          onClick={showUserMenu}
        >
          <div className="block px-2 py-4">
            <AccountCircleIcon className="navbar-svg-icons transition duration-300 transform pointer-events-none" />
          </div>
          <div className="absolute top-0 left-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md max-sm:left-0">
            <span className="text-white font-semibold "> User Profile </span>
          </div>
          {/* UserDropDown */}
          {isUserclicked && (
            <UserDropDown
              status={isUserclicked}
              onStatusChange={handelStatusFromChild}
              className="translate-y-0"
            />
          )}
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
