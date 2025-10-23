import { useState, useEffect } from 'react';

// Custom hook for API calls with environment variable support
export const useApiService = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';
  
  console.log('🔧 API Service Hook - Base URL:', API_BASE_URL);
  
  const fetchData = async (endpoint, options = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log('🌐 Fetching from:', url);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📊 API Response received:', { endpoint, dataKeys: Object.keys(data) });
      
      return data;
    } catch (error) {
      console.error(`❌ API Error (${endpoint}):`, error);
      throw error;
    }
  };
  
  return { fetchData, API_BASE_URL };
};

// Direct Google Sheets data fetching
const fetchGoogleSheetsDirectly = async () => {
  try {
    const csvUrl = import.meta.env.VITE_ENROLLMENT_CSV_URL;
    if (!csvUrl) {
      throw new Error('Google Sheets CSV URL not configured');
    }

    console.log('📊 Fetching data directly from Google Sheets...');
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheets data: ${response.status}`);
    }

    const csvText = await response.text();
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const enrollments = [];
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        enrollments.push({
          id: i,
          studentName: row['Student Name'] || row['Name'] || `Student ${i}`,
          email: row['Email Address'] || row['Email'] || `student${i}@email.com`,
          course: row['Package'] || row['Course'] || 'Unknown Course',
          category: row['Activity'] || row['Category'] || 'General',
          enrollmentDate: row['Start Date'] || row['Enrollment Date'] || new Date().toISOString().split('T')[0],
          status: row['Status'] || 'Active',
          progress: parseInt(row['Progress'] || Math.floor(Math.random() * 100)),
          paymentStatus: (row['Fees Paid Amount'] && row['Fees Paid Amount'] !== '0') ? 'Paid' : 'Pending',
          feesPaid: parseFloat(row['Fees Paid Amount'] || 0),
          phone: row['WhatsApp Phone Number'] || '',
          ...row
        });
      }
    }

    return { enrollments, total: enrollments.length };
  } catch (error) {
    console.error('Error fetching Google Sheets directly:', error);
    throw error;
  }
};

// Specific hooks for enrollment data
export const useEnrollmentData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useApiService();
  
  const loadEnrollmentData = async (limit = 500) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading enrollment data...');
      
      // Try API first, then fallback to direct Google Sheets
      try {
        const result = await fetchData(`/api/enrollment/recent?limit=${limit}`);
        if (result.enrollments && Array.isArray(result.enrollments)) {
          console.log('✅ Enrollment data loaded from API:', result.enrollments.length, 'records');
          setData(result);
          return;
        }
      } catch (apiError) {
        console.log('⚠️ API not available, trying direct Google Sheets access...');
      }
      
      // Fallback to direct Google Sheets
      const result = await fetchGoogleSheetsDirectly();
      if (result.enrollments && Array.isArray(result.enrollments)) {
        console.log('✅ Enrollment data loaded from Google Sheets:', result.enrollments.length, 'records');
        setData(result);
      } else {
        throw new Error('Invalid enrollment data structure');
      }
    } catch (err) {
      console.error('❌ Failed to load enrollment data:', err);
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadEnrollmentData();
  }, []);
  
  return { data, loading, error, reload: loadEnrollmentData };
};