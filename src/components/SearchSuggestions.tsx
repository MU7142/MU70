import React from 'react';
import { Search, Film, Tv, Star } from 'lucide-react';
import { Movie } from '../types';

interface SearchSuggestionsProps {
  suggestions: Movie[];
  onSuggestionClick: (movie: Movie) => void;
  onClose: () => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
  onClose
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 mt-2 z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        {suggestions.map((movie) => (
          <button
            key={movie.id}
            onClick={() => {
              onSuggestionClick(movie);
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-12 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {movie.type === 'movie' ? (
                  <Film className="w-4 h-4 text-blue-600" />
                ) : (
                  <Tv className="w-4 h-4 text-purple-600" />
                )}
                <h4 className="font-medium text-gray-900 truncate">{movie.title}</h4>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{movie.year}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{movie.rating}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;