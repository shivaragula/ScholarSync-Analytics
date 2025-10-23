import React, { useState } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';
import apiService from '../services/api';

const DataSyncButton = ({ onSyncComplete }) => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const handleSync = async () => {
    try {
      setSyncing(true);
      await apiService.syncGoogleSheets();
      setLastSync(new Date());
      if (onSyncComplete) {
        onSyncComplete();
      }
    } catch (error) {
      console.error('Sync failed:', error);
      // You could add a toast notification here
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Button
        onClick={handleSync}
        disabled={syncing}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Icon 
          name={syncing ? "Loader2" : "RefreshCw"} 
          size={16} 
          className={syncing ? "animate-spin" : ""} 
        />
        <span>{syncing ? 'Syncing...' : 'Sync Data'}</span>
      </Button>
      
      {lastSync && (
        <span className="text-xs text-text-secondary">
          Last synced: {lastSync.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export default DataSyncButton;