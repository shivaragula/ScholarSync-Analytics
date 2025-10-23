import React from 'react';

const CustomerActivity = ({ activities, timeRange = '24h' }) => {
  return (
    <div className="customer-activity">
      <div className="activity-header">
        <h3>Customer Activity</h3>
        <select value={timeRange} className="time-selector">
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>
      
      <div className="activity-list">
        {activities?.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">
              <span className={`icon ${activity.type}`}>
                {activity.type === 'login' && '👤'}
                {activity.type === 'purchase' && '💳'}
                {activity.type === 'view' && '👁️'}
                {activity.type === 'download' && '⬇️'}
              </span>
            </div>
            <div className="activity-details">
              <span className="activity-description">{activity.description}</span>
              <span className="activity-time">{activity.timestamp}</span>
            </div>
            <div className="activity-status">
              <span className={`status ${activity.status}`}>{activity.status}</span>
            </div>
          </div>
        )) || (
          <div className="no-activity">
            <p>No recent activity</p>
          </div>
        )}
      </div>
      
      <div className="activity-summary">
        <div className="summary-item">
          <span className="label">Total Events</span>
          <span className="value">{activities?.length || 0}</span>
        </div>
        <div className="summary-item">
          <span className="label">Active Users</span>
          <span className="value">{activities?.filter(a => a.status === 'active').length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerActivity;