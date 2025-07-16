import React from 'react';
import { 
  Home, 
  Film, 
  Tv, 
  Star, 
  Calendar, 
  Bookmark, 
  Settings, 
  X,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Language, Theme } from '../types';
import { getTranslation } from '../utils/translations';
import { getThemeClasses } from '../utils/theme';

interface SidebarProps {
  isOpen: boolean;
  language: Language;
  theme: Theme;
  onClose: () => void;
  onMenuClick: (menu: string) => void;
  onThemeChange: (theme: Theme) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  language, 
  theme,
  onClose, 
  onMenuClick,
  onThemeChange 
}) => {
  const themeClasses = getThemeClasses(theme);

  const menuItems = [
    {
      id: 'home',
      icon: Home,
      label: getTranslation('home', language),
      color: 'text-blue-400'
    },
    {
      id: 'movies',
      icon: Film,
      label: getTranslation('movies', language),
      color: 'text-red-400'
    },
    {
      id: 'series',
      icon: Tv,
      label: getTranslation('tvSeries', language),
      color: 'text-green-400'
    },
    {
      id: 'anime',
      icon: Sparkles,
      label: getTranslation('anime', language),
      color: 'text-pink-400'
    },
    {
      id: 'top-rated',
      icon: Star,
      label: getTranslation('topRated', language),
      color: 'text-yellow-400'
    },
    {
      id: 'new-releases',
      icon: Calendar,
      label: getTranslation('newReleases', language),
      color: 'text-purple-400'
    },
    {
      id: 'watchlist',
      icon: Bookmark,
      label: getTranslation('watchlist', language),
      color: 'text-cyan-400'
    }
  ];

  const themes = [
    { id: 'dark-purple', name: getTranslation('darkPurple', language), colors: 'from-purple-600 to-indigo-600' },
    { id: 'blue-cyan', name: getTranslation('blueCyan', language), colors: 'from-blue-600 to-cyan-600' },
    { id: 'green-teal', name: getTranslation('greenTeal', language), colors: 'from-green-600 to-teal-600' },
    { id: 'red-orange', name: getTranslation('redOrange', language), colors: 'from-red-600 to-orange-600' }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 ${themeClasses.surface} ${themeClasses.text} transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } shadow-2xl`}>
        
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${themeClasses.primary} relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Film className="h-8 w-8 text-yellow-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CineEcho</h2>
              <p className="text-white/70 text-sm">{getTranslation('menu', language)}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onMenuClick(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-gradient-to-r ${themeClasses.secondary} transition-all duration-300 group text-left`}
            >
              <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
              <span className="font-medium group-hover:text-white transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Theme Settings */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold">{getTranslation('theme', language)}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => onThemeChange(themeOption.id as Theme)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  theme === themeOption.id 
                    ? 'border-white bg-gradient-to-r ' + themeOption.colors 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className={`w-full h-4 rounded bg-gradient-to-r ${themeOption.colors} mb-2`} />
                <span className="text-xs font-medium">{themeOption.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 CineEcho</p>
            <p className="text-xs mt-1">v1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;