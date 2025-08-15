import { useState, useCallback } from 'react';
import { WeatherData, UseWeatherReturn } from '../types/weather';
import { fetchWeather } from '../api/weatherApi';

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (lat: number, lon: number, city?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeather(lat, lon);
      if (data) {
        setWeatherData({ ...data, city });
      } else {
        setError('Could not fetch weather data. Please try again.');
        setWeatherData(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      setWeatherData(null);
      console.error("Failed to fetch weather data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetWeather = useCallback(() => {
    setWeatherData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeather: fetchWeatherData,
    resetWeather,
  };
};

