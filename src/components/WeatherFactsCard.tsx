import React, { useState } from "react";
import { getRandomWeatherFact } from "../utils/weatherUtils";
import { WeatherFactsCardProps } from "../types/weather";

const WeatherFactsCard: React.FC<WeatherFactsCardProps> = () => {
  const [randomFact] = useState<string>(() => getRandomWeatherFact());

  return (
    <div className="bg-black backdrop-blur-xl border border-black/20 ring-1 ring-black/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl mt-8 sm:mt-12 mx-auto inline-block text-center transition-all duration-300 hover:bg-white/5 hover:scale-105 hover:z-20 hover:shadow-cyan-400/50 hover:border-cyan-200/50 w-full">
      <p className="text-xs sm:text-sm lg:text-base text-gray-100 tracking-wide leading-relaxed">
        <span className="text-blue-600 font-bold">🌍 Did you know?</span>{" "}
        {randomFact}
      </p>
    </div>
  );
};

export default WeatherFactsCard;
