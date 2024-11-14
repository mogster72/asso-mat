import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { User as UserType } from '../../types';
import MemberActivity from './MemberActivity';
import { useActivities } from '../../hooks/useActivities';

interface MemberDetailsProps {
  member: UserType;
  onClose: () => void;
}

export default function MemberDetails({ member, onClose }: MemberDetailsProps) {
  const { getUserActivities } = useActivities();
  const activities = getUserActivities(member.id);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-800 rounded-lg w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-1" />
                  {member.email}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Informations
            </h4>
            <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 space-y-3">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium mr-2">Rôle:</span>
                <span className="capitalize">{member.role}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-medium mr-2">Membre depuis:</span>
                <span>Mars 2024</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Activités récentes
            </h4>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <MemberActivity key={activity.id} activity={activity} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Aucune activité récente
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}