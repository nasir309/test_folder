import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/30 text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Oops!</h3>
        <p className="text-white/80 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};