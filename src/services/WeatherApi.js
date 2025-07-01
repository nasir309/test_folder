const API_KEY = 'f6707fff995a431c7251d28b0b5d34c3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
  getCurrentWeather: async (city) => {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    return response.json();
  },

  getCurrentWeatherByCoords: async (lat, lon) => {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    return response.json();
  },

  getForecast: async (city) => {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    
    return response.json();
  },

  getForecastByCoords: async (lat, lon) => {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    
    return response.json();
  },
};