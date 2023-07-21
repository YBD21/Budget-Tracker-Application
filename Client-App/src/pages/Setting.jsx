import React from "react";
import NavBar from "../features/main/components/NavBar";
import EditProfile from "../features/main/components/userprofile/setting/editprofile/EditProfile";
import UserInfo from "../features/main/components/userprofile/setting/userinfo/UserInfo";

const Setting = () => {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-2 gap-8 px-4 pb-5 mx-auto items-center max-lg:grid-cols-1  max-lg:max-w-2xl">
        <EditProfile />
        <UserInfo />
      </div>
    </>
  );
};

export default Setting;
