import React from 'react';
import { getWeatherIcon, formatDate } from '../utils/WeatherUtils';

export const ForecastCard = ({ forecast }) => {
  // Get daily forecasts (one per day at 12:00)
  const dailyForecasts = forecast.list.filter((item, index) => 
    index === 0 || item.dt_txt.includes('12:00:00')
  ).slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-slide-up">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border border-white/30 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          5-Day Forecast
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dailyForecasts.map((day, index) => (
            <div
              key={day.dt}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-white/80 font-medium mb-2">
                {index === 0 ? 'Today' : formatDate(day.dt)}
              </div>
              
              <img
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-16 h-16 mx-auto mb-2"
              />
              
              <div className="text-white text-sm capitalize mb-2">
                {day.weather[0].description}
              </div>
              
              <div className="text-white font-bold text-lg">
                {Math.round(day.main.temp)}°
              </div>
              
              <div className="text-white/70 text-sm">
                {Math.round(day.main.temp_min)}° / {Math.round(day.main.temp_max)}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};