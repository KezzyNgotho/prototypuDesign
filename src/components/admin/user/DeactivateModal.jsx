import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { deactivateUserAccount } from "../../../api/admins/admins";
import SuccessfulDeactivationModal from "./SuccessfulDeactivationModal";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { CircularProgress } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 280,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function DeactivateModal({ openModal, closeModal, user_id }) {
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminDeactivateUser = () => {
    setIsSubmitting(true);
    deactivateUserAccount(user_id).then((res) => {
      if (res.status === 200) {
        closeModal();
        setSuccessModalOpen(true);
        setTimeout(() => {
          setSuccessModalOpen(false);
          window.location.reload();
        }, 2000);
        setIsSubmitting(false);
      } else {
        alert("Error deactivating user");
        setIsSubmitting(false);
      }
    });
  };
  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  return (
    <>
      {isSuccessModalOpen && (
        <SuccessfulDeactivationModal
          CloseModal={() => setSuccessModalOpen(false)}
          openModal={isSuccessModalOpen}
        />
      )}
      <Box>
        <Modal
          open={openModal}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box className=" flex items-center justify-center">
              <Box>
                <Box className="flex space-x-4 ">
                  <div>
                    <h1 className="font-bold text-[20px] font-Lexend-Exa  text-center">
                      Deactivate Account
                    </h1>
                    <div className="flex justify-center ">
                      <NoAccountsIcon
                        fontSize="large"
                        style={{
                          color: "#D40C0C",
                          width: "80px",
                          height: "80px",
                        }}
                      />
                    </div>

                    <p className=" text-center text-gray-700 text-sm ">
                      Do you really want to deactivate this account?
                    </p>

                    <div className="flex flex-row gap-5 mt-6">
                      <button
                        onClick={() => adminDeactivateUser()}
                        disabled={isSubmitting}
                        className={`${handleHover()} bg-[#D40C0C] text-white font-bold w-[150px] py-2 px-2 rounded-md `}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress
                              sx={{ color: "white" }}
                              size={20}
                            />{" "}
                            Deactivating...
                          </>
                        ) : (
                          "Yes, Deactivate"
                        )}
                      </button>
                      <button
                        onClick={closeModal}
                        className="border  border-black rounded-md w-[150px] py-2 px-2 "
                      >
                        No, Cancel
                      </button>
                    </div>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
