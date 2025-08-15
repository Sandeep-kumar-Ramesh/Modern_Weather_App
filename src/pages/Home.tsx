import React from 'react';
import InstructionCard from '../components/InstructionCard';
import WeatherFactsCard from '../components/WeatherFactsCard';

const Home: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-4 sm:py-8">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <InstructionCard />
      </div>
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 w-full max-w-sm">
        <WeatherFactsCard />
      </div>
    </main>
  );
};

export default Home;
