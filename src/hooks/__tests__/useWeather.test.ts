import { renderHook, act } from '@testing-library/react';
import { useWeather } from '../useWeather';
import { fetchWeather } from '../../api/weatherApi';

// Mock the API
jest.mock('../../api/weatherApi');
const mockFetchWeather = fetchWeather as jest.MockedFunction<typeof fetchWeather>;

describe('useWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.weatherData).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.fetchWeather).toBe('function');
    expect(typeof result.current.resetWeather).toBe('function');
  });

  it('should fetch weather data successfully', async () => {
    const mockWeatherData = {
      current_weather: {
        temperature: 25,
        windspeed: 10,
        winddirection: 180,
        weathercode: 0,
        time: '2024-01-01T12:00:00Z'
      },
      daily: {
        time: ['2024-01-01', '2024-01-02'],
        temperature_2m_max: [25, 26],
        temperature_2m_min: [15, 16],
        weathercode: [0, 1],
        sunrise: ['2024-01-01T06:00:00Z'],
        sunset: ['2024-01-01T18:00:00Z']
      },
      hourly: {
        time: ['2024-01-01T12:00:00Z'],
        temperature_2m: [25],
        apparent_temperature: [26],
        relativehumidity_2m: [60],
        precipitation_probability: [10]
      }
    };

    mockFetchWeather.mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchWeather(40.7128, -74.0060, 'New York');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.weatherData).toEqual({ ...mockWeatherData, city: 'New York' });
    expect(mockFetchWeather).toHaveBeenCalledWith(40.7128, -74.0060);
  });

  it('should handle fetch weather data error', async () => {
    mockFetchWeather.mockResolvedValue(null);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchWeather(40.7128, -74.0060, 'New York');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Could not fetch weather data. Please try again.');
    expect(result.current.weatherData).toBe(null);
  });

  it('should handle API exception', async () => {
    const errorMessage = 'Failed to fetch weather data';
    mockFetchWeather.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchWeather(40.7128, -74.0060, 'New York');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch weather data.');
    expect(result.current.weatherData).toBe(null);
  });

  it('should set loading state during fetch', async () => {
    // Create a promise that we can control
    let resolvePromise: (value: any) => void;
    const promise = new Promise<any>((resolve) => {
      resolvePromise = resolve;
    });

    mockFetchWeather.mockReturnValue(promise);

    const { result } = renderHook(() => useWeather());

    // Start the fetch
    act(() => {
      result.current.fetchWeather(40.7128, -74.0060, 'New York');
    });

    // Should be loading
    expect(result.current.loading).toBe(true);

    // Resolve the promise
    await act(async () => {
      resolvePromise!({});
    });

    // Should not be loading anymore
    expect(result.current.loading).toBe(false);
  });

  it('should reset weather data', () => {
    const { result } = renderHook(() => useWeather());

    // First set some data
    act(() => {
      result.current.resetWeather();
    });

    expect(result.current.weatherData).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle multiple fetch calls', async () => {
    const mockWeatherData1 = {
      current_weather: { temperature: 25, windspeed: 10, winddirection: 180, weathercode: 0, time: '2024-01-01T12:00:00Z' },
      daily: { time: ['2024-01-01'], temperature_2m_max: [25], temperature_2m_min: [15], weathercode: [0], sunrise: ['2024-01-01T06:00:00Z'], sunset: ['2024-01-01T18:00:00Z'] },
      hourly: { time: ['2024-01-01T12:00:00Z'], temperature_2m: [25], apparent_temperature: [26], relativehumidity_2m: [60], precipitation_probability: [10] }
    };

    const mockWeatherData2 = {
      current_weather: { temperature: 30, windspeed: 15, winddirection: 90, weathercode: 1, time: '2024-01-01T12:00:00Z' },
      daily: { time: ['2024-01-01'], temperature_2m_max: [30], temperature_2m_min: [20], weathercode: [1], sunrise: ['2024-01-01T06:00:00Z'], sunset: ['2024-01-01T18:00:00Z'] },
      hourly: { time: ['2024-01-01T12:00:00Z'], temperature_2m: [30], apparent_temperature: [31], relativehumidity_2m: [70], precipitation_probability: [20] }
    };

    mockFetchWeather
      .mockResolvedValueOnce(mockWeatherData1)
      .mockResolvedValueOnce(mockWeatherData2);

    const { result } = renderHook(() => useWeather());

    // First fetch
    await act(async () => {
      await result.current.fetchWeather(40.7128, -74.0060, 'New York');
    });

    expect(result.current.weatherData).toEqual({ ...mockWeatherData1, city: 'New York' });

    // Second fetch
    await act(async () => {
      await result.current.fetchWeather(34.0522, -118.2437, 'Los Angeles');
    });

    expect(result.current.weatherData).toEqual({ ...mockWeatherData2, city: 'Los Angeles' });
    expect(mockFetchWeather).toHaveBeenCalledTimes(2);
  });

  it('should handle fetch without city parameter', async () => {
    const mockWeatherData = {
      current_weather: { temperature: 25, windspeed: 10, winddirection: 180, weathercode: 0, time: '2024-01-01T12:00:00Z' },
      daily: { time: ['2024-01-01'], temperature_2m_max: [25], temperature_2m_min: [15], weathercode: [0], sunrise: ['2024-01-01T06:00:00Z'], sunset: ['2024-01-01T18:00:00Z'] },
      hourly: { time: ['2024-01-01T12:00:00Z'], temperature_2m: [25], apparent_temperature: [26], relativehumidity_2m: [60], precipitation_probability: [10] }
    };

    mockFetchWeather.mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchWeather(40.7128, -74.0060);
    });

    expect(result.current.weatherData).toEqual({ ...mockWeatherData, city: undefined });
    expect(mockFetchWeather).toHaveBeenCalledWith(40.7128, -74.0060);
  });
});
