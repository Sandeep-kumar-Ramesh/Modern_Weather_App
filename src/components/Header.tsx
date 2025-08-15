import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTitle from './AppTitle';
import SearchInputWithAutocomplete from './SearchInputWithAutocomplete';
import CurrentLocationButton from './CurrentLocationButton';
import { HeaderProps } from '../types/weather';

const Header: React.FC<HeaderProps> = ({ 
  fetchWeather, 
  showMessage 
}) => {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleReset = () => {
    setQuery('');
    navigate('/home');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#a3c7e6] backdrop-filter backdrop-blur-lg text-black shadow-lg">
      <div className="block xl:hidden p-4 space-y-4">
        <div className="flex justify-center">
          <AppTitle onReset={handleReset} />
        </div>
        
        <div className="flex justify-center">
          <SearchInputWithAutocomplete
            query={query}
            setQuery={setQuery}
            setWeatherData={() => {}}
            setLoading={() => {}}
            setError={() => {}}
            setShowSnackbar={() => {}}
            fetchWeather={fetchWeather}
            showMessage={showMessage}
          />
        </div>
        
        <div className="flex justify-center">
          <CurrentLocationButton
            setWeatherData={() => {}}
            setLoading={() => {}}
            setError={() => {}}
            setQuery={setQuery}
            fetchWeather={fetchWeather}
            showMessage={showMessage}
          />
        </div>
      </div>

      <div className="hidden xl:flex items-center justify-between p-4">
        <AppTitle onReset={handleReset} />
        
        <div className="flex-1 flex justify-center px-8">
          <SearchInputWithAutocomplete
            query={query}
            setQuery={setQuery}
            setWeatherData={() => {}}
            setLoading={() => {}}
            setError={() => {}}
            setShowSnackbar={() => {}}
            fetchWeather={fetchWeather}
            showMessage={showMessage}
          />
        </div>
        
        <CurrentLocationButton
          setWeatherData={() => {}}
          setLoading={() => {}}
          setError={() => {}}
          setQuery={setQuery}
          fetchWeather={fetchWeather}
          showMessage={showMessage}
        />
      </div>
    </header>
  );
};

export default Header;
