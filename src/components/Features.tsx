import React from 'react';
import { Users, Calendar, Vote, FileText } from 'lucide-react';

const features = [
  {
    name: 'Gestion des membres',
    description: 'Gérez facilement vos adhérents, leurs rôles et leurs cotisations.',
    icon: Users,
  },
  {
    name: 'Événements',
    description: 'Planifiez et organisez vos événements avec un calendrier partagé.',
    icon: Calendar,
  },
  {
    name: 'Votes et sondages',
    description: 'Créez des votes et sondages pour prendre des décisions collectives.',
    icon: Vote,
  },
  {
    name: 'Bilans de réunions',
    description: 'Rédigez et partagez vos comptes-rendus de réunions.',
    icon: FileText,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Fonctionnalités
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Une solution complète pour votre association
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Découvrez tous les outils nécessaires pour gérer efficacement votre association.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}