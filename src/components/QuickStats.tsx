import React from 'react';
import { Film, Star, Users, TrendingUp, Award, Clock } from 'lucide-react';
import { Movie, Review, User, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface QuickStatsProps {
  movies: Movie[];
  reviews: Review[];
  users: User[];
  language: Language;
}

const QuickStats: React.FC<QuickStatsProps> = ({ movies, reviews, users, language }) => {
  const totalMovies = movies.filter(m => m.type === 'movie').length;
  const totalSeries = movies.filter(m => m.type === 'series').length;
  const avgRating = movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length;
  const totalReviews = reviews.length;
  const totalUsers = users.length;
  const totalWatchTime = movies.reduce((sum, movie) => {
    const duration = parseInt(movie.duration);
    return sum + (isNaN(duration) ? 0 : duration);
  }, 0);

  const stats = [
    {
      icon: Film,
      value: totalMovies,
      label: language === 'ar' ? 'أفلام' : 'Movies',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      value: totalSeries,
      label: language === 'ar' ? 'مسلسلات' : 'TV Series',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Star,
      value: avgRating.toFixed(1),
      label: language === 'ar' ? 'متوسط التقييم' : 'Avg Rating',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Users,
      value: totalUsers,
      label: language === 'ar' ? 'مستخدمون نشطون' : 'Active Users',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Award,
      value: totalReviews,
      label: language === 'ar' ? 'مراجعات' : 'Reviews',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Clock,
      value: `${Math.round(totalWatchTime / 60)}h`,
      label: language === 'ar' ? 'ساعات المحتوى' : 'Content Hours',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-100`}
        >
          <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;