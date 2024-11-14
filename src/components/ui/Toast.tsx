import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      fixed bottom-4 right-4 rounded-lg shadow-lg p-4 
      ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
      flex items-center animate-bounce
    `}>
      {type === 'success' ? (
        <CheckCircle className="w-6 h-6 mr-2" />
      ) : (
        <XCircle className="w-6 h-6 mr-2" />
      )}
      {message}
    </div>
  );
}