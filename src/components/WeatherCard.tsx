import React from "react";
import { MainWeatherIcon, WeatherGrid, createWeatherMetrics } from "./WeatherGrid";
import { getWindDirection, formatDate, formatTime, extractTimeFromISO } from "../utils/weatherUtils";
import { WeatherCardProps } from "../types/weather";

const WeatherCard: React.FC<WeatherCardProps> = ({ data, weatherCondition }) => {
  const { current_weather, daily, hourly, city } = data;

  const temperature = current_weather.temperature;
  const windspeed = current_weather.windspeed;
  const windDirection = getWindDirection(current_weather.winddirection);
  const feelsLike = hourly.apparent_temperature?.[0];
  const humidity = hourly.relativehumidity_2m?.[0];
  const rainProb = hourly.precipitation_probability?.[0];
  const sunrise = extractTimeFromISO(daily.sunrise?.[0] || '');
  const sunset = extractTimeFromISO(daily.sunset?.[0] || '');

  const date = formatDate(new Date());
  const time = formatTime(new Date());

  const weatherMetrics = createWeatherMetrics({
    feelsLike,
    rainProb,
    sunrise,
    sunset,
    humidity,
    windspeed,
    windDirection
  });

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 sm:p-6 bg-white/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/30 text-white flex flex-col justify-between min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] hover:scale-105 hover:z-20 transition-all duration-300 hover:shadow-cyan-400/50 hover:border-cyan-200/50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <MainWeatherIcon condition={weatherCondition} />
          <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">{temperature}°C</div>
        </div>
        <div className="text-center sm:text-right">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">{city}</div>
          <div className="text-sm sm:text-base lg:text-lg">{date}</div>
          <div className="text-xs sm:text-sm lg:text-md">{time}</div>
        </div>
      </div>

      <hr className="border-t border-white/60 my-3 sm:my-4" />

      <WeatherGrid metrics={weatherMetrics} />

      <div className="flex items-center justify-between text-sm sm:text-base lg:text-xl font-medium">
        <span>Condition</span>
        <span className="text-lg sm:text-xl lg:text-2xl font-bold">{weatherCondition}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
