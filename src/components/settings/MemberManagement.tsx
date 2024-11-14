import React, { useState } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import { useMembers } from '../../hooks/useMembers';
import Toast from '../ui/Toast';

export default function MemberManagement() {
  const { members, removeMember } = useMembers();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleDelete = (memberId: string) => {
    try {
      removeMember(memberId);
      setToast({ message: 'Membre supprimé avec succès', type: 'success' });
      setConfirmDelete(null);
    } catch (error) {
      setToast({ message: 'Erreur lors de la suppression', type: 'error' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Gestion des membres
      </h2>

      <div className="space-y-4">
        {members.map((member) => (
          <div 
            key={member.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {member.email}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {member.role}
              </span>
            </div>

            {confirmDelete === member.id ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-red-600 dark:text-red-400">
                  Confirmer ?
                </span>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Oui
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md"
                >
                  Non
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(member.id)}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}

        {members.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-2" />
            Aucun membre à afficher
          </div>
        )}
      </div>

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