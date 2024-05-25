import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { deleteUserAccount } from "../../../api/admins/admins";
import DeleteSuccessModal from "../hackathons/DeleteSuccessModal";
import DeleteIcon from "@mui/icons-material/Delete";
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

export default function DeleteModal({ openModal, closeModal, user_id }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminDeleteUser = () => {
    setIsSubmitting(true);
    deleteUserAccount(user_id).then((res) => {
      if (res.status === 204) {
        closeModal();
        setDeleteModalOpen(true);
        setTimeout(() => {
          setDeleteModalOpen(false);
          window.location.reload();
        }, 2000);
        setIsSubmitting(false);
      } else {
        alert("Error deleting user");
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
      {isDeleteModalOpen && (
        <DeleteSuccessModal
          CloseModal={() => setDeleteModalOpen(false)}
          openModal={isDeleteModalOpen}
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
                      Delete User Account
                    </h1>
                    <div className="flex justify-center ">
                      <DeleteIcon
                        fontSize="large"
                        style={{
                          color: "#D40C0C",
                          width: "80px",
                          height: "80px",
                        }}
                      />
                    </div>

                    <p className="text-sm items-center text-gray-700  ">
                      Do you really want to delete this user account? Deleting
                      this user account will erase all their data
                    </p>
                    <div className="flex flex-row gap-5 mt-6 justify-center">
                      <button
                        onClick={() => adminDeleteUser()}
                        disabled={isSubmitting}
                        className={`${handleHover()} bg-[#D40C0C] text-white font-bold w-[150px] py-2 px-2 rounded-md`}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress
                              sx={{ color: "white" }}
                              size={20}
                            />{" "}
                            Deleting...
                          </>
                        ) : (
                          "Yes, Delete"
                        )}
                      </button>
                      <button
                        onClick={closeModal}
                        className="py-2 border border-black rounded-md w-[150px]"
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
