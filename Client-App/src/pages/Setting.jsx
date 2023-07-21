import React from "react";
import EditProfile from "../features/main/components/userprofile/setting/editprofile/EditProfile";
import UserInfo from "../features/main/components/userprofile/setting/userinfo/UserInfo";

const Setting = () => {
  return (
    <div className="flex max-md:flex-col justify-around pt-10">
      <EditProfile />
      <UserInfo />
    </div>
  );
};

export default Setting;
