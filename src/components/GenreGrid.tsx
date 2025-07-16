import React from 'react';
import { 
  Zap, 
  Heart, 
  Skull, 
  Rocket, 
  Sword, 
  Laugh, 
  Drama,
  Crown,
  Shield,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface GenreGridProps {
  language: Language;
  onGenreSelect: (genre: string) => void;
}

const GenreGrid: React.FC<GenreGridProps> = ({ language, onGenreSelect }) => {
  const genres = [
    {
      name: language === 'ar' ? 'أكشن' : 'Action',
      value: 'action',
      icon: Zap,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: language === 'ar' ? 'رومانسي' : 'Romance',
      value: 'romance',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      name: language === 'ar' ? 'رعب' : 'Horror',
      value: 'horror',
      icon: Skull,
      color: 'from-gray-700 to-gray-800',
      bgColor: 'bg-gray-50'
    },
    {
      name: language === 'ar' ? 'خيال علمي' : 'Sci-Fi',
      value: 'sci-fi',
      icon: Rocket,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: language === 'ar' ? 'إثارة' : 'Thriller',
      value: 'thriller',
      icon: Sword,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: language === 'ar' ? 'كوميديا' : 'Comedy',
      value: 'comedy',
      icon: Laugh,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: language === 'ar' ? 'دراما' : 'Drama',
      value: 'drama',
      icon: Drama,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      name: language === 'ar' ? 'خيال' : 'Fantasy',
      value: 'fantasy',
      icon: Sparkles,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'ar' ? 'استكشف حسب النوع' : 'Explore by Genre'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'اكتشف أفلامك ومسلسلاتك المفضلة من خلال تصفح الأنواع المختلفة'
            : 'Discover your favorite movies and TV shows by browsing different genres'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.value}
            onClick={() => onGenreSelect(genre.value)}
            className={`${genre.bgColor} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-100 group`}
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${genre.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <genre.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{genre.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreGrid;