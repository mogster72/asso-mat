import React from 'react';
import { Menu, X, UserCircle2, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>
              Junior Asso
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Fonctionnalités
            </a>
            <a href="#associations" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Associations
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Contact
            </a>
            <button 
              onClick={handleLogin}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <LogIn size={20} />
              <span>Connexion</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#associations"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Associations
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
            <button 
              onClick={handleLogin}
              className="flex items-center space-x-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <LogIn size={20} />
              <span>Connexion</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}