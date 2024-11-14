import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Vote, FileText, Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', to: '/app', icon: LayoutDashboard },
  { name: 'Membres', to: '/app/members', icon: Users },
  { name: 'Événements', to: '/app/events', icon: Calendar },
  { name: 'Votes', to: '/app/polls', icon: Vote },
  { name: 'Réunions', to: '/app/meetings', icon: FileText },
];

export default function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button - Positioned to the left */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label="Menu principal"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        fixed lg:sticky top-0 left-0 z-40
        h-screen w-64 bg-white dark:bg-dark-800 shadow-lg
        transform transition-transform duration-300 ease-in-out
        overflow-y-auto
      `}>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Junior Asso</h2>
        </div>
        <nav className="mt-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-gray-700 dark:text-gray-300
                hover:bg-indigo-50 dark:hover:bg-dark-700 hover:text-indigo-600 dark:hover:text-indigo-400
                ${isActive ? 'bg-indigo-50 dark:bg-dark-700 text-indigo-600 dark:text-indigo-400' : ''}`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}