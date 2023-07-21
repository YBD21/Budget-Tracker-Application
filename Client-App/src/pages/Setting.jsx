import React from "react";
import EditProfile from "../features/main/components/userprofile/EditProfile";
import UserInfo from "../features/main/components/userprofile/UserInfo";

const Setting = () => {
  return (
    <div className="flex max-md:flex-col justify-around pt-10">
      <EditProfile />
      <UserInfo />
    </div>
  );
};

export default Setting;
