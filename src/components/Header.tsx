import React, { useState } from 'react';
import { Search, Menu, Film } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileDropdown from './ProfileDropdown';
import SearchSuggestions from './SearchSuggestions';
import { Language, Theme } from '../types';
import { getTranslation } from '../utils/translations';
import { getThemeClasses } from '../utils/theme';

interface HeaderProps {
  currentUser: any;
  movies: any[];
  language: Language;
  theme: Theme;
  onMenuClick: () => void;
  onSearch: (query: string) => void;
  onAuthClick: () => void;
  onSignUpClick: () => void;
  onDashboard: () => void;
  onLanguageChange: (language: Language) => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  movies,
  language, 
  theme,
  onMenuClick,
  onSearch, 
  onAuthClick, 
  onSignUpClick,
  onDashboard,
  onLanguageChange,
  onSignOut
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const themeClasses = getThemeClasses(theme);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 1) {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(value.toLowerCase()) ||
        movie.genre.some((g: string) => g.toLowerCase().includes(value.toLowerCase())) ||
        movie.director.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (movie: any) => {
    setSearchQuery('');
    setShowSuggestions(false);
    // Navigate to movie detail or trigger movie click
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
    console.log('Edit Profile clicked');
  };

  const handleAccountSettings = () => {
    // TODO: Implement account settings functionality
    console.log('Account Settings clicked');
  };

  const handleFavorites = () => {
    // TODO: Implement favorites functionality
    console.log('Favorites clicked');
  };

  const handleMyRatings = () => {
    onDashboard();
  };

  return (
    <header className={`bg-gradient-to-r ${themeClasses.primary} ${themeClasses.text} shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <Film className="h-8 w-8 text-yellow-400 mr-2 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              CineEcho
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={getTranslation('searchPlaceholder', language)}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent focus:bg-white/20 transition-all duration-300 ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
            </form>
            {showSuggestions && (
              <SearchSuggestions
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
                onClose={() => setShowSuggestions(false)}
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
            {currentUser ? (
              <ProfileDropdown
                currentUser={currentUser}
                language={language}
                onEditProfile={handleEditProfile}
                onAccountSettings={handleAccountSettings}
                onFavorites={handleFavorites}
                onMyRatings={handleMyRatings}
                onSignOut={onSignOut}
              />
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onAuthClick}
                  className="text-white hover:text-yellow-400 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-yellow-400/50 whitespace-nowrap"
                >
                  {getTranslation('signIn', language)}
                </button>
                <button
                  onClick={onSignUpClick}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
                >
                  {getTranslation('signUp', language)}
                </button>
              </div>
            )}
          </div>

          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden" />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={getTranslation('searchPlaceholder', language)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </form>
            <div className="space-y-2">
              <div className="mb-4">
                <LanguageSwitcher 
                  currentLanguage={language}
                  onLanguageChange={onLanguageChange}
                />
              </div>
              {currentUser ? (
                <ProfileDropdown
                  currentUser={currentUser}
                  language={language}
                  onEditProfile={handleEditProfile}
                  onAccountSettings={handleAccountSettings}
                  onFavorites={handleFavorites}
                  onMyRatings={handleMyRatings}
                  onSignOut={onSignOut}
                />
              ) : (
                <div className="space-y-2 w-full">
                  <button
                    onClick={onAuthClick}
                    className="w-full text-white hover:text-yellow-400 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-yellow-400/50"
                  >
                    {getTranslation('signIn', language)}
                  </button>
                  <button
                    onClick={onSignUpClick}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all duration-200"
                  >
                    {getTranslation('signUp', language)}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;