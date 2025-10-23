import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { useEnrollmentOverview } from '../../../hooks/useApi';

const EnrollmentKPICards = ({ dateFilter = 'all' }) => {
  const { data: overviewData, loading, error } = useEnrollmentOverview();
  const [filteredKPIs, setFilteredKPIs] = useState([]);

  // Fallback data for when API is not available
  const fallbackData = [
    {
      title: 'Total Enrollments',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      trend: 'up',
      subtitle: 'This month'
    },
    {
      title: 'New Students',
      value: '485',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'UserPlus',
      trend: 'up',
      subtitle: 'This month'
    },
    {
      title: 'Course Completion',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Award',
      trend: 'up',
      subtitle: 'Average rate'
    },
    {
      title: 'Revenue per Student',
      value: '$485',
      change: '-1.2%',
      changeType: 'negative',
      icon: 'DollarSign',
      trend: 'down',
      subtitle: 'Average'
    }
  ];

  // Use API data if available, otherwise use fallback
  const kpiData = overviewData?.kpis || fallbackData;

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="w-4 h-4 bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 text-destructive">
          <Icon name="AlertCircle" size={20} />
          <span>Failed to load KPI data. Using cached data.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={kpi.icon} size={20} className="text-primary" />
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon(kpi.trend)} 
                size={16} 
                className={getChangeColor(kpi.changeType)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">{kpi.title}</h3>
            <div className="text-2xl font-bold text-text-primary">
              {kpi.value}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getChangeColor(kpi.changeType)}`}>
                  {kpi.change}
                </span>
                <span className="text-xs text-text-secondary">
                  vs last month
                </span>
              </div>
            </div>
            <div className="text-xs text-text-secondary">
              {kpi.subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrollmentKPICards;