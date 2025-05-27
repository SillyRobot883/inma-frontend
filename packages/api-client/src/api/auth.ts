import axios from "axios";
import { GlobalRole } from "../constants";

const API_URL = import.meta.env.VITE_API_URL || "api";

export interface UserData {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface LoginCredentials {
  email: string;
  nationalId: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user: {
      id: number;
      uuid: string;
      displayName: string;
      firstName: string;
      lastName?: string;
      email: string;
      uniId?: string;
      nationalId: string;
      phoneNumber: string;
      profileImage: string;
      globalRole: keyof typeof GlobalRole;
      providers: Array<{ name: string; providerId: string }>;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export const register = async (userData: UserData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register/tmp`, userData);
  return response.data;
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login/tmp`, credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/logout`);
};
