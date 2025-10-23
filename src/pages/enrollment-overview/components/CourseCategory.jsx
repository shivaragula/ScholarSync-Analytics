import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CourseCategoryChart = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryData = [
    {
      name: 'Undergraduate',
      value: 1247,
      percentage: 43.8,
      color: '#2563EB',
      growth: '+8.2%',
      courses: 18
    },
    {
      name: 'Graduate',
      value: 892,
      percentage: 31.3,
      color: '#059669',
      growth: '+12.5%',
      courses: 12
    },
    {
      name: 'Certificate',
      value: 456,
      percentage: 16.0,
      color: '#F59E0B',
      growth: '+5.1%',
      courses: 8
    },
    {
      name: 'Continuing Ed',
      value: 252,
      percentage: 8.9,
      color: '#8B5CF6',
      growth: '+18.7%',
      courses: 9
    }
  ];

  const totalEnrollments = categoryData?.reduce((sum, item) => sum + item?.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: data?.color }}
              ></div>
              <span className="text-sm font-medium text-text-primary">{data?.name}</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Enrollments:</span>
                <span className="font-medium text-text-primary">{data?.value?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Percentage:</span>
                <span className="font-medium text-text-primary">{data?.percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Courses:</span>
                <span className="font-medium text-text-primary">{data?.courses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Growth:</span>
                <span className="font-medium text-success">{data?.growth}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Course Categories</h3>
          <p className="text-sm text-text-secondary">Enrollment distribution by category</p>
        </div>
        
        <button className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-150">
          <Icon name="MoreHorizontal" size={16} />
        </button>
      </div>
      <div className="h-64 mb-6" aria-label="Course Category Distribution Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={(data, index) => setSelectedCategory(index)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              {categoryData?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry?.color}
                  stroke={selectedCategory === index ? '#FFFFFF' : 'none'}
                  strokeWidth={selectedCategory === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {categoryData?.map((category, index) => (
          <div 
            key={category?.name}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-150 cursor-pointer ${
              selectedCategory === index ? 'bg-muted' : 'hover:bg-muted/50'
            }`}
            onMouseEnter={() => setSelectedCategory(index)}
            onMouseLeave={() => setSelectedCategory(null)}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0" 
                style={{ backgroundColor: category?.color }}
              ></div>
              <div>
                <p className="text-sm font-medium text-text-primary">{category?.name}</p>
                <p className="text-xs text-text-secondary">{category?.courses} courses</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">{category?.value?.toLocaleString()}</p>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-text-secondary">{category?.percentage}%</span>
                <span className="text-xs text-success">{category?.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} className="text-text-secondary" />
            <span className="text-text-secondary">Total Enrollments:</span>
            <span className="font-medium text-text-primary">{totalEnrollments?.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-success font-medium">+11.2% overall</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCategoryChart;