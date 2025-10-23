import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';
import apiService from '../services/api';

const ConnectionBanner = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        await apiService.healthCheck();
        clearTimeout(timeoutId);
        setIsConnected(true);
        setShowBanner(false);
      } catch (error) {
        console.log('Connection check failed:', error.message);
        setIsConnected(false);
        setShowBanner(true);
      }
    };

    // Delay initial check to let page load first
    const initialTimeout = setTimeout(checkConnection, 2000);
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!showBanner || dismissed || isConnected) {
    return null;
  }

  return (
    <div className="bg-warning/10 border-b border-warning/20 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <div>
            <p className="text-sm font-medium text-text-primary">
              Backend Connection Unavailable
            </p>
            <p className="text-xs text-text-secondary">
              Displaying cached data. Some features may be limited.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
            className="text-xs"
          >
            Retry
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="p-1"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionBanner;