import type { ClubStatusType, ClubTypeType } from '../constants';
import apiClient from '../lib/axios';

export interface Club {
  id: number;
  uuid: string;
  name: string;
  description: string;
  logo: string;
  supervisorId: number;
  type: ClubTypeType;
  foundingDate?: string;
  status: ClubStatusType;
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
  type: ClubTypeType;
  foundingDate?: string;
  status?: ClubStatusType;
}

export const fetchAllClubs = async (): Promise<Club[]> => {
  const response = await apiClient.get('/clubs');
  return response.data;
};

export const fetchClubDetails = async (clubUuid: string): Promise<Club> => {
  const response = await apiClient.get(`/clubs/${clubUuid}`);
  return response.data;
};

export const createClub = async (clubData: ClubData): Promise<Club> => {
  const response = await apiClient.post('/clubs', clubData);
  return response.data;
};

export const updateClub = async (clubUuid: string, clubData: Partial<ClubData>): Promise<Club> => {
  const response = await apiClient.put(`/clubs/${clubUuid}`, clubData);
  return response.data;
};

export const deleteClub = async (clubUuid: string): Promise<void> => {
  await apiClient.delete(`/clubs/${clubUuid}`);
};

export const resetClubTerm = async (clubUuid: string): Promise<Club> => {
  const response = await apiClient.put(`/clubs/${clubUuid}/term-reset`);
  return response.data;
};
