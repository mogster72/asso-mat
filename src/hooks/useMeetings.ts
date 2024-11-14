import { useState } from 'react';
import { Meeting } from '../types';

const MEETINGS_STORAGE_KEY = 'association_meetings';

const getStoredMeetings = (): Meeting[] => {
  try {
    const stored = localStorage.getItem(MEETINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des réunions:', error);
    return [];
  }
};

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(getStoredMeetings());

  const saveMeetings = (newMeetings: Meeting[]) => {
    try {
      localStorage.setItem(MEETINGS_STORAGE_KEY, JSON.stringify(newMeetings));
      setMeetings(newMeetings);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des réunions:', error);
    }
  };

  const addMeeting = (meeting: Omit<Meeting, 'id' | 'documents'>) => {
    const newMeeting = {
      ...meeting,
      id: Math.random().toString(36).substr(2, 9),
      documents: []
    };
    saveMeetings([...meetings, newMeeting]);
  };

  const updateMeeting = (id: string, updates: Partial<Meeting>) => {
    saveMeetings(meetings.map(meeting =>
      meeting.id === id ? { ...meeting, ...updates } : meeting
    ));
  };

  const removeMeeting = (id: string) => {
    saveMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  const addMinutes = (id: string, minutes: string) => {
    updateMeeting(id, { minutes, status: 'completed' });
  };

  const addDocument = (meetingId: string, document: { name: string; url?: string }) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting) {
      const newDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: document.name,
        url: document.url
      };
      
      updateMeeting(meetingId, {
        documents: [...meeting.documents, newDocument]
      });
      
      return newDocument;
    }
  };

  const removeDocument = (meetingId: string, documentId: string) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting) {
      updateMeeting(meetingId, {
        documents: meeting.documents.filter(doc => doc.id !== documentId)
      });
    }
  };

  const addParticipant = (meetingId: string, userId: string) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting && !meeting.participants.includes(userId)) {
      updateMeeting(meetingId, {
        participants: [...meeting.participants, userId]
      });
    }
  };

  return {
    meetings,
    addMeeting,
    updateMeeting,
    removeMeeting,
    addMinutes,
    addParticipant,
    addDocument,
    removeDocument
  };
}