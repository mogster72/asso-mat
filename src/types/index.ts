export interface User {
  id: string;
  name: string;
  email: string;
  role: 'responsable' | 'membre';
  associationId: string;
  associationName: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  associationId: string;
  participants: string[];
  minutes?: string;
  documents: {
    id: string;
    name: string;
    url?: string;
  }[];
  status: 'planned' | 'completed';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  associationId: string;
  participants: string[];
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  deadline: Date;
  associationId: string;
  votes: Record<string, string>;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'event' | 'poll' | 'meeting' | 'login';
  action: 'create' | 'update' | 'delete' | 'vote' | 'participate';
  targetId: string;
  timestamp: Date;
  details: string;
}