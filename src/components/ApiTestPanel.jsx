import React, { useState } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';
import apiService from '../services/api';

const ApiTestPanel = () => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const results = {};

    // Test 1: Health Check
    try {
      const health = await apiService.healthCheck();
      results.health = { success: true, data: health };
    } catch (error) {
      results.health = { success: false, error: error.message };
    }

    // Test 2: Google Sheets Raw Data
    try {
      const sheets = await apiService.fetchData('/api/sheets/raw');
      results.sheets = { success: true, data: sheets };
    } catch (error) {
      results.sheets = { success: false, error: error.message };
    }

    // Test 3: Debug Sheets URL
    try {
      const debug = await apiService.fetchData('/api/debug/sheets-url');
      results.debug = { success: true, data: debug };
    } catch (error) {
      results.debug = { success: false, error: error.message };
    }

    // Test 4: Raw CSV
    try {
      const csv = await apiService.fetchData('/api/debug/raw-csv');
      results.csv = { success: true, data: csv };
    } catch (error) {
      results.csv = { success: false, error: error.message };
    }

    setTestResults(results);
    setTesting(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 m-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">API Connection Test</h2>
        <Button onClick={runTests} disabled={testing}>
          {testing ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Icon name="Play" size={16} />
              Run Tests
            </>
          )}
        </Button>
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="space-y-4">
          {Object.entries(testResults).map(([test, result]) => (
            <div key={test} className="border border-border rounded p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={result.success ? "CheckCircle" : "XCircle"} 
                  size={16} 
                  className={result.success ? "text-success" : "text-destructive"} 
                />
                <span className="font-medium capitalize">{test} Test</span>
              </div>
              
              {result.success ? (
                <div className="bg-success/10 p-2 rounded text-xs">
                  <pre className="text-success overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="bg-destructive/10 p-2 rounded text-xs">
                  <span className="text-destructive">{result.error}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiTestPanel;