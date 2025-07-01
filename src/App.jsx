import React, { useState, useEffect } from 'react';
import { weatherApi } from './services/WeatherApi';
import { getWeatherBackground } from './utils/WeatherUtils';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const [weatherData, forecastData] = await Promise.all([
            weatherApi.getCurrentWeatherByCoords(latitude, longitude),
            weatherApi.getForecastByCoords(latitude, longitude)
          ]);
          
          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
          setWeather(null);
          setForecast(null);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  // Load default city on mount
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  const currentTime = new Date().getTime() / 1000;
  const isDay = weather ? (currentTime > weather.sys.sunrise && currentTime < weather.sys.sunset) : true;
  const backgroundClass = weather 
    ? getWeatherBackground(weather.weather[0].main, isDay)
    : 'min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';

  return (
    <div className={backgroundClass}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Weather App
          </h1>
          <p className="text-white/80 text-xl animate-fade-in">
            Get current weather and 5-day forecast for any city
          </p>
        </div>

        <SearchBar
          onSearch={fetchWeatherData}
          onLocationSearch={fetchWeatherByLocation}
          loading={loading}
        />

        {loading && <LoadingSpinner />}

        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => weather && fetchWeatherData(weather.name)}
          />
        )}

        {weather && !loading && !error && (
          <>
            <WeatherCard weather={weather} />
            {forecast && <ForecastCard forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;