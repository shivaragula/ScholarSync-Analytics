import React from 'react';

const RenewalMetrics = ({ metrics, comparisonPeriod = 'previous_month' }) => {
  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const getMetricTrend = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="renewal-metrics">
      <div className="metrics-header">
        <h3>Renewal Metrics</h3>
        <select value={comparisonPeriod} className="comparison-selector">
          <option value="previous_week">vs Previous Week</option>
          <option value="previous_month">vs Previous Month</option>
          <option value="previous_quarter">vs Previous Quarter</option>
          <option value="same_period_last_year">vs Same Period Last Year</option>
        </select>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h4>Renewal Rate</h4>
            <div className="metric-value">{metrics?.renewalRate || 0}%</div>
            <div className={`metric-change ${getMetricTrend(metrics?.renewalRate, metrics?.previousRenewalRate) >= 0 ? 'positive' : 'negative'}`}>
              {formatPercentage(getMetricTrend(metrics?.renewalRate, metrics?.previousRenewalRate))}
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h4>Revenue Retention</h4>
            <div className="metric-value">{metrics?.revenueRetention || 0}%</div>
            <div className={`metric-change ${getMetricTrend(metrics?.revenueRetention, metrics?.previousRevenueRetention) >= 0 ? 'positive' : 'negative'}`}>
              {formatPercentage(getMetricTrend(metrics?.revenueRetention, metrics?.previousRevenueRetention))}
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <h4>Avg. Renewal Time</h4>
            <div className="metric-value">{metrics?.avgRenewalTime || 0} days</div>
            <div className={`metric-change ${getMetricTrend(metrics?.avgRenewalTime, metrics?.previousAvgRenewalTime) <= 0 ? 'positive' : 'negative'}`}>
              {formatPercentage(getMetricTrend(metrics?.avgRenewalTime, metrics?.previousAvgRenewalTime))}
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h4>Churn Rate</h4>
            <div className="metric-value">{metrics?.churnRate || 0}%</div>
            <div className={`metric-change ${getMetricTrend(metrics?.churnRate, metrics?.previousChurnRate) <= 0 ? 'positive' : 'negative'}`}>
              {formatPercentage(getMetricTrend(metrics?.churnRate, metrics?.previousChurnRate))}
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h4>Expansion Rate</h4>
            <div className="metric-value">{metrics?.expansionRate || 0}%</div>
            <div className={`metric-change ${getMetricTrend(metrics?.expansionRate, metrics?.previousExpansionRate) >= 0 ? 'positive' : 'negative'}`}>
              {formatPercentage(getMetricTrend(metrics?.expansionRate, metrics?.previousExpansionRate))}
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h4>Customer Lifetime Value</h4>
            <div className="metric-value">${(metrics?.customerLifetimeValue || 0).toLocaleString()}</div>
            <div className={`metric-change ${getMetricTrend(metrics?.customerLifetimeValue, metrics?.previousCustomerLifetimeValue) >= 0 ? 'positive' : 'negative'}`}>
              {formatPercentage(getMetricTrend(metrics?.customerLifetimeValue, metrics?.previousCustomerLifetimeValue))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="metrics-insights">
        <h4>Key Insights</h4>
        <ul className="insights-list">
          <li className={metrics?.renewalRate >= 80 ? 'positive' : 'warning'}>
            Renewal rate is {metrics?.renewalRate >= 80 ? 'healthy' : 'below target'} at {metrics?.renewalRate}%
          </li>
          <li className={metrics?.churnRate <= 5 ? 'positive' : 'warning'}>
            Churn rate is {metrics?.churnRate <= 5 ? 'within acceptable range' : 'above target'} at {metrics?.churnRate}%
          </li>
          <li className={metrics?.avgRenewalTime <= 30 ? 'positive' : 'warning'}>
            Average renewal time is {metrics?.avgRenewalTime <= 30 ? 'efficient' : 'longer than expected'} at {metrics?.avgRenewalTime} days
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RenewalMetrics;