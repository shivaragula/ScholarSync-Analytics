import React, { useState } from 'react';

const RenewalTrend = ({ data, timeframe = '12m' }) => {
    const [selectedMetric, setSelectedMetric] = useState('renewals');

    const metrics = {
        renewals: { label: 'Renewals', color: '#3b82f6', unit: '' },
        revenue: { label: 'Revenue', color: '#10b981', unit: '$' },
        rate: { label: 'Renewal Rate', color: '#f59e0b', unit: '%' },
        churn: { label: 'Churn Rate', color: '#ef4444', unit: '%' }
    };

    const timeframes = {
        '3m': '3 Months',
        '6m': '6 Months',
        '12m': '12 Months',
        '24m': '24 Months'
    };

    return (
        <div className="renewal-trend">
            <div className="trend-header">
                <h3>Renewal Trends</h3>
                <div className="header-controls">
                    <select
                        value={selectedMetric}
                        onChange={(e) => setSelectedMetric(e.target.value)}
                        className="metric-selector"
                    >
                        {Object.entries(metrics).map(([key, metric]) => (
                            <option key={key} value={key}>{metric.label}</option>
                        ))}
                    </select>
                    <select value={timeframe} className="timeframe-selector">
                        {Object.entries(timeframes).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="trend-chart">
                <div className="chart-area">
                    <svg viewBox="0 0 800 300" className="trend-svg">
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map(i => (
                            <line
                                key={`grid-${i}`}
                                x1="50"
                                y1={50 + i * 50}
                                x2="750"
                                y2={50 + i * 50}
                                stroke="#e5e7eb"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Data line */}
                        {data && data.length > 1 && (
                            <polyline
                                fill="none"
                                stroke={metrics[selectedMetric].color}
                                strokeWidth="3"
                                points={data.map((point, index) => {
                                    const x = 50 + (index * (700 / (data.length - 1)));
                                    const maxValue = Math.max(...data.map(d => d[selectedMetric] || 0));
                                    const y = 250 - ((point[selectedMetric] || 0) / maxValue) * 200;
                                    return `${x},${y}`;
                                }).join(' ')}
                            />
                        )}

                        {/* Data points */}
                        {data?.map((point, index) => {
                            const x = 50 + (index * (700 / (data.length - 1)));
                            const maxValue = Math.max(...data.map(d => d[selectedMetric] || 0));
                            const y = 250 - ((point[selectedMetric] || 0) / maxValue) * 200;

                            return (
                                <g key={index}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="4"
                                        fill={metrics[selectedMetric].color}
                                    />
                                    <text
                                        x={x}
                                        y={y - 10}
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill="#374151"
                                    >
                                        {metrics[selectedMetric].unit}{point[selectedMetric]}
                                    </text>
                                </g>
                            );
                        })}

                        {/* X-axis labels */}
                        {data?.map((point, index) => {
                            const x = 50 + (index * (700 / (data.length - 1)));
                            return (
                                <text
                                    key={`label-${index}`}
                                    x={x}
                                    y={280}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill="#6b7280"
                                >
                                    {point.period}
                                </text>
                            );
                        })}
                    </svg>
                </div>
            </div>

            <div className="trend-summary">
                <div className="summary-cards">
                    <div className="summary-card">
                        <span className="summary-label">Current Period</span>
                        <span className="summary-value">
                            {metrics[selectedMetric].unit}{data?.[data.length - 1]?.[selectedMetric] || 0}
                        </span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-label">Previous Period</span>
                        <span className="summary-value">
                            {metrics[selectedMetric].unit}{data?.[data.length - 2]?.[selectedMetric] || 0}
                        </span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-label">Change</span>
                        <span className={`summary-value ${(data?.[data.length - 1]?.[selectedMetric] || 0) >= (data?.[data.length - 2]?.[selectedMetric] || 0)
                            ? 'positive' : 'negative'
                            }`}>
                            {(() => {
                                const current = data?.[data.length - 1]?.[selectedMetric] || 0;
                                const previous = data?.[data.length - 2]?.[selectedMetric] || 0;
                                const change = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
                                return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
                            })()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenewalTrend;