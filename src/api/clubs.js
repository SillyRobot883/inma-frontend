import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "api";

// Fetch all clubs
export const fetchAllClubs = async () => {
  const response = await axios.get(`${API_URL}/clubs`);
  return response.data;
};

// Fetch details of a specific club
export const fetchClubDetails = async (clubUuid) => {
  const response = await axios.get(`${API_URL}/clubs/${clubUuid}`);
  return response.data;
};

// Create a new club
export const createClub = async (clubData) => {
  const response = await axios.post(`${API_URL}/clubs`, clubData);
  return response.data;
};

// Update details of a specific club
export const updateClub = async (clubUuid, clubData) => {
  const response = await axios.put(`${API_URL}/clubs/${clubUuid}`, clubData);
  return response.data;
};

// Delete a specific club
export const deleteClub = async (clubUuid) => {
  const response = await axios.delete(`${API_URL}/clubs/${clubUuid}`);
  return response.data;
};

// Reset club term
export const resetClubTerm = async (clubUuid) => {
  const response = await axios.put(`${API_URL}/clubs/${clubUuid}/term-reset`);
  return response.data;
};


