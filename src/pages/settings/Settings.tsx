import React, { useState } from 'react';
import { Settings as SettingsIcon, AlertTriangle } from 'lucide-react';
import MemberManagement from '../../components/settings/MemberManagement';
import { useAssociation } from '../../hooks/useAssociation';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../../components/ui/Toast';

export default function Settings() {
  const { user } = useAuth();
  const { dissolveAssociation } = useAssociation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleDissolve = async () => {
    try {
      await dissolveAssociation();
      // La redirection sera automatique car l'utilisateur sera déconnecté
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
        type: 'error'
      });
    }
    setShowConfirmation(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <SettingsIcon className="w-8 h-8 text-gray-600 dark:text-gray-300 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Paramètres
          </h1>
        </div>

        <div className="space-y-6">
          <MemberManagement />

          {user?.role === 'responsable' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Dissolution de l'association
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Attention : cette action est irréversible et supprimera définitivement l'association
                ainsi que toutes ses données.
              </p>
              
              {!showConfirmation ? (
                <button
                  onClick={() => setShowConfirmation(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Dissoudre l'association
                </button>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 font-medium mb-4">
                    Êtes-vous sûr de vouloir dissoudre l'association ? Cette action ne peut pas être annulée.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleDissolve}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Oui, dissoudre l'association
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
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
    </div>
  );
}