import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import FilterBar from './FilterBar';
import { Language, Theme } from '../types';
import { getTranslation } from '../utils/translations';
import { getThemeClasses } from '../utils/theme';

interface CollapsibleFilterProps {
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

const CollapsibleFilter: React.FC<CollapsibleFilterProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeClasses = getThemeClasses(props.theme);

  return (
    <div className={`${themeClasses.surface} rounded-2xl shadow-xl border border-gray-700 mb-8 overflow-hidden`}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 bg-gradient-to-r ${themeClasses.primary} ${themeClasses.text} flex items-center justify-between hover:opacity-90 transition-opacity duration-300`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-white/20 rounded-xl`}>
            <Filter className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">{getTranslation('filters', props.language)}</h3>
            <p className="text-white/70 text-sm">
              {props.language === 'ar' ? 'انقر لإظهار خيارات التصفية' : 'Click to show filter options'}
            </p>
          </div>
        </div>
        <ChevronDown 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Content */}
      <div className={`transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="p-6">
          <FilterBar {...props} />
        </div>
      </div>
    </div>
  );
};

export default CollapsibleFilter;