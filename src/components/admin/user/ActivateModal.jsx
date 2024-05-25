import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { activateUserAccount } from "../../../api/admins/admins";
import SuccessfulActivationModal from "./SuccessfulActivation";
import VerifiedIcon from "@mui/icons-material/Verified";
import { CircularProgress } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ActivateModal({ openModal, closeModal, user_id }) {
  const [isActivateModalOpen, setActivateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminActivateUser = () => {
    setIsSubmitting(true);
    activateUserAccount(user_id).then((res) => {
      if (res.status === 200) {
        closeModal();
        setActivateModalOpen(true);
        setTimeout(() => {
          setActivateModalOpen(false);
          window.location.reload();
        }, 2000);
        setIsSubmitting(false);
      } else {
        console.log(res.data);
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
      {isActivateModalOpen && (
        <SuccessfulActivationModal
          CloseModal={() => setActivateModalOpen(false)}
          openModal={isActivateModalOpen}
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
                    <h1 className="font-bold text-[20px]  font-Lexend-Exa  text-center">
                      Activate User Account
                    </h1>
                    <div className="flex justify-center ">
                      <VerifiedIcon
                        fontSize="large"
                        style={{
                          color: "#06BD0E",
                          width: "80px",
                          height: "80px",
                        }}
                      />
                    </div>
                    <p className=" text-center text-gray-700 text-sm mt-2 ">
                      Do you really want to activate this account?
                    </p>
                    <div className="flex flex-row gap-5 mt-10">
                      <button
                        onClick={() => adminActivateUser()}
                        disabled={isSubmitting}
                        className={`${handleHover()} bg-[#06BD0E] text-white font-bold w-[150px] py-2 px-2 rounded-md `}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress
                              sx={{ color: "white" }}
                              size={20}
                            />{" "}
                            Activating...
                          </>
                        ) : (
                          "Yes, Activate"
                        )}
                      </button>
                      <button
                        onClick={closeModal}
                        className="border  border-black rounded-md w-[150px] py-2 px-2  "
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
