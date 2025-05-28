import axios from 'axios';

import { EVENT_CATEGORIES, EVENT_STATUSES } from '../constants';

const API_URL = import.meta.env.VITE_API_URL || 'api';

export interface Event {
  id: number;
  uuid: string;
  name: string;
  description: string;
  poster: string;
  location: string;
  registrationStart: string;
  registrationEnd: string;
  eventStart: string;
  eventEnd: string;
  seatsAvailable: number;
  seatsRemaining: number;
  status: (typeof EVENT_STATUSES)[number];
  category: (typeof EVENT_CATEGORIES)[number];
  clubId: number;
  createdBy: number;
  updatedBy: number;
  isArchived: boolean;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventData {
  name: string;
  description: string;
  poster: string;
  location: string;
  registrationStart: string;
  registrationEnd: string;
  eventStart: string;
  eventEnd: string;
  seatsAvailable: number;
  category: (typeof EVENT_CATEGORIES)[number];
  clubId: number;
  status?: (typeof EVENT_STATUSES)[number];
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  event: Event;
}

export const fetchAllEvents = async (): Promise<Event[]> => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const registerForEvent = async (eventId: string): Promise<RegistrationResponse> => {
  const response = await axios.post(`${API_URL}/events/${eventId}/register`);
  return response.data;
};

export const unregisterFromEvent = async (eventId: string): Promise<RegistrationResponse> => {
  const response = await axios.post(`${API_URL}/events/${eventId}/unregister`);
  return response.data;
};

export const fetchClubEvents = async (clubId: string): Promise<Event[]> => {
  const response = await axios.get(`${API_URL}/events?clubId=${clubId}`);
  return response.data;
};

export const fetchEventDetails = async (eventId: string): Promise<Event> => {
  const response = await axios.get(`${API_URL}/events/${eventId}`);
  return response.data;
};

export const createEvent = async (eventData: EventData): Promise<Event> => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

export const updateEvent = async (
  eventId: string,
  eventData: Partial<EventData>
): Promise<Event> => {
  const response = await axios.put(`${API_URL}/events/${eventId}`, eventData);
  return response.data;
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  await axios.delete(`${API_URL}/events/${eventId}`);
};
