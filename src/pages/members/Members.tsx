import React, { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';
import { useMembers } from '../../hooks/useMembers';
import { useInvitations } from '../../hooks/useInvitations';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../../components/ui/Toast';
import InvitationModal from '../../components/members/InvitationModal';
import InvitationList from '../../components/members/InvitationList';

export default function Members() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { members } = useMembers();
  const { createInvitation } = useInvitations();
  const { user } = useAuth();

  const handleInvite = async (data: { email: string; role: 'membre' | 'responsable' }) => {
    try {
      if (!user?.associationId) {
        throw new Error('Erreur d\'association');
      }

      await createInvitation(data.email, data.role, user.associationId);
      setToast({ message: 'Invitation envoyée avec succès', type: 'success' });
      setShowInviteModal(false);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Erreur lors de l\'envoi de l\'invitation',
        type: 'error'
      });
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Nos membres</h1>
            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Inviter un membre
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 rounded-full p-3">
                    <Users className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <span className="text-xs text-gray-500 capitalize">
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <InvitationList />
        </div>
      </div>

      {showInviteModal && (
        <InvitationModal
          onSubmit={handleInvite}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}