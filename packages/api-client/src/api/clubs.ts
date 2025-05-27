import axios from "axios";
import type { ClubType, ClubStatus } from "../constants";

const API_URL = import.meta.env.VITE_API_URL || "api";

export interface Club {
  id: number;
  uuid: string;
  name: string;
  description: string;
  logo: string;
  supervisorId: number;
  type: keyof typeof ClubType;
  foundingDate?: string;
  status: keyof typeof ClubStatus;
  createdBy: number;
  updatedBy: number;
  isArchived: boolean;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClubData {
  name: string;
  description: string;
  logo: string;
  supervisorId: number;
  type: keyof typeof ClubType;
  foundingDate?: string;
  status?: keyof typeof ClubStatus;
}

export const fetchAllClubs = async (): Promise<Club[]> => {
  const response = await axios.get(`${API_URL}/clubs`);
  return response.data;
};

export const fetchClubDetails = async (clubUuid: string): Promise<Club> => {
  const response = await axios.get(`${API_URL}/clubs/${clubUuid}`);
  return response.data;
};

export const createClub = async (clubData: ClubData): Promise<Club> => {
  const response = await axios.post(`${API_URL}/clubs`, clubData);
  return response.data;
};

export const updateClub = async (
  clubUuid: string,
  clubData: Partial<ClubData>
): Promise<Club> => {
  const response = await axios.put(`${API_URL}/clubs/${clubUuid}`, clubData);
  return response.data;
};

export const deleteClub = async (clubUuid: string): Promise<void> => {
  await axios.delete(`${API_URL}/clubs/${clubUuid}`);
};

export const resetClubTerm = async (clubUuid: string): Promise<Club> => {
  const response = await axios.put(`${API_URL}/clubs/${clubUuid}/term-reset`);
  return response.data;
};
