import React from 'react';
import { Calendar, Vote, FileText, LogIn } from 'lucide-react';
import { Activity } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MemberActivityProps {
  activity: Activity;
}

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'event':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'poll':
      return <Vote className="h-5 w-5 text-green-500" />;
    case 'meeting':
      return <FileText className="h-5 w-5 text-purple-500" />;
    case 'login':
      return <LogIn className="h-5 w-5 text-gray-500" />;
    default:
      return null;
  }
};

export default function MemberActivity({ activity }: MemberActivityProps) {
  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-700">
          <ActivityIcon type={activity.type} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {activity.details}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(new Date(activity.timestamp), { 
            addSuffix: true,
            locale: fr 
          })}
        </p>
      </div>
    </div>
  );
}