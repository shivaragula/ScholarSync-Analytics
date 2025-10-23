import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

// Custom hook for API data fetching with loading states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('API Hook Error:', err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// Specific hooks for different data types
export const useEnrollmentOverview = () => {
  return useApi(() => apiService.getEnrollmentOverview());
};

export const useEnrollmentTrends = (period = '6months') => {
  return useApi(() => apiService.getEnrollmentTrends(period), [period]);
};

export const useEnrollmentCategories = () => {
  return useApi(() => apiService.getEnrollmentsByCategory());
};

export const useRecentEnrollments = (limit = 50, search = '', status = 'all') => {
  return useApi(() => apiService.getRecentEnrollments(limit, search, status), [limit, search, status]);
};

export const useRevenueMetrics = () => {
  return useApi(() => apiService.getRevenueMetrics());
};

export const useRevenueChart = (period = '6months') => {
  return useApi(() => apiService.getRevenueChart(period), [period]);
};

export const useRevenueForecast = () => {
  return useApi(() => apiService.getRevenueForecast());
};

export const usePaymentStatus = () => {
  return useApi(() => apiService.getPaymentStatus());
};

export const useLTVRanking = () => {
  return useApi(() => apiService.getLTVRanking());
};

export const useRenewalMetrics = () => {
  return useApi(() => apiService.getRenewalMetrics());
};

export const useRenewalTrends = (period = '6months') => {
  return useApi(() => apiService.getRenewalTrends(period), [period]);
};

export const useRenewalDistribution = () => {
  return useApi(() => apiService.getRenewalDistribution());
};

export const usePriorityRenewals = () => {
  return useApi(() => apiService.getPriorityRenewals());
};

export const useCustomerActivity = () => {
  return useApi(() => apiService.getCustomerActivity());
};