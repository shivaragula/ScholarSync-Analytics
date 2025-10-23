import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const RenewalDistributionChart = ({ className = '' }) => {
  const [viewType, setViewType] = useState('category'); // 'category' or 'status'

  const categoryData = [
    { name: 'Data Science', renewals: 156, churnRate: 8.2, color: '#2563EB' },
    { name: 'Web Development', renewals: 134, churnRate: 6.5, color: '#059669' },
    { name: 'Digital Marketing', renewals: 98, churnRate: 9.1, color: '#DC2626' },
    { name: 'UX/UI Design', renewals: 87, churnRate: 7.3, color: '#7C3AED' },
    { name: 'Machine Learning', renewals: 76, churnRate: 5.8, color: '#EA580C' },
    { name: 'Mobile Development', renewals: 65, churnRate: 10.2, color: '#0891B2' }
  ];

  const statusData = [
    { name: 'Completed', value: 342, percentage: 68.4, color: '#059669' },
    { name: 'Pending', value: 89, percentage: 17.8, color: '#F59E0B' },
    { name: 'Overdue', value: 45, percentage: 9.0, color: '#DC2626' },
    { name: 'Cancelled', value: 24, percentage: 4.8, color: '#6B7280' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Renewals:</span>
              <span className="font-medium text-text-primary">{data?.renewals || data?.value}</span>
            </div>
            {data?.churnRate && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Churn Rate:</span>
                <span className="font-medium text-error">{data?.churnRate}%</span>
              </div>
            )}
            {data?.percentage && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Percentage:</span>
                <span className="font-medium text-text-primary">{data?.percentage}%</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-text-primary mb-2">{data?.name}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Count:</span>
              <span className="font-medium text-text-primary">{data?.value}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Percentage:</span>
              <span className="font-medium text-text-primary">{data?.percentage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Renewal Distribution</h3>
          <p className="text-sm text-text-secondary">
            {viewType === 'category' ? 'Renewals by course category' : 'Renewals by status'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'category' ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            onClick={() => setViewType('category')}
          >
            By Category
          </Button>
          <Button
            variant={viewType === 'status' ? 'default' : 'outline'}
            size="sm"
            iconName="PieChart"
            onClick={() => setViewType('status')}
          >
            By Status
          </Button>
        </div>
      </div>
      {viewType === 'category' ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="renewals" 
                radius={[4, 4, 0, 0]}
                fill={(entry) => entry?.color}
              >
                {categoryData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {statusData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm font-medium text-text-primary">{item?.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-text-primary">{item?.value}</div>
                  <div className="text-xs text-text-secondary">{item?.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {viewType === 'category' && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryData?.map((category, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-1" 
                  style={{ backgroundColor: category?.color }}
                />
                <div className="text-xs font-medium text-text-primary">{category?.name}</div>
                <div className="text-xs text-text-secondary">{category?.churnRate}% churn</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewalDistributionChart;