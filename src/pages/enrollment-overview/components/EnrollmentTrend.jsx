import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const EnrollmentTrendChart = () => {
  const [selectedMetric, setSelectedMetric] = useState('enrollments');
  const [chartPeriod, setChartPeriod] = useState('7d');

  const chartData = [
    { date: '2025-10-10', enrollments: 45, revenue: 4500, day: 'Oct 10' },
    { date: '2025-10-11', enrollments: 52, revenue: 5200, day: 'Oct 11' },
    { date: '2025-10-12', enrollments: 48, revenue: 4800, day: 'Oct 12' },
    { date: '2025-10-13', enrollments: 61, revenue: 6100, day: 'Oct 13' },
    { date: '2025-10-14', enrollments: 58, revenue: 5800, day: 'Oct 14' },
    { date: '2025-10-15', enrollments: 67, revenue: 6700, day: 'Oct 15' },
    { date: '2025-10-16', enrollments: 72, revenue: 7200, day: 'Oct 16' },
    { date: '2025-10-17', enrollments: 69, revenue: 6900, day: 'Today' }
  ];

  const weeklyData = [
    { date: '2025-09-23', enrollments: 285, revenue: 28500, day: 'Week 1' },
    { date: '2025-09-30', enrollments: 312, revenue: 31200, day: 'Week 2' },
    { date: '2025-10-07', enrollments: 298, revenue: 29800, day: 'Week 3' },
    { date: '2025-10-14', enrollments: 347, revenue: 34700, day: 'Week 4' }
  ];

  const monthlyData = [
    { date: '2025-07-01', enrollments: 1245, revenue: 124500, day: 'July' },
    { date: '2025-08-01', enrollments: 1387, revenue: 138700, day: 'August' },
    { date: '2025-09-01', enrollments: 1456, revenue: 145600, day: 'September' },
    { date: '2025-10-01', enrollments: 1242, revenue: 124200, day: 'October' }
  ];

  const getChartData = () => {
    switch (chartPeriod) {
      case '7d': return chartData;
      case '4w': return weeklyData;
      case '6m': return monthlyData;
      default: return chartData;
    }
  };

  const metrics = [
    { key: 'enrollments', label: 'Enrollments', color: '#2563EB', icon: 'Users' },
    { key: 'revenue', label: 'Revenue ($)', color: '#059669', icon: 'DollarSign' }
  ];

  const periods = [
    { key: '7d', label: 'Last 7 Days' },
    { key: '4w', label: 'Last 4 Weeks' },
    { key: '6m', label: 'Last 6 Months' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary mb-2">{data?.day}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-text-secondary">Enrollments:</span>
              </div>
              <span className="text-sm font-medium text-text-primary">{data?.enrollments}</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-text-secondary">Revenue:</span>
              </div>
              <span className="text-sm font-medium text-text-primary">${data?.revenue?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Enrollment Trends</h3>
          <p className="text-sm text-text-secondary">Track enrollment patterns over time</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Metric Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {metrics?.map((metric) => (
              <button
                key={metric?.key}
                onClick={() => setSelectedMetric(metric?.key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  selectedMetric === metric?.key
                    ? 'bg-card text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={metric?.icon} size={14} />
                <span>{metric?.label}</span>
              </button>
            ))}
          </div>

          {/* Period Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {periods?.map((period) => (
              <button
                key={period?.key}
                onClick={() => setChartPeriod(period?.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  chartPeriod === period?.key
                    ? 'bg-card text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {period?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-80" aria-label="Enrollment Trend Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="day" 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => selectedMetric === 'revenue' ? `$${value}` : value}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={metrics?.find(m => m?.key === selectedMetric)?.color}
              strokeWidth={3}
              dot={{ fill: metrics?.find(m => m?.key === selectedMetric)?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: metrics?.find(m => m?.key === selectedMetric)?.color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-text-secondary">Peak: Oct 16 (72 enrollments)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-success font-medium">+15.2% growth</span>
            </div>
          </div>
          
          <button className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-150">
            <Icon name="Download" size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentTrendChart;