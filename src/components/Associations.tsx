import React from 'react';
import { Building2, Users, Trophy } from 'lucide-react';

const associations = [
  {
    name: "Club Sportif Universitaire",
    description: "Association sportive proposant diverses activités pour les étudiants",
    memberCount: 150,
    image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Arts & Culture",
    description: "Promotion de l'art et de la culture auprès des jeunes",
    memberCount: 75,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Éco-Citoyens",
    description: "Sensibilisation à l'environnement et actions écologiques",
    memberCount: 120,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

export default function Associations() {
  return (
    <div className="py-12 bg-gray-50" id="associations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Nos Associations
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Ils nous font confiance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {associations.map((association) => (
            <div
              key={association.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={association.image}
                  alt={association.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {association.name}
                </h3>
                <p className="text-gray-600 mb-4">{association.description}</p>
                <div className="flex items-center text-gray-500">
                  <Users size={20} className="mr-2" />
                  <span>{association.memberCount} membres</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <Building2 className="mr-2" size={20} />
            Rejoindre la communauté
          </button>
        </div>
      </div>
    </div>
  );
}