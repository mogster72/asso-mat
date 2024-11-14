import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInvitations } from '../../hooks/useInvitations';
import { useMembers } from '../../hooks/useMembers';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AcceptInvitation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { acceptInvitation } = useInvitations();
  const { addMember } = useMembers();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const processInvitation = async () => {
      if (!token) {
        setStatus('error');
        setError('Token d\'invitation manquant');
        return;
      }

      try {
        const invitation = await acceptInvitation(token);
        
        // Ajouter le membre à l'association
        await addMember({
          name: 'Nouveau membre', // Sera mis à jour lors de la première connexion
          email: invitation.email,
          role: invitation.role,
          associationId: invitation.associationId,
          associationName: 'Association' // Sera mis à jour lors de la première connexion
        });

        setStatus('success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      }
    };

    processInvitation();
  }, [token, acceptInvitation, addMember, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Traitement de l'invitation...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="mt-4 text-xl font-medium text-gray-900">
                Invitation acceptée !
              </h2>
              <p className="mt-2 text-gray-600">
                Redirection vers la page de connexion...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto" />
              <h2 className="mt-4 text-xl font-medium text-gray-900">
                Erreur
              </h2>
              <p className="mt-2 text-red-600">{error}</p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Retour à la connexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}