import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CollapsibleFilter from './components/CollapsibleFilter';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import TrendingSection from './components/TrendingSection';
import FeaturedMovie from './components/FeaturedMovie';
import QuickStats from './components/QuickStats';
import GenreGrid from './components/GenreGrid';
import RecommendationSection from './components/RecommendationSection';
import NewsSection from './components/NewsSection';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import { Movie, Review, User, Language, Theme } from './types';
import { mockMovies, mockReviews, mockUsers } from './data/mockData';
import { getTranslation } from './utils/translations';
import { getThemeClasses } from './utils/theme';

type View = 'home' | 'movie-detail' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(mockMovies);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark-purple');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');

  // Filter states
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const themeClasses = getThemeClasses(theme);

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...movies];

    // Menu-based filtering
    if (activeMenu === 'movies') {
      filtered = filtered.filter(movie => movie.type === 'movie');
    } else if (activeMenu === 'series') {
      filtered = filtered.filter(movie => movie.type === 'series');
    } else if (activeMenu === 'anime') {
      filtered = filtered.filter(movie => 
        movie.genre.some(g => g.toLowerCase().includes('anime')) ||
        movie.title.toLowerCase().includes('anime')
      );
    } else if (activeMenu === 'top-rated') {
      filtered = filtered.filter(movie => movie.rating >= 8.5);
    } else if (activeMenu === 'new-releases') {
      filtered = filtered.filter(movie => movie.year >= 2022);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === selectedGenre)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(movie => movie.type === selectedType);
    }

    // Year filter
    if (selectedYear !== 'all') {
      if (selectedYear.includes('s')) {
        // Decade filtering
        const decade = parseInt(selectedYear.replace('s', ''));
        filtered = filtered.filter(movie => {
          const movieYear = movie.year;
          return movieYear >= decade && movieYear < decade + 10;
        });
      } else if (selectedYear !== 'all') {
        filtered = filtered.filter(movie => movie.year.toString() === selectedYear);
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  }, [movies, searchQuery, selectedGenre, selectedType, selectedYear, sortBy, activeMenu]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentView('movie-detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedMovie(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, validate credentials
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsAuthModalOpen(false);
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock registration - in real app, validate and save to backend
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      joinDate: new Date().toISOString().split('T')[0],
      reviewCount: 0
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const handleAddReview = (movieId: string, rating: number, comment: string) => {
    if (!currentUser) return;

    const newReview: Review = {
      id: Date.now().toString(),
      movieId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews([...reviews, newReview]);

    // Update movie rating and review count
    setMovies(prevMovies =>
      prevMovies.map(movie => {
        if (movie.id === movieId) {
          const movieReviews = [...reviews, newReview].filter(r => r.movieId === movieId);
          const avgRating = movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
          return {
            ...movie,
            rating: Number(avgRating.toFixed(1)),
            reviewCount: movieReviews.length
          };
        }
        return movie;
      })
    );

    // Update user review count
    setCurrentUser(prev => prev ? { ...prev, reviewCount: prev.reviewCount + 1 } : null);
  };

  const userReviews = currentUser ? reviews.filter(r => r.userId === currentUser.id) : [];

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleSignInClick = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setSelectedGenre('all');
    setSelectedType('all');
    setSelectedYear('all');
    setSearchQuery('');
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'movie-detail':
        return selectedMovie && (
          <MovieDetail
            movie={selectedMovie}
            reviews={reviews}
            currentUser={currentUser}
            language={language}
            onBack={handleBackToHome}
            onAddReview={handleAddReview}
          />
        );
      case 'dashboard':
        return currentUser && (
          <UserDashboard
            user={currentUser}
            userReviews={userReviews}
            movies={movies}
            language={language}
            onBack={handleBackToHome}
          />
        );
      default:
        return (
          <div className={`min-h-screen ${themeClasses.background} ${language === 'ar' ? 'font-arabic' : ''}`}>
            {/* Hero Section */}
            <div className={`bg-gradient-to-br ${themeClasses.primary} ${themeClasses.text} relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    {getTranslation('heroTitle', language)}
                    <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      {getTranslation('heroSubtitle', language)}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                    {getTranslation('heroDescription', language)}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Quick Stats */}
              <QuickStats 
                movies={movies}
                reviews={reviews}
                users={users}
                language={language}
              />

              {/* Featured Movie */}
              <FeaturedMovie 
                movie={movies[0]}
                language={language}
                onMovieClick={handleMovieClick}
              />

              {/* Trending Section */}
              <TrendingSection 
                movies={movies}
                language={language}
                onMovieClick={handleMovieClick}
              />

              {/* Genre Grid */}
              <GenreGrid 
                language={language}
                onGenreSelect={handleGenreSelect}
              />

              {/* Recommendations Section */}
              <RecommendationSection 
                movies={movies}
                language={language}
                onMovieClick={handleMovieClick}
              />

              {/* News Section */}
              <NewsSection language={language} />

              <CollapsibleFilter
                selectedGenre={selectedGenre}
                selectedType={selectedType}
                selectedYear={selectedYear}
                sortBy={sortBy}
                language={language}
                theme={theme}
                onGenreChange={setSelectedGenre}
                onTypeChange={setSelectedType}
                onYearChange={setSelectedYear}
                onSortChange={setSortBy}
              />

              {/* Results Info */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
                    {searchQuery 
                      ? `${getTranslation('searchResults', language)} "${searchQuery}"` 
                      : getTranslation('popularMovies', language)
                    }
                  </h2>
                  <p className={`${themeClasses.text} opacity-70 mt-1`}>
                    {getTranslation('showing', language)} {filteredMovies.length} {getTranslation('of', language)} {movies.length} {getTranslation('titles', language)}
                  </p>
                </div>
              </div>

              {/* Movies Grid */}
              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={handleMovieClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className={`w-32 h-32 bg-gradient-to-br ${themeClasses.surface} rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner`}>
                    <Film className={`w-16 h-16 ${themeClasses.text} opacity-50`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>{getTranslation('noMoviesFound', language)}</h3>
                  <p className={`${themeClasses.text} opacity-70`}>{getTranslation('adjustFilters', language)}</p>
                  <button 
                    onClick={() => {
                      setSelectedGenre('all');
                      setSelectedType('all');
                      setSelectedYear('all');
                      setSearchQuery('');
                      setActiveMenu('home');
                    }}
                    className={`mt-4 bg-gradient-to-r ${themeClasses.accent} text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-200`}
                  >
                    {language === 'ar' ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} ${language === 'ar' ? 'font-arabic' : ''}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        language={language}
        theme={theme}
        onClose={() => setIsSidebarOpen(false)}
        onMenuClick={handleMenuClick}
        onThemeChange={setTheme}
      />
      
      <div className="w-full">
        <Header
          currentUser={currentUser}
          movies={movies}
          language={language}
          theme={theme}
          onMenuClick={() => setIsSidebarOpen(true)}
          onSearch={handleSearch}
          onAuthClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
          onDashboard={() => setCurrentView('dashboard')}
          onLanguageChange={handleLanguageChange}
          onSignOut={handleSignOut}
        />
        
        {renderContent()}

        <AuthModal
          isOpen={isAuthModalOpen}
          language={language}
          initialMode={authModalMode}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    </div>
  );
}

export default App;