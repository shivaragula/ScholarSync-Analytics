import React from 'react';

const PriorityRenewal = ({ renewals, onRenewalAction }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="priority-renewal">
      <div className="renewal-header">
        <h3>Priority Renewals</h3>
        <div className="header-actions">
          <button className="btn-filter">Filter</button>
          <button className="btn-export">Export</button>
        </div>
      </div>
      
      <div className="renewal-stats">
        <div className="stat-item">
          <span className="stat-label">Due This Week</span>
          <span className="stat-value high">{renewals?.filter(r => r.dueThisWeek).length || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Overdue</span>
          <span className="stat-value critical">{renewals?.filter(r => r.overdue).length || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">At Risk</span>
          <span className="stat-value warning">{renewals?.filter(r => r.atRisk).length || 0}</span>
        </div>
      </div>
      
      <div className="renewal-list">
        {renewals?.map((renewal, index) => (
          <div key={index} className="renewal-item">
            <div className="renewal-info">
              <div className="customer-name">{renewal.customerName}</div>
              <div className="renewal-details">
                <span className="contract-value">${renewal.contractValue?.toLocaleString()}</span>
                <span className="renewal-date">Due: {renewal.dueDate}</span>
              </div>
            </div>
            
            <div className="renewal-priority">
              <span className={`priority-badge ${getPriorityColor(renewal.priority)}`}>
                {renewal.priority?.toUpperCase()}
              </span>
            </div>
            
            <div className="renewal-actions">
              <button 
                onClick={() => onRenewalAction?.(renewal.id, 'contact')}
                className="btn-action contact"
              >
                Contact
              </button>
              <button 
                onClick={() => onRenewalAction?.(renewal.id, 'schedule')}
                className="btn-action schedule"
              >
                Schedule
              </button>
            </div>
          </div>
        )) || (
          <div className="no-renewals">
            <p>No priority renewals at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityRenewal;