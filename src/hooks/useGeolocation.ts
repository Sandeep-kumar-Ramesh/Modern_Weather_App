import { useState, useCallback } from 'react';
import { UseGeolocationReturn } from '../types/weather';

export const useGeolocation = (): UseGeolocationReturn => {
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback((): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMessage = 'Geolocation is not supported by your browser.';
        setError(errorMessage);
        reject(new Error(errorMessage));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setError(null);
          resolve({ latitude, longitude });
        },
        (_) => {
          const errorMessage = 'Permission denied or location not available.';
          setError(errorMessage);
          reject(new Error(errorMessage));
        }
      );
    });
  }, []);

  return {
    getCurrentLocation,
    error,
  };
};

