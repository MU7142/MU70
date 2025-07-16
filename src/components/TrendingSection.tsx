import React from 'react';
import { TrendingUp, Star, Play } from 'lucide-react';
import { Movie, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface TrendingSectionProps {
  movies: Movie[];
  language: Language;
  onMovieClick: (movie: Movie) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ movies, language, onMovieClick }) => {
  const trendingMovies = movies.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'الأكثر رواجاً' : 'Trending Now'}
          </h2>
          <p className="text-gray-600">
            {language === 'ar' ? 'الأفلام والمسلسلات الأكثر مشاهدة هذا الأسبوع' : 'Most watched movies and series this week'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {trendingMovies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="group cursor-pointer relative overflow-hidden rounded-xl bg-gradient-to-t from-black/60 to-transparent"
          >
            <div className="relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Rank Badge */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>

              {/* Movie Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-sm mb-1 line-clamp-1">{movie.title}</h3>
                <div className="flex items-center space-x-2 text-xs">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{movie.rating}</span>
                  <span className="text-white/70">•</span>
                  <span className="text-white/70">{movie.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;