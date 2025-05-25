import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "api";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register/tmp`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login/tmp`, credentials);
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`);
};
