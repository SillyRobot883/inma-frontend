import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "api";

// Fetch all memberships for a club
export const fetchClubMembers = async (clubId) => {
  const response = await axios.get(`${API_URL}/clubs/${clubId}/memberships`);
  return response.data;
};

// Add a new membership to a club
export const addClubMember = async (clubId, memberData) => {
  const response = await axios.post(`${API_URL}/clubs/${clubId}/memberships`, memberData);
  return response.data;
};

// Update details of a specific membership in a club
export const updateClubMember = async (clubId, memberId, memberData) => {
  const response = await axios.put(`${API_URL}/clubs/${clubId}/memberships/${memberId}`, memberData);
  return response.data;
};

// Remove a specific membership from a club
export const removeClubMember = async (clubId, memberId) => {
  const response = await axios.delete(`${API_URL}/clubs/${clubId}/memberships/${memberId}`);
  return response.data;
};
