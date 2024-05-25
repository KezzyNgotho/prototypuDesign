import { axiosApi } from "..";

export const createUserAccount = async (
  username,
  email,
  password,
  password_confirmation,
  role
) => {
  return await axiosApi.post("/users/", {
    username,
    email,
    password,
    password_confirmation,
    role,
  });
};

export const requestToken = async (username, password) => {
  return await axiosApi.post("/generate-token/", {
    username,
    password,
  });
};

export const deleteAccount = async (user_code) => {
  return await axiosApi.destroy(`/users/${user_code}`);
};

export const verifyUserAccount = async (user_code, validation_code) => {
  return await axiosApi.patch(`/users/${user_code}/activate`, {
    validation_code,
  });
};

export const resendCode = async (user_id) => {
  return await axiosApi.get(`/users/resend/${user_id}`);
};
