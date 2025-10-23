import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EnrollmentFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    courseCategory: 'all',
    campus: 'all',
    paymentStatus: 'all',
    autoRefresh: true,
    refreshInterval: '15m'
  });

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const courseCategoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'continuing-ed', label: 'Continuing Education' }
  ];

  const campusOptions = [
    { value: 'all', label: 'All Campuses' },
    { value: 'main', label: 'Main Campus' },
    { value: 'north', label: 'North Campus' },
    { value: 'south', label: 'South Campus' },
    { value: 'online', label: 'Online' }
  ];

  const paymentStatusOptions = [
    { value: 'all', label: 'All Payments' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const refreshIntervalOptions = [
    { value: '15m', label: '15 minutes' },
    { value: '30m', label: '30 minutes' },
    { value: '1h', label: '1 hour' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '30d',
      courseCategory: 'all',
      campus: 'all',
      paymentStatus: 'all',
      autoRefresh: true,
      refreshInterval: '15m'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters)?.filter(([key, value]) => {
      if (key === 'autoRefresh' || key === 'refreshInterval') return false;
      return value !== 'all' && value !== '30d';
    })?.length;
  };

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Primary Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <Select
                options={dateRangeOptions}
                value={filters?.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                className="w-40"
              />
            </div>

            <Select
              options={courseCategoryOptions}
              value={filters?.courseCategory}
              onChange={(value) => handleFilterChange('courseCategory', value)}
              className="w-48"
            />

            <Select
              options={campusOptions}
              value={filters?.campus}
              onChange={(value) => handleFilterChange('campus', value)}
              className="w-40"
            />

            <Select
              options={paymentStatusOptions}
              value={filters?.paymentStatus}
              onChange={(value) => handleFilterChange('paymentStatus', value)}
              className="w-40"
            />
          </div>

          {/* Actions & Auto-refresh */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Auto-refresh Controls */}
            <div className="flex items-center space-x-3 px-3 py-2 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFilterChange('autoRefresh', !filters?.autoRefresh)}
                  className={`flex items-center justify-center w-4 h-4 rounded border-2 transition-colors duration-150 ${
                    filters?.autoRefresh
                      ? 'bg-primary border-primary' :'border-border hover:border-primary'
                  }`}
                >
                  {filters?.autoRefresh && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </button>
                <span className="text-sm text-text-secondary">Auto-refresh</span>
              </div>
              
              {filters?.autoRefresh && (
                <Select
                  options={refreshIntervalOptions}
                  value={filters?.refreshInterval}
                  onChange={(value) => handleFilterChange('refreshInterval', value)}
                  className="w-28"
                />
              )}
            </div>

            {/* Filter Actions */}
            <div className="flex items-center space-x-2">
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={resetFilters}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Clear ({getActiveFiltersCount()})
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Date Presets - Mobile Friendly */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { key: 'today', label: 'Today', icon: 'Calendar' },
            { key: 'yesterday', label: 'Yesterday', icon: 'CalendarDays' },
            { key: '7d', label: '7 Days', icon: 'CalendarRange' },
            { key: '30d', label: '30 Days', icon: 'CalendarRange' }
          ]?.map((preset) => (
            <button
              key={preset?.key}
              onClick={() => handleFilterChange('dateRange', preset?.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                filters?.dateRange === preset?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-text-secondary hover:text-text-primary hover:bg-muted border border-border'
              }`}
            >
              <Icon name={preset?.icon} size={14} />
              <span>{preset?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentFilters;