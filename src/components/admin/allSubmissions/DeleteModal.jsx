import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function DeleteHackModal({
  openModal,
  closeModal,
  deleteSub,
  errorMessage,
}) {
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
                  <h1 className="font-bold text-[20px]  font-Lexend-Exa  text-center">
                    Delete Hackathon
                  </h1>
                  {errorMessage && (
                    <p className="text-red-500 text-xs">{{ errorMessage }}</p>
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
                  <p className=" text-center text-gray-700 text-sm ">
                    Do you really want to delete this Submission? Deleting this
                    subission will erase all it's data
                  </p>

                  <div className="flex flex-row gap-5 mt-5 justify-center">
                    <button
                      onClick={() => deleteSub()}
                      className="bg-[#D40C0C] text-white font-bold w-[150px] py-2 px-2 rounded-md "
                    >
                      Yes, Delete
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
