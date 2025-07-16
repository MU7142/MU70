import { Theme, ThemeConfig } from '../types';

export const themes: Record<Theme, ThemeConfig> = {
  'dark-purple': {
    primary: 'from-purple-900 to-indigo-900',
    secondary: 'from-purple-800 to-indigo-800',
    accent: 'from-purple-600 to-pink-600',
    background: 'bg-gray-900',
    surface: 'bg-gray-800',
    text: 'text-white'
  },
  'blue-cyan': {
    primary: 'from-blue-900 to-cyan-600',
    secondary: 'from-blue-800 to-cyan-500',
    accent: 'from-blue-600 to-cyan-600',
    background: 'bg-gray-50',
    surface: 'bg-white',
    text: 'text-gray-900'
  },
  'green-teal': {
    primary: 'from-green-900 to-teal-900',
    secondary: 'from-green-800 to-teal-800',
    accent: 'from-green-600 to-teal-600',
    background: 'bg-gray-900',
    surface: 'bg-gray-800',
    text: 'text-white'
  },
  'red-orange': {
    primary: 'from-red-900 to-orange-900',
    secondary: 'from-red-800 to-orange-800',
    accent: 'from-red-600 to-orange-600',
    background: 'bg-gray-900',
    surface: 'bg-gray-800',
    text: 'text-white'
  }
};

export const getThemeClasses = (theme: Theme) => themes[theme];