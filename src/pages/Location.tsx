import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import { WeatherData } from '../types/weather';
import { getWeatherCondition } from '../utils/weatherUtils';

interface LocationProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const Location: React.FC<LocationProps> = ({ 
  weatherData, 
  loading, 
  error
}) => {
  const navigate = useNavigate();
  const weatherCondition = weatherData
    ? getWeatherCondition(weatherData.current_weather.weathercode)
    : "default";

  useEffect(() => {
    if (!loading && !weatherData && !error) {
      navigate('/home', { replace: true });
    }
  }, [weatherData, loading, error, navigate]);

  if (loading) {
    return (
      <p className="text-center font-bold text-base sm:text-lg text-white">
        Loading weather data, Please wait
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 text-base sm:text-lg">
        Error: {error}
      </p>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-white text-lg sm:text-xl text-center">
          Redirecting to home...
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col xl:flex-row justify-center items-center gap-6 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
        <div className="relative flex flex-col items-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-4 text-center">
            {weatherData.city
              ? `Current Weather in ${weatherData.city}`
              : "Current Weather"}
          </h2>
          <div className="relative hover:scale-105 hover:z-20 transition-transform duration-300 w-full">
            <WeatherCard data={weatherData} weatherCondition={weatherCondition} />
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-sm sm:max-w-md lg:max-w-lg xl:w-1/2">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-4 text-center">
            Next 6 days Weather
          </h2>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3 lg:gap-4">
            {weatherData.daily?.time?.slice(1, 7).map((date, index) => {
              const dailyTemp = weatherData.daily.temperature_2m_max?.[index + 1];
              const dailyWeatherCode = weatherData.daily.weathercode?.[index + 1];

              if (dailyTemp !== undefined && dailyWeatherCode !== undefined) {
                return (
                  <ForecastCard
                    key={index}
                    date={date}
                    temperature={dailyTemp}
                    weatherCode={dailyWeatherCode}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Location;
