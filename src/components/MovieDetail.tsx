import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Calendar, Users, Award, MessageCircle, ThumbsUp, Edit2 } from 'lucide-react';
import { Movie, Review, Language } from '../types';
import RatingStars from './RatingStars';
import { getTranslation } from '../utils/translations';

interface MovieDetailProps {
  movie: Movie;
  reviews: Review[];
  currentUser: any;
  language: Language;
  onBack: () => void;
  onAddReview: (movieId: string, rating: number, comment: string) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ 
  movie, 
  reviews, 
  currentUser, 
  language,
  onBack, 
  onAddReview 
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating > 0 && userComment.trim() && currentUser) {
      onAddReview(movie.id, userRating, userComment);
      setUserRating(0);
      setUserComment('');
      setShowReviewForm(false);
    }
  };

  const movieReviews = reviews.filter(review => review.movieId === movie.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{getTranslation('backToMovies', language)}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                  {movie.type === 'series' && movie.seasons && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{movie.seasons} seasons</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold">{movie.rating}</span>
                  <span className="text-white/80">({movie.reviewCount} reviews)</span>
                </div>
                {currentUser && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>{getTranslation('writeReview', language)}</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre, index) => (
                  <span 
                    key={index}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-white/90 text-lg leading-relaxed">
                {movie.synopsis}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {getTranslation('overview', language)}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {getTranslation('reviews', language)} ({movieReviews.length})
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{getTranslation('synopsis', language)}</h3>
                <p className="text-gray-700 leading-relaxed">{movie.synopsis}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{getTranslation('details', language)}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">{getTranslation('director', language)}</span>
                    <p className="text-gray-900">{movie.director}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">{getTranslation('cast', language)}</span>
                    <p className="text-gray-900">{movie.cast.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">{getTranslation('genres', language)}</span>
                    <p className="text-gray-900">{movie.genre.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Review Form */}
            {showReviewForm && currentUser && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{getTranslation('writeAReview', language)}</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getTranslation('yourRating', language)}
                    </label>
                    <RatingStars
                      rating={userRating}
                      onRatingChange={setUserRating}
                      interactive={true}
                      size="lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getTranslation('yourReview', language)}
                    </label>
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={getTranslation('shareThoughts', language)}
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {getTranslation('submitReview', language)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {getTranslation('cancel', language)}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {movieReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        <RatingStars rating={review.rating} interactive={false} size="sm" />
                      </div>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{review.helpful}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{getTranslation('reply', language)}</span>
                    </button>
                  </div>
                </div>
              ))}

              {movieReviews.length === 0 && (
                <div className="text-center py-12">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{getTranslation('noReviewsYet', language)}</h3>
                  <p className="text-gray-500">{getTranslation('beFirstToReview', language)} {movie.type}!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;