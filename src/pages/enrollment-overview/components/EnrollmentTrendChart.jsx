import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';

const EnrollmentTrendChart = () => {
  const [chartPeriod, setChartPeriod] = useState('6months');

  const enrollmentData = [
    { month: 'Jul 2024', enrollments: 485, newStudents: 142, completions: 398 },
    { month: 'Aug 2024', enrollments: 520, newStudents: 156, completions: 425 },
    { month: 'Sep 2024', enrollments: 565, newStudents: 178, completions: 462 },
    { month: 'Oct 2024', enrollments: 598, newStudents: 189, completions: 485 },
    { month: 'Nov 2024', enrollments: 642, newStudents: 201, completions: 512 },
    { month: 'Dec 2024', enrollments: 685, newStudents: 218, completions: 548 }
  ];

  const periodOptions = [
    { value: '3months', label: '3M' },
    { value: '6months', label: '6M' },
    { value: '12months', label: '12M' },
    { value: 'ytd', label: 'YTD' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Enrollment Trends
          </h2>
          <p className="text-sm text-text-secondary">
            Track enrollment patterns and student acquisition over time
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          {periodOptions.map((option) => (
            <Button
              key={option.value}
              variant={chartPeriod === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartPeriod(option.value)}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={enrollmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-text-primary)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="enrollments" 
              name="Total Enrollments"
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="newStudents" 
              name="New Students"
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="completions" 
              name="Completions"
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">3,495</div>
            <div className="text-xs text-text-secondary">Total Enrollments (6M)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">1,084</div>
            <div className="text-xs text-text-secondary">New Students (6M)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">2,830</div>
            <div className="text-xs text-text-secondary">Completions (6M)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentTrendChart;