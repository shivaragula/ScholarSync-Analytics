import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const tabs = [
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
    },
    {
      label: 'Google Sheets',
      path: '/google-sheets-data',
      icon: 'Database',
      description: 'Complete Google Sheets data view and management'
    }
  ];

  const isActiveTab = (path) => location?.pathname === path;

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="px-6">
        <nav className="flex space-x-0" role="tablist">
          {tabs?.map((tab, index) => (
            <a
              key={tab?.path}
              href={tab?.path}
              role="tab"
              aria-selected={isActiveTab(tab?.path)}
              className={`relative flex items-center space-x-2 px-8 py-6 text-sm font-medium transition-all duration-150 ease-out border-b-2 ${
                isActiveTab(tab?.path)
                  ? 'text-primary border-primary bg-primary/5' :'text-text-secondary border-transparent hover:text-text-primary hover:border-border'
              }`}
              title={tab?.description}
            >
              <Icon 
                name={tab?.icon} 
                size={16} 
                className={`transition-colors duration-150 ${
                  isActiveTab(tab?.path) ? 'text-primary' : 'text-current'
                }`}
              />
              <span>{tab?.label}</span>
              
              {/* Active indicator */}
              {isActiveTab(tab?.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;