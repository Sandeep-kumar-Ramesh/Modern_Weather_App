import { LocationSuggestion, WeatherData } from '../types/weather';

export const fetchLocationSuggestions = async (query: string): Promise<LocationSuggestion[]> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    return [];
  }
};

// Function to fetch weather data for a specific latitude and longitude
export const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData | null> => {
  // Updated URL to include temperature_2m_max and weathercode in the daily forecast
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation_probability&daily=temperature_2m_max,weathercode,sunrise,sunset&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

