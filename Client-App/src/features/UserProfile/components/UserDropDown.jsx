import { useRef, useState, useEffect } from "react";
import { useStateValue } from "../../main/context/StateProvider";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Profile from "./Profile";
import axiosWithBaseURL from "../../../constants/axiosRoute";

const UserDropDown = ({ status, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(status);
  const [{ userData }, dispatch] = useStateValue();
  const dropdownRef = useRef(null);

  // Clear userData in ContexAPI
  const clearUserData = () => {
    dispatch({
      type: "SET_USER",
      userData: [],
    });
  };

  // request Backend to delete httpOnly Cookies
  const callBackendToLogOut = () => {
    axiosWithBaseURL
      .delete("/auth-system/user-data", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then(function (respond) {
        // console.log(respond.data);
        clearUserData();
      })
      .catch(function (error) {
        // console.log(error.message);
      });
  };

  const logOut = () => {
    // if userData has data then clear
    if (userData?.id) {
      callBackendToLogOut();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onStatusChange(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="relative inline-block text-left z-20 cursor-pointer max-sm:top-0 max-sm:right-20"
      ref={dropdownRef}
    >
      <div
        className={`absolute transform origin-top-left -translate-x-1/2 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-600">
          <Profile />
        </div>
        <ul className="divide-y divide-gray-600">
          <li
            className="flex items-center px-4 py-5 text-gray-700 hover:bg-gray-100 hover:text-black"
            onClick={logOut}
          >
            <ExitToAppIcon className="svg-icons ml-3 mr-10" />
            <span className="w-full font-medium text-lg  hover:text-[#d42109]">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropDown;
