import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RenewalTrendChart = ({ className = '' }) => {
  const chartData = [
    { month: 'Jan', renewals: 245, churnRate: 8.2, revenue: 98000 },
    { month: 'Feb', renewals: 267, churnRate: 7.8, revenue: 106800 },
    { month: 'Mar', renewals: 289, churnRate: 6.9, revenue: 115600 },
    { month: 'Apr', renewals: 312, churnRate: 7.4, revenue: 124800 },
    { month: 'May', renewals: 298, churnRate: 8.1, revenue: 119200 },
    { month: 'Jun', renewals: 334, churnRate: 6.5, revenue: 133600 },
    { month: 'Jul', renewals: 356, churnRate: 5.9, revenue: 142400 },
    { month: 'Aug', renewals: 378, churnRate: 6.2, revenue: 151200 },
    { month: 'Sep', renewals: 345, churnRate: 7.1, revenue: 138000 },
    { month: 'Oct', renewals: 389, churnRate: 5.4, revenue: 155600 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary mb-2">{`${label} 2024`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-text-secondary">{entry?.name}:</span>
              <span className="font-medium text-text-primary">
                {entry?.dataKey === 'churnRate' ? `${entry?.value}%` : 
                 entry?.dataKey === 'revenue' ? `$${entry?.value?.toLocaleString()}` : 
                 entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Renewal Trends & Churn Analysis</h3>
          <p className="text-sm text-text-secondary">Monthly renewal performance with churn rate overlay</p>
        </div>
        
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-text-secondary">Renewals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full" />
            <span className="text-text-secondary">Churn Rate</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              yAxisId="left"
              dataKey="renewals" 
              fill="#2563EB" 
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="churnRate" 
              stroke="#DC2626" 
              strokeWidth={3}
              dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RenewalTrendChart;