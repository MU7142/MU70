export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  director: string;
  cast: string[];
  synopsis: string;
  poster: string;
  rating: number;
  reviewCount: number;
  duration: string;
  type: 'movie' | 'series';
  seasons?: number;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  reviewCount: number;
}

export type Language = 'en' | 'ar';

export type Theme = 'dark-purple' | 'blue-cyan' | 'green-teal' | 'red-orange';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}