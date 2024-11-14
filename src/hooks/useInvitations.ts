import { useState } from 'react';

interface Invitation {
  id: string;
  email: string;
  role: 'membre' | 'responsable';
  associationId: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired';
  expiresAt: Date;
  createdAt: Date;
}

const INVITATIONS_STORAGE_KEY = 'association_invitations';

const getStoredInvitations = (): Invitation[] => {
  try {
    const stored = localStorage.getItem(INVITATIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des invitations:', error);
    return [];
  }
};

export function useInvitations() {
  const [invitations, setInvitations] = useState<Invitation[]>(getStoredInvitations());

  const saveInvitations = (newInvitations: Invitation[]) => {
    try {
      localStorage.setItem(INVITATIONS_STORAGE_KEY, JSON.stringify(newInvitations));
      setInvitations(newInvitations);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des invitations:', error);
    }
  };

  const createInvitation = (email: string, role: 'membre' | 'responsable', associationId: string) => {
    // Vérifier si une invitation existe déjà
    const existingInvitation = invitations.find(
      inv => inv.email === email && inv.status === 'pending'
    );

    if (existingInvitation) {
      throw new Error('Une invitation est déjà en cours pour cet email');
    }

    const newInvitation: Invitation = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      associationId,
      token: Math.random().toString(36).substr(2, 16),
      status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expire dans 7 jours
      createdAt: new Date()
    };

    saveInvitations([...invitations, newInvitation]);
    
    // Simuler l'envoi d'un email
    console.log(`Email d'invitation envoyé à ${email} avec le token ${newInvitation.token}`);
    
    return newInvitation;
  };

  const acceptInvitation = (token: string) => {
    const invitation = invitations.find(inv => inv.token === token);
    
    if (!invitation) {
      throw new Error('Invitation non trouvée');
    }

    if (invitation.status !== 'pending') {
      throw new Error('Cette invitation n\'est plus valide');
    }

    if (new Date() > new Date(invitation.expiresAt)) {
      saveInvitations(
        invitations.map(inv => 
          inv.token === token ? { ...inv, status: 'expired' } : inv
        )
      );
      throw new Error('Cette invitation a expiré');
    }

    // Mettre à jour le statut de l'invitation
    saveInvitations(
      invitations.map(inv => 
        inv.token === token ? { ...inv, status: 'accepted' } : inv
      )
    );

    return invitation;
  };

  const getPendingInvitations = (associationId: string) => {
    return invitations.filter(
      inv => inv.associationId === associationId && inv.status === 'pending'
    );
  };

  const cancelInvitation = (invitationId: string) => {
    saveInvitations(invitations.filter(inv => inv.id !== invitationId));
  };

  return {
    invitations,
    createInvitation,
    acceptInvitation,
    getPendingInvitations,
    cancelInvitation
  };
}