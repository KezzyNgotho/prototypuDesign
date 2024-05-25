import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ActivateModal from "./ActivateModal";

const ActivateUser = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen(true);
  };
  return (
    <div className="right-side min-h-screen bg-pattern">
      <div className="ml-[300px]">
        <h1 className="text-gray-600 text-[24px] font-bold mt-4">
          Activate User Account
        </h1>
        <div className="flex flex-row gap-[100px]">
          <div className="mt-3 flex flex-col items-center justify-center bg-[#f0f6ff] w-[400px] rounded-md shadow-lg p-4">
            <Avatar
              alt="Profile pic"
              src="/assets/image2.png"
              sx={{
                width: "200px",
                height: "200px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={handleClick}
              className="bg-[#06BD0E] text-white p-2 rounded-md  w-[200px] mt-4"
            >
              Activate Account
            </button>
          </div>
          <div className="mt-10">
            <h1 className="mt-3 mb-2 text-gray-600 font-semibold">
              Profile Details
            </h1>
            <div className="flex flex-col bg-[#f0f6ff] w-[400px] h-[200px] rounded-md shadow-lg p-4">
              <div className="flex mb-3">
                <strong className="text-custom-blue w-[150px]">username</strong>
                <p>Peninah</p>
              </div>
              <div className="flex mb-3">
                <strong className="text-custom-blue w-[150px]">email</strong>
                <p>peninah@gmail.com</p>
              </div>
              <div className="flex">
                <strong className="text-custom-blue w-[150px]">Role</strong>
                <p>Participant</p>
              </div>
              <div className="flex mt-3">
                <strong className="text-custom-blue w-[150px]">Status</strong>
                <p>Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivateModal
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ActivateUser;
