import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Movie, Language } from '../types';
import MovieCard from './MovieCard';

interface RecommendationSectionProps {
  movies: Movie[];
  language: Language;
  onMovieClick: (movie: Movie) => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ 
  movies, 
  language, 
  onMovieClick 
}) => {
  const recommendedMovies = movies.slice(2, 6); // Get different movies for recommendations

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-3xl p-8 mb-12 border border-purple-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'مقترحات لك' : 'Recommended for You'}
            </h2>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'بناءً على تقييماتك واهتماماتك' 
                : 'Based on your ratings and interests'
              }
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors">
          <span>{language === 'ar' ? 'عرض المزيد' : 'View More'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedMovies.map((movie) => (
          <div key={movie.id} className="transform hover:scale-105 transition-transform duration-300">
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;