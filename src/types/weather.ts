// Weather API Types
export interface LocationSuggestion {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relativehumidity_2m: number[];
  precipitation_probability: number[];
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  weathercode: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  hourly: HourlyData;
  daily: DailyData;
  city?: string;
}

// Component Props Types
export interface WeatherCardProps {
  data: WeatherData;
  weatherCondition: string;
}

export interface MiniCardProps {
  date: string;
  temperature: number;
  weatherCode: number;
}

export interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  setWeatherData: (data: WeatherData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowSnackbar: (show: boolean) => void;
  fetchWeather: (lat: number, lon: number, city?: string) => Promise<void>;
  showMessage: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export interface CurrentLocationButtonProps {
  setWeatherData: (data: WeatherData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setQuery: (query: string) => void;
  fetchWeather: (lat: number, lon: number, city?: string) => Promise<void>;
  showMessage: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export interface HeaderProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number, city?: string) => Promise<void>;
  showMessage: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export interface AppTitleProps {
  onReset: () => void;
}

export interface SnackbarProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export interface BackgroundLayoutProps {
  weatherData: WeatherData | null;
  children: React.ReactNode;
  forceEarthBackground?: boolean;
}

export interface InstructionCardProps {}

export interface WeatherFactsCardProps {}

// Hook Types
export interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number, city?: string) => Promise<void>;
  resetWeather: () => void;
}

export interface UseLocationSuggestionsReturn {
  suggestions: LocationSuggestion[];
  loading: boolean;
  error: string | null;
  fetchSuggestions: (query: string) => Promise<void>;
  clearSuggestions: () => void;
}

export interface UseGeolocationReturn {
  getCurrentLocation: () => Promise<{ latitude: number; longitude: number }>;
  error: string | null;
}

export interface UseSnackbarReturn {
  showSnackbar: boolean;
  snackbarMessage: string;
  snackbarType: 'success' | 'error' | 'info' | 'warning';
  showMessage: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideSnackbar: () => void;
}
