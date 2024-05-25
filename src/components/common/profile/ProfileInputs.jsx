import React, { useState } from "react";
//import "react-phone-number-input/style.css";
//import PhoneInput from "react-phone-number-input";

import { MuiTelInput } from "mui-tel-input";

const ProfileInputs = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col text-gray-400">
      <form className="flex flex-col">
        <label className="mt-5 mb-2 text-sm">Username</label>
        <input
          type="text"
          className="w-[300px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
          placeholder="Amisi"
        />
        <label className="mt-5 mb-2 text-sm" name="email">
          Email
        </label>
        <input
          type="email"
          className="w-[600px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
          placeholder="amisicaves@gmail.com"
        />
        <label className="mt-5 mb-2 text-sm" name="phoneNumber">
          Phone number
        </label>
        <MuiTelInput
          sx={{ width: "300px" }}
          value={value}
          onChange={handleChange}
          defaultCountry="NG"
        />
        <div className="flex flex-row gap-5">
          <div className="flex flex-col">
            <label className="mt-5 mb-2 text-sm" name="address1">
              Lives in
            </label>
            <input
              type="text"
              className="w-[300px] px-3 py-2 border border-gray-400 rounded text-xs
              focus:outline-none focus:border-custom-blue"
              placeholder="Lagos,Nigeria"
            />
          </div>
          <div className="flex flex-col">
            <label className="mt-5 mb-2 text-sm" name="streetAddress">
              Street address
            </label>
            <input
              type="text"
              className="w-[280px] px-3 py-2 border border-gray-400 rounded text-xs
              focus:outline-none focus:border-custom-blue"
              placeholder="Yoruba 45"
            />
          </div>
        </div>
        <label className="mt-5 mb-2 text-sm" name="password">
          Password
        </label>
        <input
          type="password"
          className="w-[600px] px-3 py-2 border border-gray-400 rounded text-xs
          focus:outline-none focus:border-custom-blue"
          placeholder="**********"
        />
        <button
          type="submit"
          className="text-white font-semibold bg-custom-blue rounded-md p-2 w-[150px] mt-5"
        >
          Update profile
        </button>
      </form>
    </div>
  );
};

export default ProfileInputs;
