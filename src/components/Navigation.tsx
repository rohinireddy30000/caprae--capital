import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  User, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Search,
  MessageCircle,
  FileText,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface NavigationProps {
  userType: 'buyer' | 'seller' | null;
}

const Navigation: React.FC<NavigationProps> = ({ userType }) => {
  const { user, logout } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: `/dashboard/${userType}`,
      icon: <Home className="w-5 h-5" />
    },
    {
      name: 'Browse',
      href: `/dashboard/${userType}/browse`,
      icon: <Search className="w-5 h-5" />
    },
    {
      name: 'Messages',
      href: `/dashboard/${userType}/messages`,
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      name: 'Deals',
      href: `/dashboard/${userType}/deals`,
      icon: <FileText className="w-5 h-5" />
    },
    {
      name: 'Analytics',
      href: `/dashboard/${userType}/analytics`,
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];

  const handleLogout = () => {
    logout();
    // Redirect to landing page
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={`/dashboard/${userType}`} className="flex items-center">
              <Building2 className="w-8 h-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gradient">Caprae Business</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-neutral-700">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50"
                >
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-neutral-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-200 py-4"
          >
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
