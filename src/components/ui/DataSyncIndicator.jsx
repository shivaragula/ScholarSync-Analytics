import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import apiService from '../../services/api';

const DataSyncIndicator = ({ className = '' }) => {
  const [syncStatus, setSyncStatus] = useState('connected');
  const [lastSync, setLastSync] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Check backend connection and sync status
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await apiService.healthCheck();
        setSyncStatus('connected');
        setLastSync(new Date());
      } catch (error) {
        setSyncStatus('error');
        console.warn('Backend connection failed, using fallback data');
      }
    };

    // Initial check
    checkConnection();

    // Check every 2 minutes
    const interval = setInterval(checkConnection, 120000);

    return () => clearInterval(interval);
  }, []);

  const getTimeSinceLastSync = () => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - lastSync) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1m ago';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1h ago';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return 'Over 24h ago';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setSyncStatus('syncing');
    
    try {
      await apiService.syncGoogleSheets();
      setLastSync(new Date());
      setSyncStatus('connected');
    } catch (error) {
      setSyncStatus('error');
      console.error('Sync failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusConfig = () => {
    switch (syncStatus) {
      case 'connected':
        return {
          icon: 'Wifi',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'Live',
          description: 'Real-time data synchronization active'
        };
      case 'syncing':
        return {
          icon: 'RefreshCw',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Syncing',
          description: 'Updating data from Google Sheets'
        };
      case 'error':
        return {
          icon: 'WifiOff',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'Error',
          description: 'Connection issue - data may be outdated'
        };
      default:
        return {
          icon: 'Wifi',
          color: 'text-text-secondary',
          bgColor: 'bg-muted',
          label: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const status = getStatusConfig();

  return (
    <div className={`relative ${className}`}>
      <div 
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Status Indicator */}
        <div className={`flex items-center justify-center w-6 h-6 rounded-full ${status?.bgColor}`}>
          <Icon 
            name={status?.icon} 
            size={12} 
            className={`${status?.color} ${syncStatus === 'syncing' || isRefreshing ? 'animate-spin' : ''}`}
          />
        </div>

        {/* Status Text - Desktop */}
        <div className="hidden lg:flex flex-col">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-medium ${status?.color}`}>
              {status?.label}
            </span>
            <span className="text-xs text-text-secondary">•</span>
            <span className="text-xs text-text-secondary">
              {getTimeSinceLastSync()}
            </span>
          </div>
        </div>

        {/* Status Text - Mobile */}
        <div className="lg:hidden">
          <span className={`text-xs font-medium ${status?.color}`}>
            {status?.label}
          </span>
        </div>

        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`p-1 h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`}
        />
      </div>
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-popover border border-border rounded-lg shadow-modal z-50">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={status?.icon} size={14} className={status?.color} />
              <span className="text-sm font-medium text-text-primary">
                Data Synchronization
              </span>
            </div>
            
            <p className="text-xs text-text-secondary">
              {status?.description}
            </p>
            
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Last updated:</span>
                <span className="text-text-primary font-medium">
                  {lastSync?.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              
              <div className="flex justify-between text-xs mt-1">
                <span className="text-text-secondary">Source:</span>
                <span className="text-text-primary">Google Sheets</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={handleRefresh}
              disabled={isRefreshing}
              fullWidth
              className="mt-2"
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSyncIndicator;