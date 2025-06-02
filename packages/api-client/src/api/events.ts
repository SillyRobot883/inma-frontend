import { EVENT_CATEGORIES, EVENT_STATUSES } from '../constants';
import apiClient from '../lib/axios';

export interface Club {
  name: string;
  uuid: string;
  logo: string;
}

export interface Event {
  id: number;
  uuid: string;
  name: string;
  description: string;
  poster: string;
  location: string;
  eventStart: string;
  eventEnd: string;
  registrationStart?: string;
  registrationEnd?: string;
  seatsAvailable: number;
  seatsRemaining: number;
  status: (typeof EVENT_STATUSES)[number];
  category: (typeof EVENT_CATEGORIES)[number];
  club: Club;
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

export interface EventRegistration {
  id: number;
  userId: number;
  eventId: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdBy: number;
  updatedBy: number;
  isArchived: boolean;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  user: {
    id: number;
    uuid: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    eventRegistration: EventRegistration[];
  };
}

export interface RegisteredEvent extends Event {
  registrationStatus: 'pending' | 'accepted' | 'rejected';
}

export const fetchAllEvents = async (): Promise<Event[]> => {
  const response = await apiClient.get<{ success: boolean; data: Event[] }>('/events');
  return response.data.data || response.data;
};

export const registerForEvent = async (eventId: string): Promise<RegistrationResponse> => {
  const response = await apiClient.post(`/events/${eventId}/register`);
  return response.data;
};

export const unregisterFromEvent = async (eventId: string): Promise<RegistrationResponse> => {
  const response = await apiClient.post(`/events/${eventId}/unregister`);
  return response.data;
};

export const fetchClubEvents = async (clubId: string): Promise<Event[]> => {
  const response = await apiClient.get(`/events?clubId=${clubId}`);
  return response.data;
};

export const fetchEventDetails = async (eventId: string): Promise<Event> => {
  const response = await apiClient.get(`/events/${eventId}`);
  return response.data.data?.event || response.data;
};

export const createEvent = async (eventData: EventData): Promise<Event> => {
  const response = await apiClient.post('/events', eventData);
  return response.data;
};

export const updateEvent = async (
  eventId: string,
  eventData: Partial<EventData>
): Promise<Event> => {
  const response = await apiClient.put(`/events/${eventId}`, eventData);
  return response.data;
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  await apiClient.delete(`/events/${eventId}`);
};

export const fetchUserRegisteredEvents = async (): Promise<RegisteredEvent[]> => {
  try {
    const profileResponse = await apiClient.get<UserProfile>('/profile?include=eventRegistration');
    const userProfile = profileResponse.data;

    if (!userProfile.user?.eventRegistration || userProfile.user.eventRegistration.length === 0) {
      return [];
    }

    const eventsResponse = await apiClient.get<{ success: boolean; data: Event[] }>('/events');
    const allEvents = eventsResponse.data.data || eventsResponse.data;

    const registrationMap = new Map(
      userProfile.user.eventRegistration.map((reg) => [reg.eventId, reg.status])
    );

    const registeredEvents = allEvents
      .filter((event) => registrationMap.has(event.id))
      .map((event) => ({
        ...event,
        registrationStatus: registrationMap.get(event.id) as 'pending' | 'accepted' | 'rejected',
      }));

    return registeredEvents;
  } catch {
    throw new Error('Failed to fetch user registered events');
  }
};
