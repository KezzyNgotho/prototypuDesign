import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCurrentUserRole,
  setAccessToken,
  setLoggedInUserRef,
} from "../../features/user/userSlice";
import { requestToken, resendCode } from "../../api/security/security";
import jwt_decode from "jwt-decode";
import BasicModal from "./SignUpModal";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CircularProgress } from "@mui/material";
import VerificationModal from "./VerificationModal";

const LogIn = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accActiveErrorMessage, setAccActiveErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [user_code, setUserCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const openModal = () => setOpenSignUpModal(true);
  const closeModal = () => setOpenSignUpModal(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const { username, password } = values;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function handleHome(role) {
    if (role === "ORGANIZER") {
      navigate("/organizer");
    } else if (role === "PARTICIPANT") {
      navigate("/participant");
    } else if (role === "ADMIN") {
      navigate("/admin");
    } else {
      console.log({ error: "Invalid role" });
    }
  }
  const onCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    requestToken(username, password)
      .then((response) => {
        if (response.status === 200) {
          // decodes JWT to determine user role and reference
          setSuccessMessage("Login successful!");
          setValues({
            username: "",
            password: "",
          });
          setIsSubmitting(false);
          const decodedToken = jwt_decode(response.data.accessToken);

          dispatch(setAccessToken({ accessToken: response.data.accessToken }));
          dispatch(
            setLoggedInUserRef({ loggedInUserRef: decodedToken.user_ref })
          );
          dispatch(setCurrentUserRole({ currentUserRole: decodedToken.role }));
          handleHome(decodedToken.role);
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response && err.response.data) {
          if (err.response.data.error) {
            setErrorMessage(err.response.data.error);
          } else if (err.response.data.message) {
            setAccActiveErrorMessage(err.response.data.message);
            setUserCode(err.response.data.user_id);
          }
        }

        setIsSubmitting(false);
        setValues({
          username: "",
          password: "",
        });
      });
  };
  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };
  const handleResendCode = () => {
    setIsResending(true);
    setAccActiveErrorMessage("");
    resendCode(user_code)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message === "Verification code sent successfully") {
            setShowVerificationModal(true);
            setErrorMessage("");
          }
          setIsResending(false);
        }
      })
      .catch((error) => {
        console.error("Error resending verification code:", error);
        setIsResending(false);
      });
  };
  return (
    <div>
      <Navbar openModal={openModal} />
      <BasicModal openModal={openSignUpModal} handleClose={closeModal} />
      <div className="max-h-screen mt-10 flex items-center justify-center  bg-light-blue relative bottom-[20px]">
        <div className="bg-white p-8 rounded shadow-md w-100 border border-custom-blue">
          <h2 className="mb-6 font-semibold">
            Login to the UNITAR hackathon platform
          </h2>
          {successMessage && (
            <div className="mt-2 text-green-600 mb-3 text-sm">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-2 text-red-600 mb-3 text-sm">{errorMessage}</div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="block md:text-[16px] mb-2 text-[10px]">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-grey-600 rounded text-xs"
                placeholder="Pschirano"
                value={username}
                onChange={handleChange("username")}
              />
              <label className="block  mb-2 mt-2 text-[10px] md:text-[16px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-grey-600 rounded text-[10px] md:text-[16px]"
                  placeholder="******"
                  value={password}
                  onChange={handleChange("password")}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm focus:outline-none"
                >
                  {showPassword ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${handleHover()} w-full text-[13px] md:text-[16px] bg-custom-blue text-white py-2 mt-4 rounded hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue`}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                    Signing you in...
                  </>
                ) : (
                  "Sign me in"
                )}
              </button>
              <p className="mt-5 md:text-[16px] text-gray-600 text-[10px]">
                Don't have a unitar account?
                <Link
                  onClick={() => openModal()}
                  className="text-custom-blue ml-1 md:text-[16px] text-[10px]"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
          {accActiveErrorMessage !== "" && (
            <div className="mt-2 text-red-600 mb-3 text-sm">
              Credentials found, but you account is not activated. To activate
              your account, click "Resend Code" below and enter the code, then
              proceed to log in
            </div>
          )}
          <div className="flex justify-center">
            {accActiveErrorMessage !== "" && (
              <button
                onClick={() => handleResendCode()}
                disabled={isResending}
                className="text-custom-blue ml-2 md:text-sm text-[10px]"
              >
                {isResending ? (
                  <>
                    <CircularProgress sx={{ color: "primary" }} size={20} />{" "}
                    Resending...
                  </>
                ) : (
                  "Resend Code"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {showVerificationModal && (
        <VerificationModal
          onClose={onCloseVerificationModal}
          user_code={user_code}
        />
      )}
    </div>
  );
};

export default LogIn;
