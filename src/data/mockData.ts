import { Movie, Review, User } from '../types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: ['Drama', 'Crime'],
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    synopsis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 9.3,
    reviewCount: 2847,
    duration: '142 min',
    type: 'movie'
  },
  {
    id: '2',
    title: 'Breaking Bad',
    year: 2008,
    genre: ['Crime', 'Drama', 'Thriller'],
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
    poster: 'https://images.pexels.com/photos/7991227/pexels-photo-7991227.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 9.5,
    reviewCount: 1923,
    duration: '47 min',
    type: 'series',
    seasons: 5
  },
  {
    id: '3',
    title: 'Inception',
    year: 2010,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    poster: 'https://images.pexels.com/photos/7991264/pexels-photo-7991264.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 8.8,
    reviewCount: 2134,
    duration: '148 min',
    type: 'movie'
  },
  {
    id: '4',
    title: 'Stranger Things',
    year: 2016,
    genre: ['Drama', 'Fantasy', 'Horror'],
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    synopsis: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
    poster: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 8.7,
    reviewCount: 1567,
    duration: '51 min',
    type: 'series',
    seasons: 4
  },
  {
    id: '5',
    title: 'The Dark Knight',
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    synopsis: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.',
    poster: 'https://images.pexels.com/photos/7991265/pexels-photo-7991265.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 9.0,
    reviewCount: 2756,
    duration: '152 min',
    type: 'movie'
  },
  {
    id: '6',
    title: 'The Crown',
    year: 2016,
    genre: ['Biography', 'Drama', 'History'],
    director: 'Peter Morgan',
    cast: ['Claire Foy', 'Olivia Colman', 'Matt Smith'],
    synopsis: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    poster: 'https://images.pexels.com/photos/7991266/pexels-photo-7991266.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 8.6,
    reviewCount: 1234,
    duration: '58 min',
    type: 'series',
    seasons: 6
  },
  {
    id: '7',
    title: 'Dune',
    year: 2021,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac'],
    synopsis: 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet.',
    poster: 'https://images.pexels.com/photos/7991267/pexels-photo-7991267.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 8.0,
    reviewCount: 1456,
    duration: '155 min',
    type: 'movie'
  },
  {
    id: '8',
    title: 'The Mandalorian',
    year: 2019,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'Jon Favreau',
    cast: ['Pedro Pascal', 'Gina Carano', 'Carl Weathers'],
    synopsis: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    poster: 'https://images.pexels.com/photos/7991268/pexels-photo-7991268.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 8.7,
    reviewCount: 2341,
    duration: '40 min',
    type: 'series',
    seasons: 3
  },
  {
    id: '9',
    title: 'Spider-Man: No Way Home',
    year: 2021,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
    synopsis: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
    poster: 'https://images.pexels.com/photos/7991269/pexels-photo-7991269.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 8.4,
    reviewCount: 3124,
    duration: '148 min',
    type: 'movie'
  },
  {
    id: '10',
    title: 'House of the Dragon',
    year: 2022,
    genre: ['Action', 'Adventure', 'Drama'],
    director: 'Ryan Condal',
    cast: ['Paddy Considine', 'Emma D\'Arcy', 'Matt Smith'],
    synopsis: 'An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.',
    poster: 'https://images.pexels.com/photos/7991270/pexels-photo-7991270.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 8.5,
    reviewCount: 1876,
    duration: '68 min',
    type: 'series',
    seasons: 2
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    movieId: '1',
    userId: '1',
    userName: 'MovieBuff92',
    rating: 10,
    comment: 'An absolute masterpiece. The storytelling, character development, and emotional depth make this one of the greatest films ever made.',
    date: '2024-01-15',
    helpful: 45
  },
  {
    id: '2',
    movieId: '1',
    userId: '2',
    userName: 'CinemaLover',
    rating: 9,
    comment: 'Incredible performances by Tim Robbins and Morgan Freeman. A timeless story about hope and friendship.',
    date: '2024-01-10',
    helpful: 32
  },
  {
    id: '3',
    movieId: '2',
    userId: '3',
    userName: 'SeriesAddict',
    rating: 10,
    comment: 'Breaking Bad redefined television drama. Bryan Cranston\'s transformation is phenomenal.',
    date: '2024-01-12',
    helpful: 67
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'MovieBuff92',
    email: 'moviebuff@email.com',
    joinDate: '2023-06-15',
    reviewCount: 156
  },
  {
    id: '2',
    name: 'CinemaLover',
    email: 'cinema@email.com',
    joinDate: '2023-08-22',
    reviewCount: 89
  },
  {
    id: '3',
    name: 'SeriesAddict',
    email: 'series@email.com',
    joinDate: '2023-09-10',
    reviewCount: 203
  }
];