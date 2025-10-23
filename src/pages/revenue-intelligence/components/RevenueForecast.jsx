import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const RevenueForecast = () => {
  const forecastData = [
    { month: 'Jan 2025', actual: 358200, forecast: 365000, confidence: 'high' },
    { month: 'Feb 2025', actual: null, forecast: 378000, confidence: 'high' },
    { month: 'Mar 2025', actual: null, forecast: 392000, confidence: 'medium' },
    { month: 'Apr 2025', actual: null, forecast: 405000, confidence: 'medium' },
    { month: 'May 2025', actual: null, forecast: 418000, confidence: 'low' },
    { month: 'Jun 2025', actual: null, forecast: 432000, confidence: 'low' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Revenue Forecast
          </h2>
          <p className="text-sm text-text-secondary">
            6-month revenue projection with confidence intervals
          </p>
        </div>
        <Icon name="TrendingUp" size={20} className="text-primary" />
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(value), 'Revenue']}
              labelStyle={{ color: 'var(--color-text-primary)' }}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-text-primary">$2.4M</div>
          <div className="text-xs text-text-secondary">6M Forecast</div>
        </div>
        <div>
          <div className="text-lg font-bold text-success">+18.5%</div>
          <div className="text-xs text-text-secondary">Growth Rate</div>
        </div>
        <div>
          <div className="text-lg font-bold text-warning">Medium</div>
          <div className="text-xs text-text-secondary">Confidence</div>
        </div>
      </div>
    </div>
  );
};

export default RevenueForecast;