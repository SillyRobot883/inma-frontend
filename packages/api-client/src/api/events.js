import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "api";

// Fetch all events (public)
export const fetchAllEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// Register for an event
export const registerForEvent = async (eventId) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/register`);
  return response.data;
};

// Unregister from an event
export const unregisterFromEvent = async (eventId) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/unregister`);
  return response.data;
};

// Fetch all events for a club
export const fetchClubEvents = async (clubId) => {
  const response = await axios.get(`${API_URL}/events?clubId=${clubId}`);
  return response.data;
};

// Fetch details of a specific event
export const fetchEventDetails = async (eventId) => {
  const response = await axios.get(`${API_URL}/events/${eventId}`);
  return response.data;
};

// Create a new event
export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

// Update details of a specific event
export const updateEvent = async (eventId, eventData) => {
  const response = await axios.put(`${API_URL}/events/${eventId}`, eventData);
  return response.data;
};

// Delete a specific event
export const deleteEvent = async (eventId) => {
  const response = await axios.delete(`${API_URL}/events/${eventId}`);
  return response.data;
};

