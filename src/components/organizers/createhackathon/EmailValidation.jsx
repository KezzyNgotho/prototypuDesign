import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestValidationCode } from "../../../api/hackathons/hackathons";
import { selectCurrentHackathonDetail } from "../../../features/hackathon/hackathonSlice";
import { selectLoggedInUserRef } from "../../../features/user/userSlice";
import { ChevronRight } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
const EmailValidation = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const navigate = useNavigate();
  const hackathonDetails = useSelector(selectCurrentHackathonDetail);
  const user_ref = useSelector(selectLoggedInUserRef);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    requestValidationCode(user_ref, hackathonDetails.id, email)
      .then((res) => {
        if (res.status === 200) {
          navigate("/organizer/hackathons/create/validate");
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        setErrorMessage(err.response.data.error);
      });
  };

  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-blue-500";
    }
  };
  return (
    <div className="bg-white min-h-screen right-side">
      <div className="ml-80">
        <h1 className=" text-gray-600 font-bold  text-[24px] mb-2 mt-10">
          Email Validation
        </h1>{" "}
        <p className="text-xs text-gray-500 flex flex-row mb-6">
          <span className="mt-[2px]">Hackathons</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Create a hackathon</span>
          <ChevronRight sx={{ width: "20px", height: "20px" }} />
          <span className="mt-[2px]">Email validation</span>
        </p>
        {errorMessage && (
          <div className="text-red-500 text-xs">{errorMessage}</div>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-xs mt-5 mb-3">Enter email</label>
          <input
            type="text"
            placeholder="Enter email"
            className="border border-gray-400 rounded-md px-3 py-2 w-[300px]
            focus:outline-none focus:border-custom-blue"
            value={email}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`${handleHover()} py-2 px-2 bg-custom-blue rounded-md text-white  w-[150px] mt-10`}
          >
            {isSubmitting ? (
              <>
                <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                Submitting...
              </>
            ) : (
              "Send Code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailValidation;
