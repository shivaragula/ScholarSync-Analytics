import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';

const SimpleDataTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testDirectConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Testing direct connection to backend...');
      
      // Direct fetch without any service layer
      const response = await fetch('http://localhost:8001/api/sheets/raw');
      
      console.log('📡 Response received:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('📊 Data received:', result);
      
      setData(result);
      
    } catch (err) {
      console.error('❌ Direct connection failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testDirectConnection();
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-6 m-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Simple Data Test</h2>
        <Button onClick={testDirectConnection} disabled={loading}>
          {loading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Icon name="RefreshCw" size={16} />
              Test Again
            </>
          )}
        </Button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-4 text-primary" />
          <p>Testing connection...</p>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="XCircle" size={16} className="text-destructive" />
            <span className="font-medium text-destructive">Connection Failed</span>
          </div>
          <p className="text-sm text-destructive">{error}</p>
          
          <div className="mt-4 space-y-2 text-xs text-text-secondary">
            <p><strong>Troubleshooting:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure backend server is running: <code>node test-server.js</code></li>
              <li>Check if port 8001 is available</li>
              <li>Try opening <a href="http://localhost:8001/api/health" target="_blank" className="text-primary underline">http://localhost:8001/api/health</a> directly</li>
              <li>Check browser console for CORS errors</li>
            </ul>
          </div>
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="font-medium text-success">Connection Successful!</span>
            </div>
            <p className="text-sm text-success">
              Loaded {data.data?.length || 0} records from Google Sheets
            </p>
          </div>

          {data.data && data.data.length > 0 && (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b border-border">
                <h3 className="font-medium">Sample Data (First 3 Records)</h3>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3">Student Name</th>
                        <th className="text-left py-2 px-3">Email</th>
                        <th className="text-left py-2 px-3">Course</th>
                        <th className="text-left py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.slice(0, 3).map((item, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="py-2 px-3">{item.studentName || 'N/A'}</td>
                          <td className="py-2 px-3">{item.email || 'N/A'}</td>
                          <td className="py-2 px-3">{item.course || 'N/A'}</td>
                          <td className="py-2 px-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              item.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-text-secondary'
                            }`}>
                              {item.status || 'Unknown'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Raw Data Info</h3>
            <div className="text-xs font-mono">
              <p>Total Records: {data.data?.length || 0}</p>
              <p>Last Sync: {data.metadata?.lastSync || 'N/A'}</p>
              <p>Loading: {data.metadata?.isLoading ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleDataTest;