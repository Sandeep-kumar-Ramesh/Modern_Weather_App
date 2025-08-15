import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudSun } from 'lucide-react';
import { AppTitleProps } from '../types/weather';

const AppTitle: React.FC<AppTitleProps> = ({ onReset }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    onReset();
    navigate('/home');
  };

  return (
    <div 
      className="flex items-center space-x-2 mb-0 sm:mb-0 cursor-pointer" 
      onClick={handleLogoClick}
    >
      <CloudSun className="w-5 h-5 sm:w-6 sm:h-6" />
      <h1 className="text-lg sm:text-xl font-bold">Weather App</h1>
    </div>
  );
};

export default AppTitle;
