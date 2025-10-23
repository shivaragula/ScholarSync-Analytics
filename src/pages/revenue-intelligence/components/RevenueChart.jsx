import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [chartPeriod, setChartPeriod] = useState('6months');
  const [viewType, setViewType] = useState('combined');

  const chartData = [
    {
      month: 'Jul 2024',
      revenue: 245000,
      collections: 231750,
      collectionRate: 94.6,
      enrollments: 485,
      avgRevPerStudent: 505
    },
    {
      month: 'Aug 2024',
      revenue: 268000,
      collections: 251240,
      collectionRate: 93.7,
      enrollments: 520,
      avgRevPerStudent: 515
    },
    {
      month: 'Sep 2024',
      revenue: 289500,
      collections: 275025,
      collectionRate: 95.0,
      enrollments: 565,
      avgRevPerStudent: 512
    },
    {
      month: 'Oct 2024',
      revenue: 312000,
      collections: 293280,
      collectionRate: 94.0,
      enrollments: 598,
      avgRevPerStudent: 522
    },
    {
      month: 'Nov 2024',
      revenue: 334750,
      collections: 318412,
      collectionRate: 95.1,
      enrollments: 642,
      avgRevPerStudent: 521
    },
    {
      month: 'Dec 2024',
      revenue: 358200,
      collections: 337728,
      collectionRate: 94.3,
      enrollments: 685,
      avgRevPerStudent: 523
    }
  ];

  const periodOptions = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '12months', label: 'Last 12 Months' },
    { value: 'ytd', label: 'Year to Date' }
  ];

  const viewOptions = [
    { value: 'combined', label: 'Revenue & Collections', icon: 'BarChart3' },
    { value: 'rate', label: 'Collection Rate', icon: 'TrendingUp' },
    { value: 'per-student', label: 'Revenue per Student', icon: 'Users' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-1">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-sm text-text-secondary">{entry?.name}:</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {entry?.name?.includes('Rate') ? formatPercentage(entry?.value) : formatCurrency(entry?.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Revenue & Collection Analysis
          </h2>
          <p className="text-sm text-text-secondary">
            Track revenue trends and payment collection performance over time
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2">
            {viewOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={viewType === option?.value ? 'default' : 'outline'}
                size="sm"
                iconName={option?.icon}
                onClick={() => setViewType(option?.value)}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>

          <select
            value={chartPeriod}
            onChange={(e) => setChartPeriod(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {periodOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'combined' ? (
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis
                yAxisId="left"
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatPercentage}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                name="Total Revenue"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="left"
                dataKey="collections"
                name="Collections"
                fill="var(--color-secondary)"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="collectionRate"
                name="Collection Rate"
                stroke="var(--color-warning)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          ) : viewType === 'rate' ? (
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatPercentage}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="collectionRate"
                name="Collection Rate"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 6 }}
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="avgRevPerStudent"
                name="Revenue per Student"
                fill="var(--color-secondary)"
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">$2.85M</div>
            <div className="text-xs text-text-secondary">Total Revenue (6M)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">$2.68M</div>
            <div className="text-xs text-text-secondary">Collections (6M)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">94.2%</div>
            <div className="text-xs text-text-secondary">Avg Collection Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">$516</div>
            <div className="text-xs text-text-secondary">Avg Revenue/Student</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;