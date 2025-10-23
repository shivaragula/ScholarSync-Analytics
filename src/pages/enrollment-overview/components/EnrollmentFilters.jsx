import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EnrollmentFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    courseCategory: 'all',
    campus: 'all',
    paymentStatus: 'all',
    autoRefresh: true,
    refreshInterval: '15m'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const campusOptions = [
    { value: 'all', label: 'All Campuses' },
    { value: 'main', label: 'Main Campus' },
    { value: 'north', label: 'North Campus' },
    { value: 'south', label: 'South Campus' },
    { value: 'online', label: 'Online' }
  ];

  const paymentOptions = [
    { value: 'all', label: 'All Payments' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap items-center gap-4">
            <Select
              value={filters.dateRange}
              onValueChange={(value) => handleFilterChange('dateRange', value)}
              options={dateRangeOptions}
              placeholder="Select date range"
              className="w-40"
            />
            
            <Select
              value={filters.courseCategory}
              onValueChange={(value) => handleFilterChange('courseCategory', value)}
              options={categoryOptions}
              placeholder="Select category"
              className="w-40"
            />
            
            <Select
              value={filters.campus}
              onValueChange={(value) => handleFilterChange('campus', value)}
              options={campusOptions}
              placeholder="Select campus"
              className="w-40"
            />
            
            <Select
              value={filters.paymentStatus}
              onValueChange={(value) => handleFilterChange('paymentStatus', value)}
              options={paymentOptions}
              placeholder="Payment status"
              className="w-40"
            />
            
            <Button variant="outline" size="sm" iconName="RotateCcw">
              Reset
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoRefresh"
                checked={filters.autoRefresh}
                onChange={(e) => handleFilterChange('autoRefresh', e.target.checked)}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring"
              />
              <label htmlFor="autoRefresh" className="text-sm text-text-secondary">
                Auto-refresh
              </label>
            </div>
            
            {filters.autoRefresh && (
              <select
                value={filters.refreshInterval}
                onChange={(e) => handleFilterChange('refreshInterval', e.target.value)}
                className="px-3 py-1 text-sm border border-border rounded-md bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="15m">15 min</option>
                <option value="30m">30 min</option>
                <option value="1h">1 hour</option>
              </select>
            )}
            
            <Button variant="default" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentFilters;