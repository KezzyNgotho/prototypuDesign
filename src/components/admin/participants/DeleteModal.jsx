import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
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

export default function DeleteModal({
  openModal,
  closeModal,
  id,
  deleteAction,
  errorMessage,
  isSubmitting,
}) {
  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  return (
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
                    Delete Participant
                  </h1>
                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
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

                  <p className=" items-center text-gray-700  text-sm">
                    Do you really want to delete this participant? Deleting this
                    participant will erase all their data
                  </p>

                  <div className="flex flex-row gap-5 mt-6 justify-center">
                    <button
                      onClick={() => deleteAction(id)}
                      disabled={isSubmitting}
                      className={`${handleHover()} bg-[#D40C0C] text-white font-bold w-[150px] py-2 px-2 rounded-md`}
                    >
                      {isSubmitting ? (
                        <>
                          <CircularProgress sx={{ color: "white" }} size={20} />{" "}
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
  );
}
