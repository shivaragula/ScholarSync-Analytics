import React from 'react';

const RenewalDistribution = ({ data, period = 'monthly' }) => {
  const totalRenewals = data?.reduce((sum, item) => sum + item.count, 0) || 0;
  
  return (
    <div className="renewal-distribution">
      <div className="distribution-header">
        <h3>Renewal Distribution</h3>
        <select value={period} className="period-selector">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      
      <div className="distribution-chart">
        <div className="chart-container">
          {data?.map((segment, index) => {
            const percentage = totalRenewals > 0 ? (segment.count / totalRenewals) * 100 : 0;
            return (
              <div key={index} className="chart-segment">
                <div className="segment-bar">
                  <div 
                    className={`segment-fill ${segment.category}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="segment-info">
                  <span className="segment-label">{segment.label}</span>
                  <span className="segment-count">{segment.count}</span>
                  <span className="segment-percentage">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            );
          }) || (
            <div className="no-data">
              <p>No distribution data available</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="distribution-legend">
        <div className="legend-item">
          <span className="legend-color new-customers"></span>
          <span>New Customers</span>
        </div>
        <div className="legend-item">
          <span className="legend-color returning-customers"></span>
          <span>Returning Customers</span>
        </div>
        <div className="legend-item">
          <span className="legend-color enterprise"></span>
          <span>Enterprise</span>
        </div>
        <div className="legend-item">
          <span className="legend-color small-business"></span>
          <span>Small Business</span>
        </div>
      </div>
      
      <div className="distribution-summary">
        <div className="summary-stat">
          <span className="stat-label">Total Renewals</span>
          <span className="stat-value">{totalRenewals.toLocaleString()}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Avg. Contract Value</span>
          <span className="stat-value">
            ${data?.reduce((sum, item) => sum + (item.avgValue || 0), 0).toLocaleString() || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RenewalDistribution;