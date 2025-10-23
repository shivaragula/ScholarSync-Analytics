import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const RenewalDashboard = ({ dateFilter, customDateRange }) => {
  const [renewalData, setRenewalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll use mock data since renewal data structure needs to be defined
    // In a real implementation, this would fetch from your renewal API endpoint
    setRenewalData({
      kpis: {
        totalRenewals: 45,
        renewalsDone: 38,
        renewalsPending: 7,
        renewalsOverdue: 3,
        renewalRate: 84.4
      },
      trends: [
        { date: '2024-01-15', renewals: 12, due: 15 },
        { date: '2024-01-16', renewals: 8, due: 12 },
        { date: '2024-01-17', renewals: 15, due: 18 },
        { date: '2024-01-18', renewals: 10, due: 14 },
        { date: '2024-01-19', renewals: 13, due: 16 },
        { date: '2024-01-20', renewals: 9, due: 11 }
      ],
      churnByCategory: [
        { category: 'Programming', churnRate: 12.5, total: 80 },
        { category: 'Design', churnRate: 8.3, total: 60 },
        { category: 'Marketing', churnRate: 15.2, total: 45 },
        { category: 'Business', churnRate: 10.1, total: 35 }
      ]
    });
    setLoading(false);
  }, [dateFilter, customDateRange]);

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

  return (
    <div className="space-y-8">
      {/* Renewal KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="RefreshCw" size={20} className="text-blue-600" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Total Renewals</h3>
          <div className="text-2xl font-bold text-text-primary">{renewalData.kpis.totalRenewals}</div>
          <p className="text-xs text-text-secondary mt-1">This period</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Renewals Done</h3>
          <div className="text-2xl font-bold text-text-primary">{renewalData.kpis.renewalsDone}</div>
          <p className="text-xs text-text-secondary mt-1">Completed</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-yellow-600" />
            </div>
            <Icon name="Minus" size={16} className="text-yellow-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Renewals Pending</h3>
          <div className="text-2xl font-bold text-text-primary">{renewalData.kpis.renewalsPending}</div>
          <p className="text-xs text-text-secondary mt-1">Awaiting action</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-red-600" />
            </div>
            <Icon name="TrendingDown" size={16} className="text-red-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Overdue</h3>
          <div className="text-2xl font-bold text-text-primary">{renewalData.kpis.renewalsOverdue}</div>
          <p className="text-xs text-text-secondary mt-1">Needs attention</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Percent" size={20} className="text-purple-600" />
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-500" />
          </div>
          <h3 className="text-sm font-medium text-text-secondary mb-1">Renewal Rate</h3>
          <div className="text-2xl font-bold text-text-primary">{renewalData.kpis.renewalRate}%</div>
          <p className="text-xs text-text-secondary mt-1">Success rate</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Renewal Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Renewal Trends</h3>
            <Icon name="TrendingUp" size={20} className="text-text-secondary" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={renewalData.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
              <Line type="monotone" dataKey="renewals" stroke="#10b981" strokeWidth={2} name="Renewals Done" />
              <Line type="monotone" dataKey="due" stroke="#f59e0b" strokeWidth={2} name="Renewals Due" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Churn by Category */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Churn Rate by Category</h3>
            <Icon name="BarChart3" size={20} className="text-text-secondary" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={renewalData.churnByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value}%`, 'Churn Rate']} />
              <Bar dataKey="churnRate" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Renewal Status Table */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Renewal Status Overview</h3>
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="all">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
              </select>
              <select className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="all">All Status</option>
                <option value="done">Done</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center py-12 text-text-secondary">
            <Icon name="Database" size={48} className="mx-auto mb-4 opacity-50" />
            <h4 className="text-lg font-medium mb-2">Renewal Data Integration Needed</h4>
            <p className="text-sm">
              This section will display customer renewal details once the renewal data structure is defined in your Google Sheets.
            </p>
            <p className="text-xs mt-2">
              Expected columns: Customer Name, Course, Renewal Date, Amount, Status, etc.
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 mb-1">Implementation Note</h4>
            <p className="text-sm text-yellow-700">
              The Renewal Dashboard is currently showing mock data. To fully implement this section, you'll need to:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1 list-disc list-inside">
              <li>Define the renewal data structure in your Google Sheets</li>
              <li>Add renewal-specific API endpoints to the backend</li>
              <li>Connect the frontend to fetch real renewal data</li>
              <li>Implement renewal-specific calculations and filters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewalDashboard;