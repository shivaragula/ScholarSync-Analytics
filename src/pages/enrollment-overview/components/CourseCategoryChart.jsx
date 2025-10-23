import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CourseCategoryChart = () => {
  const categoryData = [
    { name: 'Programming', value: 1247, color: '#3b82f6', percentage: 43.8 },
    { name: 'Design', value: 856, color: '#10b981', percentage: 30.1 },
    { name: 'Business', value: 485, color: '#f59e0b', percentage: 17.0 },
    { name: 'Marketing', value: 259, color: '#ef4444', percentage: 9.1 }
  ];

  const totalEnrollments = categoryData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-text-primary">{data.name}</p>
          <p className="text-sm text-text-secondary">
            {data.value} students ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Course Categories
          </h2>
          <p className="text-sm text-text-secondary">
            Enrollment distribution by course category
          </p>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {categoryData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-text-secondary">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-text-primary">
                {item.value}
              </div>
              <div className="text-xs text-text-secondary">
                {item.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border text-center">
        <div className="text-lg font-bold text-text-primary">{totalEnrollments}</div>
        <div className="text-xs text-text-secondary">Total Enrollments</div>
      </div>
    </div>
  );
};

export default CourseCategoryChart;