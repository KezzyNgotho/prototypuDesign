import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 200,
  // height: 100,
  bgcolor: "background.paper",
  border: "2px solid #089BD9",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const customStyles = {
  fontFamily: "Lexend, sans-serif",
  // fontSize: "24px",
};

export default function BasicModal({ openModal, handleClose }) {
  const navigate = useNavigate();

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=" md:w-[500px] md:h-[250px]">
          <Box className=" flex items-center justify-center">
            <Box>
              <Typography
                variant="p"
                component="p"
                sx={customStyles}
                className="md:text-[24px] text-[14px] text-center "
              >
                Join as participant or an organizer
              </Typography>
              <Box className="flex space-x-4 md:mt-[60px] mt-5">
                <button
                  onClick={() => navigate("/part-signup")}
                  className="md:w-[150px] w-[100px] bg-custom-blue text-white py-2 rounded md:text-[16px] text-[10px] transition-transform transform hover:-translate-y-1 md:flex-1  "
                >
                  I am a Participant
                </button>
                <button
                  onClick={() => navigate("/org-signup")}
                  className="md:w-[150px] w-[100px] md:text-[16px] text-[10px] btn-org  py-2 rounded transition-transform transform hover:-translate-y-1 md:flex-1 "
                >
                  I am an Organizer
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
