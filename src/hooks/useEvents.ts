import { useState } from 'react';
import { Event } from '../types';

const EVENTS_STORAGE_KEY = 'association_events';

const getStoredEvents = (): Event[] => {
  try {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des événements:', error);
    return [];
  }
};

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(getStoredEvents());

  const saveEvents = (newEvents: Event[]) => {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des événements:', error);
    }
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9)
    };
    saveEvents([...events, newEvent]);
  };

  const removeEvent = (id: string) => {
    saveEvents(events.filter(event => event.id !== id));
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    saveEvents(events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const addParticipant = (eventId: string, userId: string) => {
    const event = events.find(event => event.id === eventId);
    if (event && !event.participants.includes(userId)) {
      updateEvent(eventId, {
        participants: [...event.participants, userId]
      });
    }
  };

  const removeParticipant = (eventId: string, userId: string) => {
    const event = events.find(event => event.id === eventId);
    if (event) {
      updateEvent(eventId, {
        participants: event.participants.filter(id => id !== userId)
      });
    }
  };

  return { 
    events, 
    addEvent, 
    removeEvent, 
    updateEvent, 
    addParticipant, 
    removeParticipant 
  };
}