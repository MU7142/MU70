import React from 'react';
import { Star, Clock, Calendar, Play, Heart, Bookmark, Share2 } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group border border-gray-100 relative"
      onClick={() => onClick(movie)}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {movie.type === 'series' ? 'TV Series' : 'Movie'}
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-bold flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span>{movie.rating}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleFavoriteClick}
            className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-black/50 text-white hover:bg-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleBookmarkClick}
            className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
              isBookmarked 
                ? 'bg-blue-500 text-white' 
                : 'bg-black/50 text-white hover:bg-blue-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShareClick}
            className="w-8 h-8 bg-black/50 text-white rounded-full backdrop-blur-sm flex items-center justify-center hover:bg-green-500 transition-all duration-200"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">({movie.reviewCount} reviews)</span>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{movie.year}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
          <Clock className="w-3 h-3" />
          <span>{movie.duration}</span>
          {movie.type === 'series' && movie.seasons && (
            <>
              <span>•</span>
              <span>{movie.seasons} seasons</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre.slice(0, 2).map((genre, index) => (
            <span 
              key={index}
              className="text-xs bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-medium"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {movie.synopsis}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;