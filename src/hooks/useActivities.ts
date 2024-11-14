import { useState } from 'react';
import { Activity } from '../types';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      userId: '1',
      type: 'event',
      action: 'create',
      targetId: '1',
      timestamp: new Date('2024-03-10T10:00:00'),
      details: 'A créé l\'événement "Assemblée Générale"'
    },
    {
      id: '2',
      userId: '1',
      type: 'poll',
      action: 'vote',
      targetId: '1',
      timestamp: new Date('2024-03-11T14:30:00'),
      details: 'A voté dans le sondage "Choix du logo"'
    },
    {
      id: '3',
      userId: '2',
      type: 'meeting',
      action: 'participate',
      targetId: '1',
      timestamp: new Date('2024-03-12T09:15:00'),
      details: 'A participé à la réunion "Réunion du bureau"'
    }
  ]);

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9)
    };
    setActivities([newActivity, ...activities]);
  };

  const getUserActivities = (userId: string) => {
    return activities.filter(activity => activity.userId === userId);
  };

  return {
    activities,
    addActivity,
    getUserActivities
  };
}