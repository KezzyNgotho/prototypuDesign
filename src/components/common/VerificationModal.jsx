import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUserAccount } from "../../api/security/security";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { styled } from "@mui/material";
import { Close } from "@mui/icons-material";

const ResponsiveMarkEmailReadIcon = styled(MarkEmailReadIcon)({
  width: "200px",
  height: "120px",
  color: "#089BD9",
  marginBottom: "5px",
  "@media (max-width: 600px)": {
    width: "100px",
    height: "60px",
  },
});
const VerificationModal = ({ user_code, onClose }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));

  const verifyUser = () => {
    const joinedVerificationCode = verificationCode.join("");
    verifyUserAccount(user_code, joinedVerificationCode)
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage(
            "Account successfully verified. Proceed to log in."
          );
          setTimeout(() => {
            onClose();
            navigate("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyUser();
  };
  const handleVerificationCodeChange = (e, index) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = e.target.value;
    setVerificationCode(newVerificationCode);
    if (e.target.value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="overlay ">
      <div className="modal md:w-[500px] w-[350px] h-[300px] md:h-[400px] md:mb-0 mb-[200px]">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className="flex justify-center">
          <ResponsiveMarkEmailReadIcon />
        </div>
        <p className="font-semibold md:text-sm text-[13px]">
          An email with a verification code has been sent to your email address.
        </p>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mt-4 md:text-[15px] text-[10px]">
            {successMessage}
          </p>
        )}
        {!successMessage && (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
            <label htmlFor="verificationCode" className="text-xs mr-[10px]">
              Enter the code below to activate your account
            </label>
            <div className="verification-code-input flex justify-center mt-3">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  className="verification-code-char"
                  type="text"
                  maxLength="1"
                  id={`verificationCode${index}`}
                  name="verificationCode"
                  value={verificationCode[index] || ""}
                  onChange={(e) => handleVerificationCodeChange(e, index)}
                  ref={(inputRef) => (inputRefs.current[index] = inputRef)}
                  required
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-custom-blue rounded text-white w-[100px] mt-5 py-2 "
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;
