import React from 'react';
import { Filter, SlidersHorizontal, Calendar, Star, TrendingUp, Film } from 'lucide-react';
import { Language, Theme } from '../types';
import { getTranslation } from '../utils/translations';
import { getThemeClasses } from '../utils/theme';

interface FilterBarProps {
  selectedGenre: string;
  selectedType: string;
  selectedYear: string;
  sortBy: string;
  language: Language;
  theme: Theme;
  onGenreChange: (genre: string) => void;
  onTypeChange: (type: string) => void;
  onYearChange: (year: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedGenre,
  selectedType,
  selectedYear,
  sortBy,
  language,
  theme,
  onGenreChange,
  onTypeChange,
  onYearChange,
  onSortChange
}) => {
  const themeClasses = getThemeClasses(theme);

  const genres = [
    { value: 'all', label: language === 'ar' ? 'جميع الأنواع' : 'All Genres' },
    { value: 'action', label: language === 'ar' ? 'أكشن' : 'Action' },
    { value: 'drama', label: language === 'ar' ? 'دراما' : 'Drama' },
    { value: 'comedy', label: language === 'ar' ? 'كوميديا' : 'Comedy' },
    { value: 'thriller', label: language === 'ar' ? 'إثارة' : 'Thriller' },
    { value: 'sci-fi', label: language === 'ar' ? 'خيال علمي' : 'Sci-Fi' },
    { value: 'horror', label: language === 'ar' ? 'رعب' : 'Horror' },
    { value: 'romance', label: language === 'ar' ? 'رومانسي' : 'Romance' },
    { value: 'fantasy', label: language === 'ar' ? 'خيال' : 'Fantasy' },
    { value: 'crime', label: language === 'ar' ? 'جريمة' : 'Crime' }
  ];

  const types = [
    { value: 'all', label: getTranslation('allTypes', language) },
    { value: 'movie', label: getTranslation('movies', language) },
    { value: 'series', label: getTranslation('tvSeries', language) }
  ];

  const years = [
    { value: 'all', label: language === 'ar' ? 'جميع السنوات' : 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2010s', label: language === 'ar' ? '2010-2019' : '2010s' },
    { value: '2000s', label: language === 'ar' ? '2000-2009' : '2000s' },
    { value: '1990s', label: language === 'ar' ? '1990-1999' : '1990s' }
  ];

  const sortOptions = [
    { value: 'rating', label: getTranslation('highestRated', language), icon: Star },
    { value: 'year', label: getTranslation('newestFirst', language), icon: Calendar },
    { value: 'title', label: language === 'ar' ? 'أبجدياً' : 'A-Z', icon: SlidersHorizontal },
    { value: 'reviews', label: getTranslation('mostReviewed', language), icon: TrendingUp }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Genre Filter */}
        <div className="space-y-2">
          <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
            <Film className="w-4 h-4 inline mr-2 text-purple-400" />
            {getTranslation('genre', language)}
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className={`w-full p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeClasses.surface} ${themeClasses.text} hover:opacity-90 transition-all duration-200 font-medium`}
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
            <SlidersHorizontal className="w-4 h-4 inline mr-2 text-pink-400" />
            {getTranslation('type', language)}
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className={`w-full p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${themeClasses.surface} ${themeClasses.text} hover:opacity-90 transition-all duration-200 font-medium`}
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
            <Calendar className="w-4 h-4 inline mr-2 text-cyan-400" />
            {getTranslation('year', language)}
          </label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className={`w-full p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${themeClasses.surface} ${themeClasses.text} hover:opacity-90 transition-all duration-200 font-medium`}
          >
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
            <TrendingUp className="w-4 h-4 inline mr-2 text-yellow-400" />
            {getTranslation('sortBy', language)}
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={`w-full p-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${themeClasses.surface} ${themeClasses.text} hover:opacity-90 transition-all duration-200 font-medium`}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-6 pt-4 border-t border-gray-600">
        <div className="flex flex-wrap gap-2">
          {selectedGenre !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {genres.find(g => g.value === selectedGenre)?.label}
              <button
                onClick={() => onGenreChange('all')}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {selectedType !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
              {types.find(t => t.value === selectedType)?.label}
              <button
                onClick={() => onTypeChange('all')}
                className="ml-2 text-pink-600 hover:text-pink-800"
              >
                ×
              </button>
            </span>
          )}
          {selectedYear !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
              {years.find(y => y.value === selectedYear)?.label}
              <button
                onClick={() => onYearChange('all')}
                className="ml-2 text-cyan-600 hover:text-cyan-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;