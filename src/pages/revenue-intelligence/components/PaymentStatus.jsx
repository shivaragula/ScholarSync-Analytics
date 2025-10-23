import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const PaymentStatus = () => {
  const paymentData = [
    { name: 'Paid', value: 1247, color: '#10b981', percentage: 82.3 },
    { name: 'Pending', value: 186, color: '#f59e0b', percentage: 12.3 },
    { name: 'Overdue', value: 52, color: '#ef4444', percentage: 3.4 },
    { name: 'Failed', value: 30, color: '#6b7280', percentage: 2.0 }
  ];

  const totalPayments = paymentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Payment Status
          </h2>
          <p className="text-sm text-text-secondary">
            Current payment distribution across all students
          </p>
        </div>
        <Icon name="CreditCard" size={20} className="text-primary" />
      </div>

      <div className="flex items-center justify-between">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value, 'Students']}
                labelStyle={{ color: 'var(--color-text-primary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 ml-6 space-y-4">
          {paymentData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-text-primary">
                  {item.value}
                </div>
                <div className="text-xs text-text-secondary">
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">{totalPayments}</div>
            <div className="text-xs text-text-secondary">Total Students</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">94.6%</div>
            <div className="text-xs text-text-secondary">Collection Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;