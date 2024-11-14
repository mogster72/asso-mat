import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ASSOCIATIONS_STORAGE_KEY = 'associations';
const MEMBERS_STORAGE_KEY = 'association_members';

interface Association {
  id: string;
  name: string;
  createdAt: Date;
  createdBy: string;
}

const getStoredAssociations = (): Association[] => {
  try {
    const stored = localStorage.getItem(ASSOCIATIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des associations:', error);
    return [];
  }
};

export function useAssociation() {
  const [associations, setAssociations] = useState<Association[]>(getStoredAssociations());
  const { user, logout } = useAuth();

  const getCurrentAssociation = useCallback(() => {
    if (!user?.associationId) return null;
    return associations.find(a => a.id === user.associationId) || null;
  }, [associations, user]);

  const createAssociation = useCallback((name: string) => {
    if (!user) throw new Error('Utilisateur non connecté');

    const newAssociation: Association = {
      id: Date.now().toString(),
      name,
      createdAt: new Date(),
      createdBy: user.id
    };

    const updatedAssociations = [...associations, newAssociation];
    localStorage.setItem(ASSOCIATIONS_STORAGE_KEY, JSON.stringify(updatedAssociations));
    setAssociations(updatedAssociations);

    return newAssociation;
  }, [associations, user]);

  const dissolveAssociation = useCallback(async () => {
    if (!user?.associationId || user.role !== 'responsable') {
      throw new Error('Seul le responsable peut dissoudre l\'association');
    }

    try {
      // Supprimer l'association
      const updatedAssociations = associations.filter(a => a.id !== user.associationId);
      localStorage.setItem(ASSOCIATIONS_STORAGE_KEY, JSON.stringify(updatedAssociations));
      setAssociations(updatedAssociations);

      // Supprimer tous les membres de l'association
      const allMembers = JSON.parse(localStorage.getItem(MEMBERS_STORAGE_KEY) || '[]');
      const updatedMembers = allMembers.filter((m: any) => m.associationId !== user.associationId);
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updatedMembers));

      // Déconnecter l'utilisateur
      logout();

      return true;
    } catch (error) {
      console.error('Erreur lors de la dissolution:', error);
      throw new Error('Impossible de dissoudre l\'association');
    }
  }, [associations, user, logout]);

  return {
    associations,
    getCurrentAssociation,
    createAssociation,
    dissolveAssociation
  };
}