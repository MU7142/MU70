import React from 'react';
import { Play, Star, Calendar, Clock, Info } from 'lucide-react';
import { Movie, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface FeaturedMovieProps {
  movie: Movie;
  language: Language;
  onMovieClick: (movie: Movie) => void;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie, language, onMovieClick }) => {
  return (
    <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden mb-12 group cursor-pointer">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
                {language === 'ar' ? 'مميز' : 'FEATURED'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-6 mb-6 text-white/90">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{movie.rating}</span>
                <span className="text-sm">({movie.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
            </div>
            
            <p className="text-lg text-white/90 mb-8 leading-relaxed line-clamp-3">
              {movie.synopsis}
            </p>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onMovieClick(movie)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>{language === 'ar' ? 'مشاهدة الآن' : 'Watch Now'}</span>
              </button>
              
              <button
                onClick={() => onMovieClick(movie)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-3 transition-all duration-300 border border-white/30"
              >
                <Info className="w-5 h-5" />
                <span>{language === 'ar' ? 'المزيد من المعلومات' : 'More Info'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Genre Tags */}
      <div className="absolute top-6 right-6 flex flex-wrap gap-2">
        {movie.genre.slice(0, 3).map((genre, index) => (
          <span 
            key={index}
            className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovie;