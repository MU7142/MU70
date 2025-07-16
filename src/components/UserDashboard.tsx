import React from 'react';
import { ArrowLeft, Star, MessageSquare, Calendar, Award, TrendingUp } from 'lucide-react';
import { User, Review, Movie, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface UserDashboardProps {
  user: User;
  userReviews: Review[];
  movies: Movie[];
  language: Language;
  onBack: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, userReviews, movies, language, onBack }) => {
  const getMovieTitle = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    return movie ? movie.title : 'Unknown Movie';
  };

  const averageRating = userReviews.length > 0 
    ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1)
    : '0';

  const totalHelpful = userReviews.reduce((sum, review) => sum + review.helpful, 0);

  const getReviewerLevel = () => {
    if (userReviews.length >= 50) return getTranslation('expert', language);
    if (userReviews.length >= 20) return getTranslation('advanced', language);
    return getTranslation('beginner', language);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{getTranslation('back', language)}</span>
          </button>

          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-white/80">{getTranslation('memberSince', language)} {new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getTranslation('totalReviews', language)}</p>
                <p className="text-2xl font-bold text-gray-900">{userReviews.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getTranslation('averageRating', language)}</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating}/10</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getTranslation('helpfulVotes', language)}</p>
                <p className="text-2xl font-bold text-gray-900">{totalHelpful}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getTranslation('reviewerLevel', language)}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getReviewerLevel()}
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{getTranslation('yourRecentReviews', language)}</h2>
          
          {userReviews.length > 0 ? (
            <div className="space-y-4">
              {userReviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{getMovieTitle(review.movieId)}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          {[...Array(10)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.rating}/10</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{review.helpful} {getTranslation('helpfulVotesCount', language)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{getTranslation('noReviewsYet', language)}</h3>
              <p className="text-gray-500">{getTranslation('startWatching', language)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;