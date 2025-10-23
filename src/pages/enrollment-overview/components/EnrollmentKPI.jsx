import React from 'react';
import Icon from '../../../components/AppIcon';

const EnrollmentKPICards = () => {
  const kpiData = [
    {
      id: 1,
      title: "Total Enrollments",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      period: "vs last month",
      icon: "Users",
      color: "text-primary",
      bgColor: "bg-primary/10",
      sparklineData: [45, 52, 48, 61, 58, 67, 72, 69, 75, 78, 82, 85]
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "$284,750",
      change: "+8.3%",
      changeType: "increase",
      period: "vs last month",
      icon: "DollarSign",
      color: "text-success",
      bgColor: "bg-success/10",
      sparklineData: [120, 135, 128, 145, 142, 158, 165, 162, 175, 182, 188, 195]
    },
    {
      id: 3,
      title: "Active Courses",
      value: "47",
      change: "+3",
      changeType: "increase",
      period: "new this month",
      icon: "BookOpen",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      sparklineData: [35, 37, 36, 39, 41, 43, 44, 45, 46, 47, 47, 47]
    },
    {
      id: 4,
      title: "Growth Rate",
      value: "15.2%",
      change: "-2.1%",
      changeType: "decrease",
      period: "vs last month",
      icon: "TrendingUp",
      color: "text-warning",
      bgColor: "bg-warning/10",
      sparklineData: [18, 19, 17, 20, 18, 16, 15, 14, 15, 16, 15, 15]
    }
  ];

  const renderSparkline = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 16;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg width="60" height="20" className="opacity-60">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          points={points}
          className={color}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {kpiData?.map((kpi) => (
        <div
          key={kpi?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow duration-150"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${kpi?.bgColor}`}>
              <Icon name={kpi?.icon} size={20} className={kpi?.color} />
            </div>
            <div className="text-right">
              {renderSparkline(kpi?.sparklineData, kpi?.color)}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-secondary">{kpi?.title}</p>
            <p className="text-2xl font-semibold text-text-primary">{kpi?.value}</p>
            
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 ${
                kpi?.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={kpi?.changeType === 'increase' ? 'ArrowUp' : 'ArrowDown'} 
                  size={14} 
                />
                <span className="text-sm font-medium">{kpi?.change}</span>
              </div>
              <span className="text-sm text-text-secondary">{kpi?.period}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrollmentKPICards;