import api from "./api";

// ✅ Request OTP for Registration
export const requestRegisterOTP = async (data) => {
  return await api.post("/users/register", data);
};

// ✅ Request OTP for Login
export const requestLoginOTP = async (data) => {
  return await api.post("/users/login", data);
};

// ✅ Verify OTP
export const verifyOTP = async (data) => {
  return await api.post("/users/verify", data);
};