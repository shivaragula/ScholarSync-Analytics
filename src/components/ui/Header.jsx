import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Enrollment',
      path: '/enrollment-overview',
      icon: 'TrendingUp',
      description: 'Student acquisition metrics and enrollment trends'
    },
    {
      label: 'Renewals',
      path: '/renewal-analytics',
      icon: 'RefreshCw',
      description: 'Customer retention analytics and churn management'
    },
    {
      label: 'Revenue',
      path: '/revenue-intelligence',
      icon: 'DollarSign',
      description: 'Financial intelligence and LTV optimization'
    }
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Admin', path: '/admin', icon: 'Shield' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-text-primary">Student Analytics</h1>
              <span className="text-xs text-text-secondary">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
              title={item?.description}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Data Sync Indicator */}
          <div className="hidden lg:flex items-center space-x-2 text-xs text-text-secondary">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live</span>
            <span className="text-text-secondary/60">•</span>
            <span>Updated 2m ago</span>
          </div>

          {/* More Menu - Desktop */}
          <div className="hidden md:block relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
                <div className="py-1">
                  {secondaryItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <div>
                  <div>{item?.label}</div>
                  <div className="text-xs text-text-secondary/80">{item?.description}</div>
                </div>
              </a>
            ))}
            
            <div className="border-t border-border my-2"></div>
            
            {secondaryItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </a>
            ))}
            
            {/* Mobile Data Sync */}
            <div className="flex items-center space-x-2 px-3 py-2 text-xs text-text-secondary">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Live • Updated 2m ago</span>
            </div>
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;