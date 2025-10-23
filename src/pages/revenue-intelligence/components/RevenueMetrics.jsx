import React from 'react';
import Icon from '../../../components/AppIcon';

const RevenueMetricsGrid = () => {
  const metricsData = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: '$2,847,650',
      change: '+12.5%',
      changeType: 'positive',
      period: 'vs last month',
      icon: 'DollarSign',
      trend: 'up',
      forecast: '$3,100,000',
      forecastPeriod: 'projected next month'
    },
    {
      id: 'mrr',
      title: 'Monthly Recurring Revenue',
      value: '$485,320',
      change: '+8.3%',
      changeType: 'positive',
      period: 'vs last month',
      icon: 'TrendingUp',
      trend: 'up',
      forecast: '$520,000',
      forecastPeriod: 'projected next month'
    },
    {
      id: 'avg-ltv',
      title: 'Average Customer LTV',
      value: '$4,285',
      change: '+15.7%',
      changeType: 'positive',
      period: 'vs last quarter',
      icon: 'Users',
      trend: 'up',
      forecast: '$4,650',
      forecastPeriod: 'projected Q4'
    },
    {
      id: 'collection-rate',
      title: 'Payment Collection Rate',
      value: '94.2%',
      change: '-2.1%',
      changeType: 'negative',
      period: 'vs last month',
      icon: 'CreditCard',
      trend: 'down',
      forecast: '96.5%',
      forecastPeriod: 'target next month'
    }
  ];

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metricsData?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={metric?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary">{metric?.title}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon(metric?.trend)} 
                size={16} 
                className={getChangeColor(metric?.changeType)} 
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-text-primary mb-1">
                {metric?.value}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getChangeColor(metric?.changeType)}`}>
                  {metric?.change}
                </span>
                <span className="text-xs text-text-secondary">
                  {metric?.period}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Forecast:</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-text-primary">
                    {metric?.forecast}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {metric?.forecastPeriod}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueMetricsGrid;