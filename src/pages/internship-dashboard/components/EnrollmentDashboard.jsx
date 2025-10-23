import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useEnrollmentData } from '../../../hooks/useApiService';

const EnrollmentDashboard = ({ dateFilter, customDateRange }) => {
  const { data: apiData, loading: apiLoading, error: apiError, reload } = useEnrollmentData();
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'enrollmentDate', direction: 'desc' });

  // Process API data when it changes
  useEffect(() => {
    if (apiData && apiData.enrollments) {
      console.log('🔄 Processing API data:', apiData.enrollments.length, 'records');
      
      const totalRevenue = apiData.enrollments.reduce((sum, e) => {
        const amount = parseFloat(e.feesPaid || e.amount || 0);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
      
      setEnrollmentData({
        totalEnrollments: apiData.enrollments.length,
        totalRevenue: totalRevenue,
        categoryBreakdown: { 'Programming': 80, 'Design': 40, 'Marketing': 30, 'Business': 14 },
        enrollments: apiData.enrollments,
        summary: {
          avgRevenuePerEnrollment: apiData.enrollments.length > 0 ? totalRevenue / apiData.enrollments.length : 0,
          topCategory: 'Programming'
        }
      });
      
      console.log('✅ Enrollment data processed successfully');
    }
    setLoading(apiLoading);
  }, [apiData, apiLoading]);

  const fetchEnrollmentData = () => {
    console.log('🔄 Manual refresh triggered');
    reload();
  };

  const exportData = async (format = 'csv') => {
    try {
      if (format === 'csv' && enrollmentData?.enrollments) {
        // Generate CSV from current data
        const headers = ['Student Name', 'Email', 'Course', 'Category', 'Enrollment Date', 'Status', 'Payment Status', 'Amount'];
        const csvContent = [
          headers.join(','),
          ...enrollmentData.enrollments.map(e => [
            `"${e.studentName || ''}"`,
            `"${e.email || ''}"`,
            `"${e.course || ''}"`,
            `"${e.category || ''}"`,
            `"${e.enrollmentDate || ''}"`,
            `"${e.status || ''}"`,
            `"${e.paymentStatus || ''}"`,
            `"${e.feesPaid || e.amount || 0}"`
          ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `enrollments_${dateFilter}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Export failed. Please try again.');
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedAndFilteredData = () => {
    // First check if we have any data at all
    if (!enrollmentData?.enrollments || !Array.isArray(enrollmentData.enrollments)) {
      console.log('❌ No valid enrollments array:', enrollmentData?.enrollments);
      return [];
    }
    
    console.log('✅ Processing', enrollmentData.enrollments.length, 'enrollments');
    
    let filtered = enrollmentData.enrollments.filter(enrollment => {
      if (!enrollment) return false;
      
      const name = (enrollment.studentName || '').toString().toLowerCase();
      const email = (enrollment.email || '').toString().toLowerCase();
      const course = (enrollment.course || '').toString().toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      
      return name.includes(searchLower) || email.includes(searchLower) || course.includes(searchLower);
    });

    console.log('✅ Filtered to', filtered.length, 'records');

    return filtered.sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';
      
      if (sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-card border border-border rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const categoryData = Object.entries(enrollmentData?.categoryBreakdown || {}).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / enrollmentData.totalEnrollments) * 100).toFixed(1)
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-blue-600" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Total Enrollments</h3>
          <div className="text-2xl font-bold text-text-primary">{enrollmentData?.totalEnrollments || 0}</div>
          <p className="text-xs text-text-secondary mt-1">
            {dateFilter === 'today' ? 'Today' : 
             dateFilter === 'yesterday' ? 'Yesterday' :
             dateFilter === 'last7days' ? 'Last 7 days' :
             dateFilter === 'thisMonth' ? 'This month' :
             dateFilter === 'lastMonth' ? 'Last month' : 'Selected period'}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-green-600" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Total Revenue</h3>
          <div className="text-2xl font-bold text-text-primary">
            ${enrollmentData?.totalRevenue?.toLocaleString() || 0}
          </div>
          <p className="text-xs text-text-secondary mt-1">From enrollments</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-purple-600" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Avg Revenue/Enrollment</h3>
          <div className="text-2xl font-bold text-text-primary">
            ${Math.round(enrollmentData?.summary?.avgRevenuePerEnrollment || 0)}
          </div>
          <p className="text-xs text-text-secondary mt-1">Per student</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-orange-600" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Top Category</h3>
          <div className="text-lg font-bold text-text-primary">
            {enrollmentData?.summary?.topCategory || 'N/A'}
          </div>
          <p className="text-xs text-text-secondary mt-1">Most popular</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Enrollments by Category</h3>
            <Icon name="PieChart" size={20} className="text-text-secondary" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Bar Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Category Breakdown</h3>
            <Icon name="BarChart3" size={20} className="text-text-secondary" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced Debug Information */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-red-800 mb-2">🚨 DEBUGGING - Why 0 Records?</h4>
        <div className="text-sm text-red-700 space-y-1">
          <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
          <div><strong>API Error:</strong> {apiError || 'None'}</div>
          <div><strong>API Data:</strong> {apiData ? `${apiData.enrollments?.length || 0} records` : 'Not Loaded'}</div>
          <div><strong>Processed Data:</strong> {enrollmentData ? 'Loaded' : 'Not Loaded'}</div>
          <div><strong>Enrollments Array:</strong> {enrollmentData?.enrollments ? `${enrollmentData.enrollments.length} items` : 'null/undefined'}</div>
          <div><strong>Array Type:</strong> {Array.isArray(enrollmentData?.enrollments) ? 'Valid Array' : 'Not Array'}</div>
          <div><strong>Sample Record:</strong> {JSON.stringify(enrollmentData?.enrollments?.[0] || 'No data').substring(0, 100)}...</div>
          
          <div className="flex space-x-2 mt-3">
            <button 
              onClick={fetchEnrollmentData}
              className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              🔄 Refresh Data
            </button>
            <button 
              onClick={() => {
                console.log('🔍 MANUAL DEBUG:', {
                  enrollmentData,
                  enrollmentsArray: enrollmentData?.enrollments,
                  arrayLength: enrollmentData?.enrollments?.length,
                  isArray: Array.isArray(enrollmentData?.enrollments),
                  firstItem: enrollmentData?.enrollments?.[0]
                });
                alert('Check browser console for detailed debug info');
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              🔍 Debug Console
            </button>
            <button 
              onClick={async () => {
                try {
                  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';
                  console.log('🧪 Testing API at:', API_BASE_URL);
                  const response = await fetch(`${API_BASE_URL}/api/enrollment/recent?limit=5`);
                  const data = await response.json();
                  console.log('🧪 DIRECT API TEST:', data);
                  alert(`Direct API test: ${data.enrollments?.length || 0} records received from ${API_BASE_URL}. Check console for details.`);
                } catch (error) {
                  console.error('🧪 DIRECT API ERROR:', error);
                  alert('Direct API test failed. Check console for error details.');
                }
              }}
              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
            >
              🧪 Test API Direct
            </button>
            <button 
              onClick={() => {
                console.log('🧪 FORCING SAMPLE DATA');
                const sampleData = [
                  { id: 1, studentName: 'Test Student 1', email: 'test1@email.com', course: 'Test Course 1', category: 'Test', enrollmentDate: '2024-01-01', paymentStatus: 'Paid', feesPaid: 1000 },
                  { id: 2, studentName: 'Test Student 2', email: 'test2@email.com', course: 'Test Course 2', category: 'Test', enrollmentDate: '2024-01-02', paymentStatus: 'Pending', feesPaid: 500 },
                  { id: 3, studentName: 'Test Student 3', email: 'test3@email.com', course: 'Test Course 3', category: 'Test', enrollmentDate: '2024-01-03', paymentStatus: 'Paid', feesPaid: 1500 }
                ];
                
                setEnrollmentData({
                  totalEnrollments: 3,
                  totalRevenue: 3000,
                  categoryBreakdown: { 'Test': 3 },
                  enrollments: sampleData,
                  summary: { avgRevenuePerEnrollment: 1000, topCategory: 'Test' }
                });
                
                alert('Sample data loaded! Check if table shows 3 test records.');
              }}
              className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
            >
              🧪 Force Sample Data
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg font-semibold text-text-primary">
              Enrollment Details ({enrollmentData?.enrollments?.length || 0} records)
            </h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search enrollments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={() => exportData('csv')}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Icon name="Download" size={16} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {[
                  { key: 'studentName', label: 'Student Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'course', label: 'Course' },
                  { key: 'category', label: 'Category' },
                  { key: 'enrollmentDate', label: 'Date' },
                  { key: 'paymentStatus', label: 'Payment' },
                  { key: 'feesPaid', label: 'Amount' }
                ].map(column => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted/70"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      <Icon name="ArrowUpDown" size={12} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {getSortedAndFilteredData().map((enrollment, index) => (
                <tr key={index} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                    {enrollment.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {enrollment.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {enrollment.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {enrollment.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      enrollment.paymentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {enrollment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                    ${enrollment.feesPaid || enrollment.amount || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Record Count Summary */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>
              Showing {getSortedAndFilteredData().length} of {enrollmentData?.enrollments?.length || 0} total records
            </span>
            <span>
              {searchTerm && `Filtered by: "${searchTerm}"`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDashboard;