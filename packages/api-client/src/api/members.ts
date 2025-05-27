import axios from "axios";
import { ClubRole, MembershipStatus } from "../constants";

const API_URL = import.meta.env.VITE_API_URL || "api";

type ClubRoleType = keyof typeof ClubRole;
type MembershipStatusType = keyof typeof MembershipStatus;

export interface Member {
  id: number;
  uuid: string;
  userId: number;
  clubId: number;
  role: ClubRoleType;
  tag?: string;
  status: MembershipStatusType;
  submittingErrors: number;
  createdBy: number;
  updatedBy: number;
  joinedAt: string;
  isArchived: boolean;
  archivedAt?: string;
}

export interface MemberData {
  email: string;
  role?: ClubRoleType;
  tag?: string;
}

export interface UpdateMemberData {
  role?: ClubRoleType;
  tag?: string;
  status?: MembershipStatusType;
}

export interface MembershipResponse {
  success: boolean;
  message: string;
  member: Member;
}

export const fetchClubMembers = async (clubUuid: string): Promise<Member[]> => {
  const response = await axios.get(`${API_URL}/clubs/${clubUuid}/memberships`);
  return response.data;
};

export const addClubMember = async (clubUuid: string, memberData: MemberData): Promise<MembershipResponse> => {
  const response = await axios.post(`${API_URL}/clubs/${clubUuid}/memberships`, memberData);
  return response.data;
};

export const updateClubMember = async (clubUuid: string, membershipUuid: string, memberData: UpdateMemberData): Promise<MembershipResponse> => {
  const response = await axios.put(`${API_URL}/clubs/${clubUuid}/memberships/${membershipUuid}`, memberData);
  return response.data;
};

export const removeClubMember = async (clubUuid: string, membershipUuid: string): Promise<void> => {
  await axios.delete(`${API_URL}/clubs/${clubUuid}/memberships/${membershipUuid}`);
};

// User-initiated actions
export const joinClub = async (clubUuid: string): Promise<MembershipResponse> => {
  const response = await axios.post(`${API_URL}/clubs/${clubUuid}/memberships/me`);
  return response.data;
};

export const leaveClub = async (clubUuid: string): Promise<void> => {
  await axios.delete(`${API_URL}/clubs/${clubUuid}/memberships/me`);
};

export const getMembershipDetails = async (clubUuid: string, membershipUuid: string): Promise<Member> => {
  const response = await axios.get(`${API_URL}/clubs/${clubUuid}/memberships/${membershipUuid}`);
  return response.data;
};