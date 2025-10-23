import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';

const ConnectionDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [testing, setTesting] = useState(false);

  const runDebugTests = async () => {
    setTesting(true);
    const results = {};

    // Check environment variables
    results.env = {
      VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
      NODE_ENV: import.meta.env.NODE_ENV,
      MODE: import.meta.env.MODE
    };

    // Test direct fetch to backend
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';
    
    try {
      console.log('🔍 Testing connection to:', baseUrl);
      
      const response = await fetch(`${baseUrl}/api/health`);
      console.log('📊 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        results.healthCheck = { success: true, data };
        console.log('✅ Health check successful:', data);
      } else {
        results.healthCheck = { success: false, error: `HTTP ${response.status}` };
      }
    } catch (error) {
      results.healthCheck = { success: false, error: error.message };
      console.error('❌ Health check failed:', error);
    }

    // Test Google Sheets endpoint
    try {
      const response = await fetch(`${baseUrl}/api/sheets/raw`);
      if (response.ok) {
        const data = await response.json();
        results.sheetsData = { 
          success: true, 
          recordCount: data.data?.length || 0,
          sampleData: data.data?.slice(0, 2) || []
        };
        console.log('✅ Sheets data successful:', data.data?.length, 'records');
      } else {
        results.sheetsData = { success: false, error: `HTTP ${response.status}` };
      }
    } catch (error) {
      results.sheetsData = { success: false, error: error.message };
      console.error('❌ Sheets data failed:', error);
    }

    // Test CORS
    try {
      const response = await fetch(`${baseUrl}/api/health`, {
        method: 'OPTIONS'
      });
      results.cors = { success: response.ok, status: response.status };
    } catch (error) {
      results.cors = { success: false, error: error.message };
    }

    setDebugInfo(results);
    setTesting(false);
  };

  useEffect(() => {
    runDebugTests();
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-6 m-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Connection Debugger</h2>
        <Button onClick={runDebugTests} disabled={testing} size="sm">
          {testing ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Icon name="RefreshCw" size={16} />
              Retest
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {/* Environment Variables */}
        <div className="border border-border rounded p-3">
          <h3 className="font-medium mb-2 flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Environment Variables
          </h3>
          <div className="bg-muted/50 p-2 rounded text-xs font-mono">
            <pre>{JSON.stringify(debugInfo.env, null, 2)}</pre>
          </div>
        </div>

        {/* Health Check */}
        <div className="border border-border rounded p-3">
          <h3 className="font-medium mb-2 flex items-center">
            <Icon 
              name={debugInfo.healthCheck?.success ? "CheckCircle" : "XCircle"} 
              size={16} 
              className={`mr-2 ${debugInfo.healthCheck?.success ? "text-success" : "text-destructive"}`}
            />
            Backend Health Check
          </h3>
          {debugInfo.healthCheck?.success ? (
            <div className="bg-success/10 p-2 rounded text-xs">
              <p className="text-success mb-1">✅ Backend Connected</p>
              <p className="text-text-secondary">Records: {debugInfo.healthCheck.data?.dataStatus?.totalRecords || 0}</p>
              <p className="text-text-secondary">Last Sync: {debugInfo.healthCheck.data?.dataStatus?.lastSync || 'N/A'}</p>
            </div>
          ) : (
            <div className="bg-destructive/10 p-2 rounded text-xs">
              <p className="text-destructive">❌ {debugInfo.healthCheck?.error || 'Connection failed'}</p>
            </div>
          )}
        </div>

        {/* Google Sheets Data */}
        <div className="border border-border rounded p-3">
          <h3 className="font-medium mb-2 flex items-center">
            <Icon 
              name={debugInfo.sheetsData?.success ? "CheckCircle" : "XCircle"} 
              size={16} 
              className={`mr-2 ${debugInfo.sheetsData?.success ? "text-success" : "text-destructive"}`}
            />
            Google Sheets Data
          </h3>
          {debugInfo.sheetsData?.success ? (
            <div className="bg-success/10 p-2 rounded text-xs">
              <p className="text-success mb-1">✅ Data Loaded: {debugInfo.sheetsData.recordCount} records</p>
              {debugInfo.sheetsData.sampleData?.length > 0 && (
                <div className="mt-2">
                  <p className="text-text-secondary mb-1">Sample data:</p>
                  <pre className="text-xs bg-muted/50 p-2 rounded overflow-x-auto">
                    {JSON.stringify(debugInfo.sheetsData.sampleData[0], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-destructive/10 p-2 rounded text-xs">
              <p className="text-destructive">❌ {debugInfo.sheetsData?.error || 'Data fetch failed'}</p>
            </div>
          )}
        </div>

        {/* CORS Check */}
        <div className="border border-border rounded p-3">
          <h3 className="font-medium mb-2 flex items-center">
            <Icon 
              name={debugInfo.cors?.success ? "CheckCircle" : "XCircle"} 
              size={16} 
              className={`mr-2 ${debugInfo.cors?.success ? "text-success" : "text-destructive"}`}
            />
            CORS Configuration
          </h3>
          {debugInfo.cors?.success ? (
            <div className="bg-success/10 p-2 rounded text-xs">
              <p className="text-success">✅ CORS properly configured</p>
            </div>
          ) : (
            <div className="bg-destructive/10 p-2 rounded text-xs">
              <p className="text-destructive">❌ CORS issue detected</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border border-border rounded p-3">
          <h3 className="font-medium mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open('http://localhost:8001/api/health', '_blank')}
            >
              Open Backend Health
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open('http://localhost:8001/api/sheets/raw', '_blank')}
            >
              View Raw Data
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                console.clear();
                runDebugTests();
              }}
            >
              Clear Console & Retest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDebugger;