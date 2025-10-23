import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PriorityRenewalQueue = ({ className = '' }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const priorityRenewals = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of woman with brown hair in business attire smiling at camera",
    course: "Advanced Data Science",
    daysOverdue: 15,
    ltv: 4850,
    renewalValue: 1200,
    riskScore: 85,
    lastActivity: "2024-10-02",
    status: "overdue"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with glasses in navy suit",
    course: "Machine Learning Fundamentals",
    daysOverdue: 8,
    ltv: 3200,
    renewalValue: 899,
    riskScore: 72,
    lastActivity: "2024-10-09",
    status: "overdue"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1719515862094-c6e9354ee7f8",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in white blouse",
    course: "Digital Marketing Pro",
    daysOverdue: 3,
    ltv: 2890,
    renewalValue: 699,
    riskScore: 58,
    lastActivity: "2024-10-14",
    status: "pending"
  },
  {
    id: 4,
    name: "David Thompson",
    avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
    avatarAlt: "Professional headshot of man with beard in gray suit jacket",
    course: "Full Stack Development",
    daysOverdue: 0,
    ltv: 5200,
    renewalValue: 1499,
    riskScore: 45,
    lastActivity: "2024-10-16",
    status: "pending"
  },
  {
    id: 5,
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    avatarAlt: "Professional headshot of Asian woman with short black hair in blue blazer",
    course: "UX/UI Design Mastery",
    daysOverdue: 22,
    ltv: 3650,
    renewalValue: 999,
    riskScore: 91,
    lastActivity: "2024-09-25",
    status: "overdue"
  }];


  const getRiskColor = (score) => {
    if (score >= 80) return 'text-error bg-error/10';
    if (score >= 60) return 'text-warning bg-warning/10';
    return 'text-success bg-success/10';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'text-error bg-error/10 border-error/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-success bg-success/10 border-success/20';
    }
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers((prev) =>
    prev?.includes(customerId) ?
    prev?.filter((id) => id !== customerId) :
    [...prev, customerId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on customers:`, selectedCustomers);
    setSelectedCustomers([]);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Priority Renewal Queue</h3>
          <p className="text-sm text-text-secondary">High-risk customers requiring immediate attention</p>
        </div>
        
        {selectedCustomers?.length > 0 &&
        <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary">
              {selectedCustomers?.length} selected
            </span>
            <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            onClick={() => handleBulkAction('email')}>

              Send Reminder
            </Button>
          </div>
        }
      </div>
      <div className="space-y-4">
        {priorityRenewals?.map((customer) =>
        <div
          key={customer?.id}
          className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-150">

            <div className="flex items-start space-x-4">
              <input
              type="checkbox"
              checked={selectedCustomers?.includes(customer?.id)}
              onChange={() => handleSelectCustomer(customer?.id)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary" />

              
              <Image
              src={customer?.avatar}
              alt={customer?.avatarAlt}
              className="w-10 h-10 rounded-full object-cover" />

              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {customer?.name}
                    </h4>
                    <p className="text-xs text-text-secondary">{customer?.course}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(customer?.status)}`}>
                      {customer?.status === 'overdue' ? `${customer?.daysOverdue}d overdue` : 'Due soon'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-text-secondary">LTV:</span>
                    <span className="ml-1 font-medium text-text-primary">
                      ${customer?.ltv?.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Renewal:</span>
                    <span className="ml-1 font-medium text-text-primary">
                      ${customer?.renewalValue}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Risk Score:</span>
                    <span className={`ml-1 px-1.5 py-0.5 text-xs font-medium rounded ${getRiskColor(customer?.riskScore)}`}>
                      {customer?.riskScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Last Active:</span>
                    <span className="ml-1 font-medium text-text-primary">
                      {new Date(customer.lastActivity)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center space-x-2">
                  <Button
                  variant="outline"
                  size="sm"
                  iconName="Mail"
                  className="text-xs">

                    Email
                  </Button>
                  <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  className="text-xs">

                    Call
                  </Button>
                  <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  className="text-xs">

                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Showing 5 of 23 priority renewals</span>
          <Button variant="ghost" size="sm" iconName="ArrowRight">
            View All
          </Button>
        </div>
      </div>
    </div>);

};

export default PriorityRenewalQueue;