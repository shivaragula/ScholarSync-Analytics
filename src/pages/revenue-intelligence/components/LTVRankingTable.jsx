import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LTVRankingTable = () => {
  const [sortBy, setSortBy] = useState('ltv');
  const [sortOrder, setSortOrder] = useState('desc');

  const studentData = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', ltv: 4850, totalSpent: 3200, enrollments: 8, lastActivity: '2024-12-15', status: 'active' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', ltv: 4620, totalSpent: 2980, enrollments: 7, lastActivity: '2024-12-14', status: 'active' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@email.com', ltv: 4385, totalSpent: 2750, enrollments: 6, lastActivity: '2024-12-13', status: 'active' },
    { id: 4, name: 'David Kim', email: 'david.k@email.com', ltv: 4120, totalSpent: 2450, enrollments: 5, lastActivity: '2024-12-12', status: 'active' },
    { id: 5, name: 'Lisa Thompson', email: 'lisa.t@email.com', ltv: 3890, totalSpent: 2200, enrollments: 5, lastActivity: '2024-12-10', status: 'at-risk' },
    { id: 6, name: 'James Wilson', email: 'james.w@email.com', ltv: 3650, totalSpent: 1980, enrollments: 4, lastActivity: '2024-12-08', status: 'at-risk' },
    { id: 7, name: 'Maria Garcia', email: 'maria.g@email.com', ltv: 3420, totalSpent: 1750, enrollments: 4, lastActivity: '2024-12-05', status: 'inactive' },
    { id: 8, name: 'Robert Brown', email: 'robert.b@email.com', ltv: 3180, totalSpent: 1520, enrollments: 3, lastActivity: '2024-12-01', status: 'inactive' }
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...studentData].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'at-risk': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Customer LTV Ranking
          </h2>
          <p className="text-sm text-text-secondary">
            Top students ranked by lifetime value and engagement
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-primary" />
          <span className="text-sm text-text-secondary">{studentData.length} students</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Student</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('ltv')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>LTV</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('totalSpent')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Total Spent</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('enrollments')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Enrollments</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                <button 
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Last Activity</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((student, index) => (
              <tr key={student.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-text-primary">{student.name}</div>
                    <div className="text-sm text-text-secondary">{student.email}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-text-primary">
                    {formatCurrency(student.ltv)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-text-primary">
                    {formatCurrency(student.totalSpent)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-text-primary">{student.enrollments}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-text-secondary text-sm">
                    {formatDate(student.lastActivity)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LTVRankingTable;