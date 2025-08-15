import React from 'react';

// Icons
import {
  Wind,
  Thermometer,
  Compass,
  SunMedium,
  Droplet,
  Droplets,
} from 'lucide-react';

// Components
import { WeatherIcon } from './WeatherIcon';

interface WeatherMetric {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface WeatherGridProps {
  metrics: WeatherMetric[];
}

export const WeatherGrid: React.FC<WeatherGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4"
        >
          <div className="text-white">
            {metric.icon}
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-white">
              {metric.label}
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-white">
              {metric.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Predefined metric creators
export const createWeatherMetrics = (data: any) => {
  const {
    feelsLike,
    rainProb,
    sunrise,
    sunset,
    humidity,
    windspeed,
    windDirection
  } = data;

  return [
    {
      icon: <Thermometer className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Feels Like",
      value: `${feelsLike}°C`
    },
    {
      icon: <Droplet className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Rain Chance",
      value: `${rainProb}%`
    },
    {
      icon: <SunMedium className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Sunrise / Sunset",
      value: `${sunrise} / ${sunset}`
    },
    {
      icon: <Droplets className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Humidity",
      value: `${humidity}%`
    },
    {
      icon: <Wind className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Wind Speed",
      value: `${windspeed} km/h`
    },
    {
      icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Wind Direction",
      value: windDirection
    }
  ];
};

// Re-export WeatherIcon components for convenience
export const MainWeatherIcon: React.FC<{ condition: string }> = ({ condition }) => (
  <WeatherIcon 
    condition={condition} 
    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" 
  />
);

export const GridWeatherIcon: React.FC<{ condition: string }> = ({ condition }) => (
  <WeatherIcon 
    condition={condition} 
    className="w-5 h-5 sm:w-6 sm:h-6" 
  />
);

export const MiniWeatherIcon: React.FC<{ condition: string }> = ({ condition }) => (
  <WeatherIcon 
    condition={condition} 
    className="w-8 h-8 sm:w-10 sm:h-10" 
  />
);
