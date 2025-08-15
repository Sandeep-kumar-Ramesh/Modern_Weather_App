import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';
import { CurrentLocationButtonProps } from '../types/weather';

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({ 
  setWeatherData, 
  setLoading, 
  setError, 
  setQuery,
  fetchWeather,
  showMessage 
}) => {
  const navigate = useNavigate();
  const { getCurrentLocation, error: geolocationError } = useGeolocation();

  const handleCurrentLocation = async () => {
    // Clear the search query immediately
    setQuery('');
    // Clear any existing weather data and then set loading state
    setWeatherData(null);
    setLoading(true);
    setError(null);
    
    try {
      const { latitude, longitude } = await getCurrentLocation();
      await fetchWeather(latitude, longitude, 'Current Location');
      // Navigate to location page after successful weather fetch
      navigate('/location');
    } catch (err) {
      const errorMessage = geolocationError || 'Permission denied or location not available.';
      setError(errorMessage);
      setLoading(false);
      showMessage(errorMessage, 'error');
      console.error("Geolocation error:", err);
    }
  };
  
  return (
    <button
      onClick={handleCurrentLocation}
      className="w-auto mt-0 sm:mt-0 sm:ml-0 px-4 py-2 bg-[#00428b] hover:bg-[#01346e] text-white font-semibold rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base min-w-[140px]"
    >
      Current Location
    </button>
  );
};

export default CurrentLocationButton;
