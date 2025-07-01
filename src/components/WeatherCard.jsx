import React from 'react';
import { getWeatherIcon, formatTime, getWindDirection } from '../utils/weatherUtils';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';

export const WeatherCard = ({ weather }) => {
  const currentTime = new Date().getTime() / 1000;
  const isDay = currentTime > weather.sys.sunrise && currentTime < weather.sys.sunset;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Main Weather Card */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-6 border border-white/30 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {weather.name}, {weather.sys.country}
          </h1>
          <p className="text-white/80 text-lg capitalize">
            {weather.weather[0].description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Temperature and Icon */}
          <div className="flex items-center gap-6">
            <img
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className="w-32 h-32 animate-bounce-gentle"
            />
            <div>
              <div className="text-7xl font-bold text-white mb-2">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="text-white/80 text-xl">
                Feels like {Math.round(weather.main.feels_like)}°
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-6 text-white">
            <div className="flex items-center gap-3">
              <Thermometer className="w-6 h-6 text-white/80" />
              <div>
                <div className="text-sm text-white/80">High / Low</div>
                <div className="text-lg font-semibold">
                  {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-white/80" />
              <div>
                <div className="text-sm text-white/80">Humidity</div>
                <div className="text-lg font-semibold">{weather.main.humidity}%</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Wind className="w-6 h-6 text-white/80" />
              <div>
                <div className="text-sm text-white/80">Wind</div>
                <div className="text-lg font-semibold">
                  {Math.round(weather.wind.speed * 3.6)} km/h {getWindDirection(weather.wind.deg)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Gauge className="w-6 h-6 text-white/80" />
              <div>
                <div className="text-sm text-white/80">Pressure</div>
                <div className="text-lg font-semibold">{weather.main.pressure} hPa</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-6 h-6 text-white/80" />
            <span className="text-white/80 font-medium">Visibility</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(weather.visibility / 1000)} km
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-3">
            <Sunrise className="w-6 h-6 text-white/80" />
            <span className="text-white/80 font-medium">Sunrise</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatTime(weather.sys.sunrise, weather.timezone)}
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-3">
            <Sunset className="w-6 h-6 text-white/80" />
            <span className="text-white/80 font-medium">Sunset</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatTime(weather.sys.sunset, weather.timezone)}
          </div>
        </div>
      </div>
    </div>
  );
};