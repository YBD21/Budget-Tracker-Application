import { useState } from "react";
import { useStateValue } from "../../../../context/StateProvider";

import userProfileDefaultImage from "../../../../../../assets/user-profile-icon.webp";

import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import PopupPortal from "../../../../../../constants/PopupPortal";

const EditProfile = () => {
  const [{ userData }] = useStateValue();
  const name = userData?.firstName + " " + userData?.lastName;
  const [isChange, setIsChange] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const changePassword = () => {
    setIsChange(true);
  };

  const handleChildChangePasswordPopup = (data) => {
    setIsChange(data);
  };

  const deleteAccount = () => {
    setIsDelete(true);
  };

  const handleChildDeleteAccountPopup = (data) => {
    setIsDelete(data);
  };

  return (
    <div className="col-span-1 py-5 ml-2 place-items-center w-full">
      <div className="w-full flex justify-center py-3">
        <img
          src={userProfileDefaultImage}
          alt="Profile"
          className=" w-1/4 rounded-full border-2 border-black"
        />
      </div>
      <p className="py-2 font-bold text-2xl text-center">{name}</p>

      <div className="flex mt-3 justify-center max-lg:mx-24 max-sm:mx-5">
        <button
          className="w-1/3 max-lg:w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-center 
            mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
          onClick={changePassword}
        >
          Change Password
        </button>
      </div>
      {/* ChangePassword Popup*/}
      {/* activate Change Password portal */}
      {isChange ? (
        <PopupPortal>
          <ChangePassword onChild={handleChildChangePasswordPopup} />
        </PopupPortal>
      ) : (
        false
      )}

      <div className="flex mt-10 justify-center max-lg:mx-24 max-sm:mx-5">
        <button
          className="w-1/3 max-lg:w-full px-5 py-2.5 tracking-wide
            text-white bg-red-900 font-medium rounded-lg text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50 active:ring-4 active:ring-red-900 active:ring-opacity-50 relative overflow-hidden"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </div>
      {/* Delete Account Popup*/}
      {isDelete ? (
        <PopupPortal>
          <DeleteAccount onChild={handleChildDeleteAccountPopup} />
        </PopupPortal>
      ) : (
        false
      )}
    </div>
  );
};

export default EditProfile;
