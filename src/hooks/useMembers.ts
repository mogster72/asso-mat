import { useState, useCallback, useEffect } from 'react';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';

const MEMBERS_STORAGE_KEY = 'association_members';

const getStoredMembers = (): User[] => {
  try {
    const stored = localStorage.getItem(MEMBERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des membres:', error);
    return [];
  }
};

export function useMembers() {
  const [members, setMembers] = useState<User[]>(getStoredMembers());
  const { user } = useAuth();

  const saveMembers = useCallback((newMembers: User[]) => {
    try {
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(newMembers));
      setMembers(newMembers);
    } catch (error) {
      throw new Error('Impossible de sauvegarder les membres');
    }
  }, []);

  // Ajoute automatiquement l'utilisateur connecté à la liste des membres
  useEffect(() => {
    if (user && !members.some(member => member.id === user.id)) {
      const updatedMembers = [...members, user];
      saveMembers(updatedMembers);
    }
  }, [user, members, saveMembers]);

  const addMember = useCallback((memberData: Omit<User, 'id'>) => {
    if (!memberData.email || !memberData.name) {
      throw new Error('Les informations du membre sont incomplètes');
    }

    const emailExists = members.some(
      member => member.email.toLowerCase() === memberData.email.toLowerCase()
    );

    if (emailExists) {
      throw new Error('Un membre avec cet email existe déjà');
    }

    const newMember = {
      ...memberData,
      id: Date.now().toString(),
    };
    
    const updatedMembers = [...members, newMember];
    saveMembers(updatedMembers);
    return newMember;
  }, [members, saveMembers]);

  const updateMember = useCallback((id: string, updates: Partial<User>) => {
    if (updates.email) {
      const emailExists = members.some(
        member => member.id !== id && 
        member.email.toLowerCase() === updates.email?.toLowerCase()
      );

      if (emailExists) {
        throw new Error('Un membre avec cet email existe déjà');
      }
    }

    const updatedMembers = members.map(member => 
      member.id === id ? { ...member, ...updates } : member
    );
    saveMembers(updatedMembers);
  }, [members, saveMembers]);

  const removeMember = useCallback((id: string) => {
    const updatedMembers = members.filter(member => member.id !== id);
    saveMembers(updatedMembers);
  }, [members, saveMembers]);

  return {
    members,
    addMember,
    updateMember,
    removeMember
  };
}