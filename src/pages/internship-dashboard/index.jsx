import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import EnrollmentDashboard from './components/EnrollmentDashboard';
import RenewalDashboard from './components/RenewalDashboard';
import LTVDashboard from './components/LTVDashboard';

const InternshipDashboard = () => {
  const [activeTab, setActiveTab] = useState('enrollment');
  const [dateFilter, setDateFilter] = useState('thisMonth');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const tabs = [
    { id: 'enrollment', label: 'Enrollment Dashboard', icon: 'Users' },
    { id: 'renewal', label: 'Renewal Dashboard', icon: 'RefreshCw' },
    { id: 'ltv', label: 'Customer LTV', icon: 'DollarSign' }
  ];

  const dateFilterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Project Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <div className="px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              📊 Enrollment & Renewal Analytics Dashboard
            </h1>
            <p className="text-text-secondary">
              Comprehensive analytics for student enrollments, renewals, and customer lifetime value
            </p>
            
            {/* Date Filter Controls */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-secondary">Time Period:</span>
              </div>
              
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {dateFilterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {dateFilter === 'custom' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={customDateRange.startDate}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-text-secondary">to</span>
                  <input
                    type="date"
                    value={customDateRange.endDate}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card border-b border-border">
        <div className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'enrollment' && (
            <EnrollmentDashboard 
              dateFilter={dateFilter} 
              customDateRange={customDateRange}
            />
          )}
          {activeTab === 'renewal' && (
            <RenewalDashboard 
              dateFilter={dateFilter} 
              customDateRange={customDateRange}
            />
          )}
          {activeTab === 'ltv' && (
            <LTVDashboard 
              dateFilter={dateFilter} 
              customDateRange={customDateRange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipDashboard;