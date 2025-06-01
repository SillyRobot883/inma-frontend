import type { GlobalRoleType } from '../constants';
import apiClient from '../lib/axios';

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

export interface User {
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
  globalRole: GlobalRoleType;
  providers: Array<{ name: string; providerId: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
}

export const register = async (userData: UserData): Promise<AuthResponse> => {
  const response = await apiClient.post('/register/tmp', userData);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post('/login/tmp', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/logout');
};
