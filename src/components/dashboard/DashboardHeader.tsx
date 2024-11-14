import React from 'react';
import { Bell, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-dark-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Association name - Hidden on mobile */}
          <div className="hidden lg:flex lg:items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user?.associationName || 'Mon Association'}
            </h1>
          </div>

          {/* Mobile Association name - Centered */}
          <div className="lg:hidden flex-1 flex items-center justify-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">
              {user?.associationName || 'Mon Association'}
            </h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 mr-4">
              <span className="hidden md:inline">{user?.name}</span>
              <span className="hidden sm:inline text-xs ml-1">({user?.role})</span>
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Bell className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate('/app/settings')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleLogout}
              className="p-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:ml-2 sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}