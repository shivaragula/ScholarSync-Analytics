import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import DataSyncIndicator from '../../components/ui/DataSyncIndicator';
import EnrollmentFilters from './components/EnrollmentFilters';
import EnrollmentKPICards from './components/EnrollmentKPICards';
import EnrollmentTrendChart from './components/EnrollmentTrendChart';
import CourseCategoryChart from './components/CourseCategoryChart';
import EnrollmentDataTable from './components/EnrollmentDataTable';
import Icon from '../../components/AppIcon';

const EnrollmentOverview = () => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    courseCategory: 'all',
    campus: 'all',
    paymentStatus: 'all',
    autoRefresh: true,
    refreshInterval: '15m'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!filters?.autoRefresh) return;

    const intervalMs = {
      '15m': 15 * 60 * 1000,
      '30m': 30 * 60 * 1000,
      '1h': 60 * 60 * 1000
    }?.[filters?.refreshInterval] || 15 * 60 * 1000;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In a real app, this would trigger data refetch
      console.log('Auto-refreshing enrollment data...');
    }, intervalMs);

    return () => clearInterval(interval);
  }, [filters?.autoRefresh, filters?.refreshInterval]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch with new filters
    console.log('Filters updated:', newFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <div className="p-6">
          {/* Loading Skeleton */}
          <div className="space-y-6">
            {/* Filters Skeleton */}
            <div className="h-20 bg-muted/50 rounded-lg animate-pulse"></div>
            
            {/* KPI Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 })?.map((_, i) => (
                <div key={i} className="h-32 bg-card border border-border rounded-lg animate-pulse"></div>
              ))}
            </div>
            
            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 h-96 bg-card border border-border rounded-lg animate-pulse"></div>
              <div className="h-96 bg-card border border-border rounded-lg animate-pulse"></div>
            </div>
            
            {/* Table Skeleton */}
            <div className="h-96 bg-card border border-border rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      {/* Page Header with Sync Indicator */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">Enrollment Overview</h1>
              <p className="text-sm text-text-secondary mt-1">
                Monitor real-time student acquisition and enrollment performance across all courses
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DataSyncIndicator />
              
              <div className="hidden lg:flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>Last updated: {lastUpdated?.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <EnrollmentFilters onFiltersChange={handleFiltersChange} />
      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* KPI Cards */}
        <EnrollmentKPICards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Trend Chart - Takes 2/3 width on desktop */}
          <div className="xl:col-span-2">
            <EnrollmentTrendChart />
          </div>
          
          {/* Category Chart - Takes 1/3 width on desktop */}
          <div className="xl:col-span-1">
            <CourseCategoryChart />
          </div>
        </div>

        {/* Data Table */}
        <EnrollmentDataTable />

        {/* Quick Actions Footer */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
              <p className="text-sm text-text-secondary">Common enrollment management tasks</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150">
                <Icon name="UserPlus" size={16} />
                <span>Add Enrollment</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-150">
                <Icon name="Upload" size={16} />
                <span>Bulk Import</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-card border border-border text-text-primary rounded-lg hover:bg-muted transition-colors duration-150">
                <Icon name="FileText" size={16} />
                <span>Generate Report</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-card border border-border text-text-primary rounded-lg hover:bg-muted transition-colors duration-150">
                <Icon name="Settings" size={16} />
                <span>Configure</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentOverview;