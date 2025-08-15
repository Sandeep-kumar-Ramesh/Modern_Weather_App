import React from 'react';
import {
  Sun,
  CloudRain,
  Snowflake,
  Zap,
  CloudFog,
  Cloudy
} from 'lucide-react';
import { MiniCardProps } from '../types/weather';
import { getWeatherCondition, formatDayOfWeek } from '../utils/weatherUtils';

const ForecastCard: React.FC<MiniCardProps> = ({ date, temperature, weatherCode }) => {
  const weatherCondition = getWeatherCondition(weatherCode);

  const getWeatherIcon = (condition: string) => {
    const iconSize = 24; // Base size for icons

    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={iconSize} className="text-yellow-400" />;
      case 'clouds':
        return <Cloudy size={iconSize} className="text-gray-300" />;
      case 'fog':
        return <CloudFog size={iconSize} className="text-gray-400" />;
      case 'drizzle':
        return <CloudRain size={iconSize} className="text-blue-400" />;
      case 'rain':
      case 'rain showers':
        return <CloudRain size={iconSize} className="text-blue-400" />;
      case 'snow':
      case 'snow showers':
        return <Snowflake size={iconSize} className="text-blue-200" />;
      case 'thunderstorm':
        return <Zap size={iconSize} className="text-yellow-500" />;
      default:
        return <Sun size={iconSize} className="text-yellow-400" />;
    }
  };

  return (
    <div className="relative w-full min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px] bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-white/30 p-2 sm:p-3 lg:p-4 flex flex-col items-center justify-between text-white text-center hover:scale-105 hover:z-20 transition-all duration-300 hover:shadow-cyan-400/50 hover:border-cyan-200/50">
      <div className="text-sm sm:text-base lg:text-lg font-semibold">{formatDayOfWeek(date)}</div>
      <div className="my-1 sm:my-2">
        {getWeatherIcon(weatherCondition)}
      </div>
      <div className="text-xs sm:text-sm font-bold text-white">{weatherCondition}</div>
      <div className="text-lg sm:text-xl font-bold">{Math.round(temperature)}°C</div>
    </div>
  );
};

export default ForecastCard;
