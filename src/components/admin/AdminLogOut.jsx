import React, { useState } from "react";
import { store } from "../../store/store";

const AdminLogOut = () => {
  const USER_LOGOUT = "USER_LOGOUT";
  const logOut = () => {
    return {
      type: USER_LOGOUT,
    };
  };
  const handleLogOut = () => {
    store.dispatch(logOut());
  };

  return (
    <div className="relative inline-block">
      <div className=" border transition-transform transform hover:-translate-y-1 shadow-md p-1 border-custom-grey rounded-lg space-x-2 cursor-pointer">
        <div onClick={() => handleLogOut()} className="relative right-0">
          <span className="text-xs">LOG OUT</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogOut;
