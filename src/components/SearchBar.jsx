import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export const SearchBar = ({ onSearch, onLocationSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              disabled={loading}
            />
          </div>
          <button
            type="button"
            onClick={onLocationSearch}
            disabled={loading}
            className="px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50"
            title="Use current location"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};