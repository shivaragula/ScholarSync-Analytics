// API Service for backend integration
const getApiBaseUrl = () => {
  // In production, use the same domain as the frontend
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  
  // In development, use the environment variable or localhost
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔧 API Service initialized with base URL:', API_BASE_URL);
console.log('🔧 Environment variables:', {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  NODE_ENV: import.meta.env.NODE_ENV,
  MODE: import.meta.env.MODE
});

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('🔧 ApiService constructor - baseURL:', this.baseURL);
  }

  // Generic fetch wrapper with error handling
  async fetchData(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log('🌐 Making API request to:', url);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });
      
      clearTimeout(timeoutId);

      console.log('📡 API Response status:', response.status, 'for', endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 API Response data for', endpoint, ':', data);
      return data;
    } catch (error) {
      console.error(`❌ API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Enrollment data endpoints
  async getEnrollmentOverview() {
    return this.fetchData('/api/enrollment/overview');
  }

  async getEnrollmentTrends(period = '6months') {
    return this.fetchData(`/api/enrollment/trends?period=${period}`);
  }

  async getEnrollmentsByCategory() {
    return this.fetchData('/api/enrollment/categories');
  }

  async getRecentEnrollments(limit = 50, search = '', status = 'all') {
    const params = new URLSearchParams({
      limit: limit.toString(),
      search,
      status,
    });
    return this.fetchData(`/api/enrollment/recent?${params}`);
  }

  // Revenue data endpoints
  async getRevenueMetrics() {
    return this.fetchData('/api/revenue/metrics');
  }

  async getRevenueChart(period = '6months') {
    return this.fetchData(`/api/revenue/chart?period=${period}`);
  }

  async getRevenueForecast() {
    return this.fetchData('/api/revenue/forecast');
  }

  async getPaymentStatus() {
    return this.fetchData('/api/revenue/payment-status');
  }

  async getLTVRanking() {
    return this.fetchData('/api/revenue/ltv-ranking');
  }

  // Renewal analytics endpoints
  async getRenewalMetrics() {
    return this.fetchData('/api/renewal/metrics');
  }

  async getRenewalTrends(period = '6months') {
    return this.fetchData(`/api/renewal/trends?period=${period}`);
  }

  async getRenewalDistribution() {
    return this.fetchData('/api/renewal/distribution');
  }

  async getPriorityRenewals() {
    return this.fetchData('/api/renewal/priority');
  }

  async getCustomerActivity() {
    return this.fetchData('/api/renewal/customer-activity');
  }

  // Google Sheets integration
  async syncGoogleSheets() {
    return this.fetchData('/api/sync/google-sheets', {
      method: 'POST',
    });
  }

  // Google Sheets data endpoints
  async getAllSheetsData() {
    return this.fetchData('/api/sheets/raw');
  }

  async getStudent(id) {
    return this.fetchData(`/api/students/${id}`);
  }

  async searchStudents(query) {
    return this.fetchData(`/api/students/search?q=${encodeURIComponent(query)}`);
  }

  // Health check
  async healthCheck() {
    try {
      return await this.fetchData('/api/health');
    } catch (error) {
      // If API is not available, return a mock response to prevent blocking
      console.log('🔄 API not available, using fallback mode');
      return {
        status: 'fallback',
        message: 'Using cached/sample data',
        timestamp: new Date().toISOString()
      };
    }
  }
}

export default new ApiService();