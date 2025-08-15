import React from 'react';
import {
  SunMedium,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Droplet,
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number | string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 24, 
  className = "" 
}) => {
  const iconProps = {
    size: typeof size === 'number' ? size : undefined,
    className: typeof size === 'string' ? size : className,
  };

  switch (condition.toLowerCase()) {
    case "clear":
    case "sunny":
      return <SunMedium {...iconProps} />;

    case "partly cloudy":
    case "mostly sunny":
    case "partly sunny":
    case "scattered clouds":
      return <SunMedium {...iconProps} />;

    case "clouds":
    case "cloudy":
    case "overcast":
      return <Cloud {...iconProps} />;

    case "fog":
    case "mist":
      return <CloudFog {...iconProps} />;

    case "drizzle":
    case "light rain":
      return <Droplet {...iconProps} />;

    case "rain":
    case "rain showers":
    case "moderate rain":
      return <CloudRain {...iconProps} />;

    case "thunderstorm":
    case "storm":
    case "thunderstorm with hail":
      return <CloudLightning {...iconProps} />;

    case "snow":
    case "snow showers":
    case "freezing rain":
    case "freezing drizzle":
      return <Snowflake {...iconProps} />;

    default:
      return <SunMedium {...iconProps} />;
  }
};

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
