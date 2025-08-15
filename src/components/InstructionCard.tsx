import React from 'react';
import AnimatedSunIcon from './AnimatedSunIcon';

const InstructionCard: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white border-opacity-20 max-w-2xl mx-auto hover:scale-105 hover:z-20 transition-all duration-300 hover:shadow-cyan-400/50 hover:border-cyan-200/50">
      <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
        <AnimatedSunIcon />
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
          Welcome to the Weather App!
        </h2>
      </div>
      <p className="text-sm sm:text-base lg:text-lg font-md text-white drop-shadow-md mt-4 sm:mt-6 text-center">
        Search the weather for any place in this beautiful world or
        simply use your current location for instant weather forecast
        of your city!
      </p>
    </div>
  );
};

export default InstructionCard;
