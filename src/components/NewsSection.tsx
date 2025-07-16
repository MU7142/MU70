import React from 'react';
import { Newspaper, Clock, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface NewsSectionProps {
  language: Language;
}

const NewsSection: React.FC<NewsSectionProps> = ({ language }) => {
  const news = [
    {
      id: 1,
      title: language === 'ar' 
        ? 'أفضل 10 أفلام لعام 2024' 
        : 'Top 10 Movies of 2024',
      excerpt: language === 'ar'
        ? 'اكتشف أفضل الأفلام التي حققت نجاحاً باهراً هذا العام'
        : 'Discover the best movies that achieved tremendous success this year',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: language === 'ar'
        ? 'مسلسلات جديدة تستحق المشاهدة'
        : 'New Series Worth Watching',
      excerpt: language === 'ar'
        ? 'قائمة بأحدث المسلسلات التي لا يجب تفويتها'
        : 'A list of the latest series you shouldn\'t miss',
      date: '2024-01-12',
      image: 'https://images.pexels.com/photos/7991227/pexels-photo-7991227.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: language === 'ar'
        ? 'نصائح لاختيار الفيلم المناسب'
        : 'Tips for Choosing the Right Movie',
      excerpt: language === 'ar'
        ? 'كيف تختار الفيلم المثالي لمزاجك ووقتك'
        : 'How to choose the perfect movie for your mood and time',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/7991264/pexels-photo-7991264.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'أخبار السينما' : 'Cinema News'}
            </h2>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'آخر الأخبار والمقالات في عالم السينما' 
                : 'Latest news and articles in the world of cinema'
              }
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors">
          <span>{language === 'ar' ? 'جميع الأخبار' : 'All News'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((article) => (
          <article
            key={article.id}
            className="group cursor-pointer bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                <Clock className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {article.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;