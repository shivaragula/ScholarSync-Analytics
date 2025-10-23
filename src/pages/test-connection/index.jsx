import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import apiService from '../../services/api';

const TestConnection = () => {
  const [status, setStatus] = useState('checking');
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setStatus('checking');
      setError(null);
      const response = await apiService.healthCheck();
      setHealthData(response);
      setStatus('connected');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'error': return 'Connection Failed';
      default: return 'Checking...';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-text-primary mb-6">Connection Test</h1>
          
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Backend API Status</h2>
              <Button onClick={checkConnection} disabled={status === 'checking'}>
                Test Connection
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                status === 'connected' ? 'bg-green-500' : 
                status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className={`font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                <p className="text-red-800 text-sm">Error: {error}</p>
              </div>
            )}

            {healthData && (
              <div className="bg-gray-50 rounded p-4">
                <h3 className="font-medium mb-2">Health Check Response:</h3>
                <pre className="text-sm text-gray-600 overflow-x-auto">
                  {JSON.stringify(healthData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Environment Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">API Base URL:</span>
                <span className="font-mono">{window.location.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Environment:</span>
                <span className="font-mono">{import.meta.env.MODE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Production:</span>
                <span className="font-mono">{import.meta.env.PROD ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConnection;