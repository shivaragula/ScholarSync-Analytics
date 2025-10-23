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
      const result = await fetchData(`/api/enrollment/recent?limit=${limit}`);
      
      if (result.enrollments && Array.isArray(result.enrollments)) {
        console.log('✅ Enrollment data loaded:', result.enrollments.length, 'records');
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