import React from 'react';
import Icon from '../../../components/AppIcon';

const RenewalMetricsCard = ({ title, value, change, changeType, icon, status, className = '' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow duration-150 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStatusColor()}`}>
              <Icon name={icon} size={20} />
            </div>
            <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-semibold text-text-primary">{value}</div>
            
            {change && (
              <div className="flex items-center space-x-1">
                <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
                <span className={`text-sm font-medium ${getChangeColor()}`}>
                  {change}
                </span>
                <span className="text-xs text-text-secondary">vs last month</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RenewalMetrics = () => {
  const metricsData = [
    {
      title: 'Renewal Rate',
      value: '87.3%',
      change: '+2.4%',
      changeType: 'positive',
      icon: 'RefreshCw',
      status: 'success'
    },
    {
      title: 'At-Risk Students',
      value: '142',
      change: '-8.1%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      status: 'warning'
    },
    {
      title: 'Avg Days to Renewal',
      value: '28.5',
      change: '+1.2',
      changeType: 'negative',
      icon: 'Calendar',
      status: 'default'
    },
    {
      title: 'Renewal Revenue',
      value: '$425K',
      change: '+12.8%',
      changeType: 'positive',
      icon: 'DollarSign',
      status: 'success'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <RenewalMetricsCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
          status={metric.status}
        />
      ))}
    </div>
  );
};

export default RenewalMetrics;