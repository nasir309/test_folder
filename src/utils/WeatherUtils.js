export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getWeatherBackground = (weatherMain, isDay) => {
  const baseClasses = 'min-h-screen transition-all duration-1000';
  
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return `${baseClasses} ${isDay ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black'}`;
    case 'clouds':
      return `${baseClasses} ${isDay ? 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600' : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'}`;
    case 'rain':
    case 'drizzle':
      return `${baseClasses} ${isDay ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-gray-700' : 'bg-gradient-to-br from-blue-900 via-gray-900 to-black'}`;
    case 'thunderstorm':
      return `${baseClasses} ${isDay ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-purple-900' : 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'}`;
    case 'snow':
      return `${baseClasses} ${isDay ? 'bg-gradient-to-br from-blue-200 via-blue-300 to-gray-400' : 'bg-gradient-to-br from-blue-900 via-gray-800 to-black'}`;
    case 'mist':
    case 'fog':
    case 'haze':
      return `${baseClasses} ${isDay ? 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500' : 'bg-gradient-to-br from-gray-700 via-gray-800 to-black'}`;
    default:
      return `${baseClasses} ${isDay ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black'}`;
  }
};