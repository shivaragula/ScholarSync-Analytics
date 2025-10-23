import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import DataSyncIndicator from '../../components/ui/DataSyncIndicator';
import RenewalMetrics from './components/RenewalMetrics';
import RenewalTrend from './components/RenewalTrend';
import RenewalDistribution from './components/RenewalDistribution';
import PriorityRenewal from './components/PriorityRenewal';
import CustomerActivity from './components/CustomerActivity';
import Icon from '../../components/AppIcon';

const RenewalAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <div className="p-6">
          <div className="space-y-6">
            <div className="h-20 bg-muted/50 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-card border border-border rounded-lg animate-pulse"></div>
              ))}
            </div>
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
      
      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">Renewal Analytics</h1>
              <p className="text-sm text-text-secondary mt-1">
                Monitor student renewal patterns and predict future renewals
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DataSyncIndicator />
              <div className="hidden lg:flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>Last updated: {lastUpdated.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Renewal Metrics */}
        <RenewalMetrics />

        {/* Renewal Trend Chart */}
        <RenewalTrend />

        {/* Renewal Distribution & Priority Renewals */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RenewalDistribution />
          <PriorityRenewal />
        </div>

        {/* Customer Activity */}
        <CustomerActivity />
      </div>
    </div>
  );
};

export default RenewalAnalytics;