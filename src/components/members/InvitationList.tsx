import React from 'react';
import { Mail, X, Clock } from 'lucide-react';
import { useInvitations } from '../../hooks/useInvitations';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function InvitationList() {
  const { user } = useAuth();
  const { getPendingInvitations, cancelInvitation } = useInvitations();

  if (!user?.associationId) return null;

  const pendingInvitations = getPendingInvitations(user.associationId);

  if (pendingInvitations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Invitations en attente
      </h3>
      <div className="space-y-3">
        {pendingInvitations.map((invitation) => (
          <div
            key={invitation.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {invitation.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Expire {formatDistanceToNow(new Date(invitation.expiresAt), {
                    addSuffix: true,
                    locale: fr
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => cancelInvitation(invitation.id)}
              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}