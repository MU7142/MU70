import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Heart, Star, LogOut, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface ProfileDropdownProps {
  currentUser: any;
  language: Language;
  onEditProfile: () => void;
  onAccountSettings: () => void;
  onFavorites: () => void;
  onMyRatings: () => void;
  onSignOut: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  currentUser,
  language,
  onEditProfile,
  onAccountSettings,
  onFavorites,
  onMyRatings,
  onSignOut
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      icon: User,
      label: getTranslation('editProfile', language),
      onClick: onEditProfile,
      color: 'text-blue-600'
    },
    {
      icon: Settings,
      label: getTranslation('accountSettings', language),
      onClick: onAccountSettings,
      color: 'text-gray-600'
    },
    {
      icon: Heart,
      label: getTranslation('favorites', language),
      onClick: onFavorites,
      color: 'text-red-500'
    },
    {
      icon: Star,
      label: getTranslation('myRatings', language),
      onClick: onMyRatings,
      color: 'text-yellow-500'
    },
    {
      icon: LogOut,
      label: getTranslation('signOut', language),
      onClick: onSignOut,
      color: 'text-red-600',
      separator: true
    }
  ];

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 group"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {currentUser.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-medium text-white hidden sm:block">
          {currentUser.name}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-white/80 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{currentUser.name}</p>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.separator && <div className="border-t border-gray-100 my-1" />}
                <button
                  onClick={() => handleItemClick(item.onClick)}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <item.icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform duration-150`} />
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                    {item.label}
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;