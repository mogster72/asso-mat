import { useState } from 'react';
import { Poll } from '../types';

const POLLS_STORAGE_KEY = 'association_polls';

const getStoredPolls = (): Poll[] => {
  try {
    const stored = localStorage.getItem(POLLS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des sondages:', error);
    return [];
  }
};

export function usePolls() {
  const [polls, setPolls] = useState<Poll[]>(getStoredPolls());

  const savePolls = (newPolls: Poll[]) => {
    try {
      localStorage.setItem(POLLS_STORAGE_KEY, JSON.stringify(newPolls));
      setPolls(newPolls);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des sondages:', error);
    }
  };

  const addPoll = (poll: Omit<Poll, 'id' | 'votes'>) => {
    const newPoll = {
      ...poll,
      id: Math.random().toString(36).substr(2, 9),
      votes: {}
    };
    savePolls([...polls, newPoll]);
  };

  const removePoll = (id: string) => {
    savePolls(polls.filter(poll => poll.id !== id));
  };

  const vote = (pollId: string, userId: string, option: string) => {
    savePolls(polls.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          votes: {
            ...poll.votes,
            [userId]: option
          }
        };
      }
      return poll;
    }));
  };

  const getResults = (pollId: string) => {
    const poll = polls.find(p => p.id === pollId);
    if (!poll) return null;

    const results = poll.options.reduce((acc, option) => {
      acc[option] = Object.values(poll.votes).filter(vote => vote === option).length;
      return acc;
    }, {} as Record<string, number>);

    return results;
  };

  return { polls, addPoll, removePoll, vote, getResults };
}