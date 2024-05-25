import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminCreateUser } from "../../../api/admins/admins";
import AdminProfile from "../AdminLogOut";
import { CircularProgress } from "@mui/material";

const CreateUser = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user_code, setUserCode] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    password_confirmation: "",
  });
  const { username, email, password, password_confirmation, role } = values;
  const navigate = useNavigate();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    adminCreateUser(role, username, password, password_confirmation, email)
      .then((res) => {
        if (res.status === 201) {
          setUserCode(res.data.id);
          setSuccessMessage("User Account Created!");
          setTimeout(() => {
            navigate(-1);
          }, 1500);
          setIsSubmitting(false);
          setValues({
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        let usernameError = "";
        let passwordError = "";
        let errorMessage = "Error creating account. Please try again.";

        if (error.response && error.response.data && error.response.data.errors)
          console.log(error.response.data);
        {
          const errors = error.response.data.errors[0];

          if (errors.password) {
            passwordError = `Password ${errors.password}`;
          }
          if (errors.username) {
            usernameError = `Username ${errors.username}`;
          }

          if (usernameError && passwordError) {
            errorMessage = "Username and password errors. Please try again.";
          } else if (usernameError) {
            errorMessage = usernameError;
          } else if (passwordError) {
            errorMessage = passwordError;
          }
        }

        setErrorMessage(errorMessage);
        setUsernameError(usernameError);
        setPasswordError(passwordError);

        setValues({
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
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
  return (
    <div className="min-h-screen bg-white right-side">
      <div className="flex justify-end mr-[20px] mt-6">
        <AdminProfile />
      </div>
      <div className=" flex items-center justify-center mt-10  ">
        <div className="ml-60">
          <div className="bg-white p-8 rounded shadow-md w-100 border border-custom-blue overflow-y-auto ">
            <h2 className="mb-6 font-semibold">
              Create a user account on the UNITAR hackathon platform
            </h2>

            {successMessage && (
              <div className="mt-4 text-green-600 mb-4 border p-5 rounded border-green-600">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 text-red-600 mb-4 border p-5 rounded border-red-600">
                {errorMessage}
              </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4">
                <select
                  value={role}
                  onChange={handleChange("role")}
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs mb-4 bg-inherit"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="PARTICIPANT">Participant</option>
                  <option value="ADMIN">Organizer</option>
                </select>
                <label className="block text-md">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs mb-2"
                  placeholder="Pietro Schirano"
                  value={username}
                  onChange={handleChange("username")}
                />
                {usernameError && (
                  <p className="text-red-600 text-xs mt-1">{usernameError}</p>
                )}
                <label className="block text-md">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs mb-2"
                  placeholder="pietroschirano@gmail.com"
                  value={email}
                  onChange={handleChange("email")}
                />

                <label className="block text-md ">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs mb-2"
                  placeholder="******"
                  value={password}
                  onChange={handleChange("password")}
                />
                {passwordError && (
                  <p className="text-red-600 text-xs mt-1">{passwordError}</p>
                )}
                <label className="block text-md  mt-2"> Confirm password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs mb-2"
                  placeholder="******"
                  value={password_confirmation}
                  onChange={handleChange("password_confirmation")}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${handleHover()} w-full bg-custom-blue text-white py-2 mt-4 rounded hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue `}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create User"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
