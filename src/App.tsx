import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BackgroundLayout from './components/BackgroundLayout';
import Header from './components/Header';
import Home from './pages/Home';
import Location from './pages/Location';
import Snackbar from './components/Snackbar';
import { useWeather } from './hooks/useWeather';
import useSnackbar from './hooks/useSnackbar';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { weatherData, loading, error, fetchWeather } = useWeather();
  const { showSnackbar, snackbarMessage, snackbarType, showMessage, hideSnackbar } = useSnackbar();

  const forceEarthBackground = location.pathname === '/home';

  React.useEffect(() => {
    if (error) {
      showMessage(error, 'error');
    }
  }, [error, showMessage]);

  return (
    <BackgroundLayout weatherData={weatherData} forceEarthBackground={forceEarthBackground}>
      <div className="min-h-screen w-full bg-fixed">
        <div className="relative z-10 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
          <Header 
            weatherData={weatherData} 
            loading={loading} 
            error={error}
            fetchWeather={fetchWeather}
            showMessage={showMessage}
          />
          
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/location" element={
              <Location 
                weatherData={weatherData} 
                loading={loading} 
                error={error}
              />
            } />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
          
          <Snackbar
            message={snackbarMessage}
            isVisible={showSnackbar}
            onClose={hideSnackbar}
            type={snackbarType}
          />
        </div>
      </div>
    </BackgroundLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
