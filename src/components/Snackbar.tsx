import React from 'react';
import { X } from 'lucide-react';
import { SnackbarProps } from '../types/weather';

const Snackbar: React.FC<SnackbarProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  type = 'info' 
}) => {
  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className={`fixed bottom-4 sm:bottom-16 left-2 sm:left-6 right-2 sm:right-auto z-50 max-w-sm sm:max-w-md ${getTypeStyles()} rounded-lg shadow-lg p-3 sm:p-4 flex items-center justify-between`}>
      <span className="text-sm sm:text-base flex-1 mr-2">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors duration-200 flex-shrink-0"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Snackbar;
