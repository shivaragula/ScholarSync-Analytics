import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const FilterBridge = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '30d',
    courseCategory: 'all',
    studentType: 'all',
    campus: 'all'
  });

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const courseCategoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'continuing-ed', label: 'Continuing Education' }
  ];

  const studentTypeOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'new', label: 'New Students' },
    { value: 'returning', label: 'Returning Students' },
    { value: 'transfer', label: 'Transfer Students' }
  ];

  const campusOptions = [
    { value: 'all', label: 'All Campuses' },
    { value: 'main', label: 'Main Campus' },
    { value: 'north', label: 'North Campus' },
    { value: 'south', label: 'South Campus' },
    { value: 'online', label: 'Online' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: '30d',
      courseCategory: 'all',
      studentType: 'all',
      campus: 'all'
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all' && value !== '30d')?.length;
  };

  return (
    <div className={`bg-muted/50 border-b border-border ${className}`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Essential Filters - Always Visible */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <Select
                options={dateRangeOptions}
                value={filters?.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                className="w-40"
              />
            </div>

            {/* Desktop: Show more filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <Select
                options={courseCategoryOptions}
                value={filters?.courseCategory}
                onChange={(value) => handleFilterChange('courseCategory', value)}
                className="w-48"
              />
              
              <Select
                options={studentTypeOptions}
                value={filters?.studentType}
                onChange={(value) => handleFilterChange('studentType', value)}
                className="w-44"
              />
              
              <Select
                options={campusOptions}
                value={filters?.campus}
                onChange={(value) => handleFilterChange('campus', value)}
                className="w-40"
              />
            </div>

            {/* Mobile/Tablet: Expand button */}
            <Button
              variant="outline"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={resetFilters}
                className="text-text-secondary hover:text-text-primary"
              >
                Clear
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              className="hidden sm:flex"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Expanded Filters - Mobile/Tablet */}
        {isExpanded && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Course Category"
                options={courseCategoryOptions}
                value={filters?.courseCategory}
                onChange={(value) => handleFilterChange('courseCategory', value)}
              />
              
              <Select
                label="Student Type"
                options={studentTypeOptions}
                value={filters?.studentType}
                onChange={(value) => handleFilterChange('studentType', value)}
              />
              
              <Select
                label="Campus"
                options={campusOptions}
                value={filters?.campus}
                onChange={(value) => handleFilterChange('campus', value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBridge;