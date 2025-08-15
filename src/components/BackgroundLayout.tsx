import React, { useState, useEffect } from 'react';
import { BackgroundLayoutProps } from '../types/weather';
import { getWeatherCondition } from '../utils/weatherUtils';

// Import background images
import clearBg from '../assets/images/Clear.jpg';
import cloudyBg from '../assets/images/Cloudy.jpg';
import rainyBg from '../assets/images/Rainy.jpg';
import snowyBg from '../assets/images/snow.jpg';
import stormyBg from '../assets/images/Stormy.jpg';
import sunnyBg from '../assets/images/Sunny.jpg';
import fogBg from '../assets/images/fog.png';
import earthBg from '../assets/images/earth.jpg';

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ weatherData, children, forceEarthBackground = false }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    // If forceEarthBackground is true, always use earth background
    if (forceEarthBackground) {
      setBackgroundImage(earthBg);
      return;
    }

    const weatherCondition = weatherData
      ? getWeatherCondition(weatherData.current_weather.weathercode)
      : 'default';



    const getBackgroundImage = (condition: string): string => {
      switch (condition.toLowerCase()) {
        case 'clear':
          return clearBg;
        case 'clouds':
        case 'cloudy':
        case 'partly cloudy':
          return cloudyBg;
        case 'rain':
        case 'rainy':
        case 'drizzle':
        case 'rain showers':
          return rainyBg;
        case 'snow':
        case 'snowy':
        case 'snow showers':
          return snowyBg;
        case 'thunderstorm':
        case 'storm':
        case 'stormy':
          return stormyBg;
        case 'sunny':
          return sunnyBg;
        case 'fog':
        case 'foggy':
          return fogBg;
        default:
          return earthBg;
      }
    };

    setBackgroundImage(getBackgroundImage(weatherCondition));
  }, [weatherData, forceEarthBackground]);

  return (
    <div 
      className="min-h-screen w-full bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundLayout;
