import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,

  borderRadius: "10px",
};

export default function MessageSentModal({ openModal, closeModal }) {
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
                  <div className="flex justify-center">
                    <CheckCircleIcon
                      fontSize="large"
                      style={{
                        color: "#089BD9",
                        width: "80px",
                        height: "80px",
                      }}
                    />
                  </div>
                  <p className="items-center text-gray-700 mt-5 ">
                    Message Sent Successfully
                  </p>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
