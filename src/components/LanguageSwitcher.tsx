import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
        <Globe className="w-4 h-4 text-white/80" />
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="bg-transparent text-white text-sm font-medium border-none outline-none cursor-pointer appearance-none pr-6"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff80' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1rem'
          }}
        >
          <option value="en" className="bg-blue-900 text-white">English</option>
          <option value="ar" className="bg-blue-900 text-white">العربية</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;