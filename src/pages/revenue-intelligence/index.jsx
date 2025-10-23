import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import DataSyncIndicator from '../../components/ui/DataSyncIndicator';
import RevenueMetrics from './components/RevenueMetrics';
import RevenueChart from './components/RevenueChart';
import RevenueForecast from './components/RevenueForecast';
import PaymentStatus from './components/PaymentStatus';
import LTVRankingTable from './components/LTVRankingTable';
import Icon from '../../components/AppIcon';

const RevenueIntelligence = () => {
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
              <h1 className="text-2xl font-semibold text-text-primary">Revenue Intelligence</h1>
              <p className="text-sm text-text-secondary mt-1">
                Track revenue performance, forecasting, and payment analytics
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
        {/* Revenue Metrics */}
        <RevenueMetrics />

        {/* Revenue Chart */}
        <RevenueChart />

        {/* Revenue Forecast & Payment Status */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RevenueForecast />
          <PaymentStatus />
        </div>

        {/* LTV Ranking Table */}
        <LTVRankingTable />
      </div>
    </div>
  );
};

export default RevenueIntelligence;