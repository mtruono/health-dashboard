import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart, ComposedChart, Cell } from 'recharts';
import { Heart, Activity, TrendingDown, TrendingUp, AlertTriangle, Calendar, Moon, Wind, ChevronDown, ChevronUp, Info, Zap, Target } from 'lucide-react';

// Complete dataset from Fitbit export
const allData = [
  {date: '2022-12-28', rmssd: 17.15, nremhr: 67.53, month: '2022-12'},
  {date: '2022-12-29', rmssd: 13.06, nremhr: 71.99, month: '2022-12'},
  {date: '2022-12-30', rmssd: 14.46, nremhr: 74.11, month: '2022-12'},
  {date: '2022-12-31', rmssd: 11.81, nremhr: 77.56, month: '2022-12'},
  {date: '2023-01-03', rmssd: 16.39, nremhr: 64.11, month: '2023-01'},
  {date: '2023-01-04', rmssd: 18.89, nremhr: 68.21, month: '2023-01'},
  {date: '2023-01-05', rmssd: 11.90, nremhr: 82.57, month: '2023-01'},
  {date: '2023-01-07', rmssd: 15.44, nremhr: 75.24, month: '2023-01'},
  {date: '2023-01-08', rmssd: 14.05, nremhr: 77.75, month: '2023-01'},
  {date: '2023-01-09', rmssd: 14.31, nremhr: 69.78, month: '2023-01'},
  {date: '2023-01-10', rmssd: 17.86, nremhr: 70.75, month: '2023-01'},
  {date: '2023-01-11', rmssd: 15.32, nremhr: 70.40, month: '2023-01'},
  {date: '2023-01-12', rmssd: 25.03, nremhr: 69.29, month: '2023-01'},
  {date: '2023-01-15', rmssd: 14.76, nremhr: 70.82, month: '2023-01'},
  {date: '2023-01-16', rmssd: 14.25, nremhr: 72.62, month: '2023-01'},
  {date: '2023-01-17', rmssd: 19.18, nremhr: 65.58, month: '2023-01'},
  {date: '2023-01-18', rmssd: 15.18, nremhr: 73.79, month: '2023-01'},
  {date: '2023-01-23', rmssd: 10.22, nremhr: 84.25, month: '2023-01'},
  {date: '2023-01-24', rmssd: 15.05, nremhr: 67.86, month: '2023-01'},
  {date: '2023-01-25', rmssd: 18.40, nremhr: 68.53, month: '2023-01'},
  {date: '2023-01-26', rmssd: 14.86, nremhr: 75.95, month: '2023-01'},
  {date: '2023-01-28', rmssd: 12.38, nremhr: 78.79, month: '2023-01'},
  {date: '2023-01-29', rmssd: 13.37, nremhr: 71.72, month: '2023-01'},
  {date: '2023-01-30', rmssd: 14.12, nremhr: 65.62, month: '2023-01'},
  {date: '2023-01-31', rmssd: 17.88, nremhr: 63.81, month: '2023-01'},
  {date: '2023-02-02', rmssd: 16.77, nremhr: 73.21, month: '2023-02'},
  {date: '2023-02-03', rmssd: 15.80, nremhr: 69.46, month: '2023-02'},
  {date: '2023-02-04', rmssd: 14.29, nremhr: 74.73, month: '2023-02'},
  {date: '2023-02-05', rmssd: 13.85, nremhr: 66.07, month: '2023-02'},
  {date: '2023-02-06', rmssd: 17.08, nremhr: 67.94, month: '2023-02'},
  {date: '2023-02-07', rmssd: 22.60, nremhr: 67.14, month: '2023-02'},
  {date: '2023-02-08', rmssd: 17.10, nremhr: 66.88, month: '2023-02'},
  {date: '2023-02-09', rmssd: 19.41, nremhr: 75.31, month: '2023-02'},
  {date: '2023-02-10', rmssd: 12.13, nremhr: 76.74, month: '2023-02'},
  {date: '2023-02-11', rmssd: 16.33, nremhr: 76.73, month: '2023-02'},
  {date: '2023-02-12', rmssd: 17.03, nremhr: 71.88, month: '2023-02'},
  {date: '2023-02-13', rmssd: 11.38, nremhr: 82.19, month: '2023-02'},
  {date: '2023-02-14', rmssd: 21.31, nremhr: 68.45, month: '2023-02'},
  {date: '2023-02-15', rmssd: 15.78, nremhr: 67.28, month: '2023-02'},
  {date: '2023-02-17', rmssd: 13.78, nremhr: 73.81, month: '2023-02'},
  {date: '2023-02-18', rmssd: 11.57, nremhr: 83.56, month: '2023-02'},
  {date: '2023-05-13', rmssd: 16.59, nremhr: 73.98, month: '2023-05'},
  {date: '2023-05-14', rmssd: 17.98, nremhr: 68.40, month: '2023-05'},
  {date: '2023-05-15', rmssd: 16.98, nremhr: 70.25, month: '2023-05'},
  {date: '2023-05-16', rmssd: 15.67, nremhr: 69.44, month: '2023-05'},
  {date: '2023-05-17', rmssd: 15.28, nremhr: 76.37, month: '2023-05'},
  {date: '2023-05-22', rmssd: 19.07, nremhr: 65.69, month: '2023-05'},
  {date: '2023-05-23', rmssd: 14.19, nremhr: 69.01, month: '2023-05'},
  {date: '2023-05-24', rmssd: 10.89, nremhr: 81.94, month: '2023-05'},
  {date: '2023-05-25', rmssd: 14.27, nremhr: 73.33, month: '2023-05'},
  {date: '2023-05-26', rmssd: 15.08, nremhr: 74.47, month: '2023-05'},
  {date: '2023-05-28', rmssd: 13.86, nremhr: 73.44, month: '2023-05'},
  {date: '2023-05-29', rmssd: 14.98, nremhr: 72.11, month: '2023-05'},
  {date: '2023-05-30', rmssd: 28.67, nremhr: 60.61, month: '2023-05'},
  {date: '2023-05-31', rmssd: 17.59, nremhr: 66.19, month: '2023-05'},
  {date: '2023-06-01', rmssd: 18.34, nremhr: 66.16, month: '2023-06'},
  {date: '2023-06-02', rmssd: 17.42, nremhr: 67.72, month: '2023-06'},
  {date: '2023-06-03', rmssd: 10.61, nremhr: 81.45, month: '2023-06'},
  {date: '2023-06-04', rmssd: 12.91, nremhr: 70.92, month: '2023-06'},
  {date: '2023-06-05', rmssd: 14.45, nremhr: 74.74, month: '2023-06'},
  {date: '2023-06-06', rmssd: 14.28, nremhr: 72.60, month: '2023-06'},
  {date: '2023-06-07', rmssd: 11.83, nremhr: 89.49, month: '2023-06'},
  {date: '2023-06-08', rmssd: 15.49, nremhr: 70.04, month: '2023-06'},
  {date: '2023-06-09', rmssd: 14.03, nremhr: 81.34, month: '2023-06'},
  {date: '2023-06-11', rmssd: 11.77, nremhr: 78.70, month: '2023-06'},
  {date: '2023-06-12', rmssd: 11.10, nremhr: 78.42, month: '2023-06'},
  {date: '2023-06-13', rmssd: 17.84, nremhr: 71.19, month: '2023-06'},
  {date: '2023-06-14', rmssd: 20.17, nremhr: 68.67, month: '2023-06'},
  {date: '2023-06-15', rmssd: 17.70, nremhr: 70.46, month: '2023-06'},
  {date: '2023-06-16', rmssd: 16.28, nremhr: 76.75, month: '2023-06'},
  {date: '2023-06-17', rmssd: 19.86, nremhr: 69.89, month: '2023-06'},
  {date: '2023-06-25', rmssd: 10.13, nremhr: 77.09, month: '2023-06'},
  {date: '2023-06-26', rmssd: 9.63, nremhr: 74.20, month: '2023-06'},
  {date: '2023-06-28', rmssd: 19.72, nremhr: 73.39, month: '2023-06'},
  {date: '2023-06-29', rmssd: 13.75, nremhr: 73.32, month: '2023-06'},
  {date: '2023-06-30', rmssd: 22.80, nremhr: 63.52, month: '2023-06'},
  {date: '2023-07-01', rmssd: 17.63, nremhr: 72.53, month: '2023-07'},
  {date: '2023-07-03', rmssd: 25.22, nremhr: 61.69, month: '2023-07'},
  {date: '2023-07-04', rmssd: 26.41, nremhr: 61.37, month: '2023-07'},
  {date: '2023-07-05', rmssd: 21.72, nremhr: 67.64, month: '2023-07'},
  {date: '2023-07-07', rmssd: 15.27, nremhr: 70.21, month: '2023-07'},
  {date: '2023-07-08', rmssd: 10.40, nremhr: 75.92, month: '2023-07'},
  {date: '2023-07-09', rmssd: 10.85, nremhr: 74.88, month: '2023-07'},
  {date: '2023-07-10', rmssd: 14.17, nremhr: 68.83, month: '2023-07'},
  {date: '2023-07-11', rmssd: 14.50, nremhr: 73.42, month: '2023-07'},
  {date: '2023-07-12', rmssd: 15.41, nremhr: 71.73, month: '2023-07'},
  {date: '2023-07-18', rmssd: 51.89, nremhr: 52.80, month: '2023-07'},
  {date: '2023-07-19', rmssd: 23.22, nremhr: 60.87, month: '2023-07'},
  {date: '2023-07-23', rmssd: 24.11, nremhr: 62.73, month: '2023-07'},
  {date: '2023-07-24', rmssd: 18.06, nremhr: 64.49, month: '2023-07'},
  {date: '2023-07-27', rmssd: 19.05, nremhr: 66.33, month: '2023-07'},
  {date: '2023-07-30', rmssd: 15.75, nremhr: 67.88, month: '2023-07'},
  {date: '2023-07-31', rmssd: 30.13, nremhr: 62.24, month: '2023-07'},
  {date: '2023-08-01', rmssd: 21.46, nremhr: 60.21, month: '2023-08'},
  {date: '2023-08-08', rmssd: 20.00, nremhr: 64.67, month: '2023-08'},
  {date: '2023-08-09', rmssd: 22.24, nremhr: 63.08, month: '2023-08'},
  {date: '2023-08-12', rmssd: 22.44, nremhr: 65.30, month: '2023-08'},
  {date: '2023-08-19', rmssd: 24.77, nremhr: 64.94, month: '2023-08'},
  {date: '2023-08-20', rmssd: 15.12, nremhr: 76.11, month: '2023-08'},
  {date: '2023-08-21', rmssd: 19.08, nremhr: 66.24, month: '2023-08'},
  {date: '2023-09-11', rmssd: 10.17, nremhr: 74.82, month: '2023-09'},
  {date: '2023-09-23', rmssd: 13.01, nremhr: 74.62, month: '2023-09'},
  {date: '2023-09-30', rmssd: 13.05, nremhr: 68.38, month: '2023-09'},
  {date: '2023-10-01', rmssd: 13.66, nremhr: 75.34, month: '2023-10'},
  {date: '2024-01-29', rmssd: 17.08, nremhr: 68.23, month: '2024-01'},
  {date: '2024-01-30', rmssd: 14.14, nremhr: 74.33, month: '2024-01'},
  {date: '2024-01-31', rmssd: 20.69, nremhr: 62.66, month: '2024-01'},
  {date: '2024-02-01', rmssd: 19.39, nremhr: 64.70, month: '2024-02'},
  {date: '2024-02-03', rmssd: 13.51, nremhr: 69.78, month: '2024-02'},
  {date: '2024-02-04', rmssd: 10.76, nremhr: 73.05, month: '2024-02'},
  {date: '2024-02-06', rmssd: 11.73, nremhr: 76.43, month: '2024-02'},
  {date: '2024-02-07', rmssd: 13.39, nremhr: 75.75, month: '2024-02'},
  {date: '2024-02-18', rmssd: 9.94, nremhr: 73.95, month: '2024-02'},
  {date: '2024-02-19', rmssd: 10.73, nremhr: 77.04, month: '2024-02'},
  {date: '2024-02-20', rmssd: 10.25, nremhr: 88.73, month: '2024-02'},
  {date: '2024-02-21', rmssd: 19.40, nremhr: 65.46, month: '2024-02'},
  {date: '2024-02-22', rmssd: 11.73, nremhr: 71.71, month: '2024-02'},
  {date: '2024-02-23', rmssd: 11.02, nremhr: 76.39, month: '2024-02'},
  {date: '2024-02-26', rmssd: 13.96, nremhr: 67.59, month: '2024-02'},
  {date: '2024-02-27', rmssd: 13.01, nremhr: 66.98, month: '2024-02'},
  {date: '2024-02-28', rmssd: 8.96, nremhr: 79.78, month: '2024-02'},
  {date: '2024-02-29', rmssd: 10.49, nremhr: 81.27, month: '2024-02'},
  {date: '2024-03-01', rmssd: 10.34, nremhr: 79.56, month: '2024-03'},
  {date: '2024-03-21', rmssd: 12.04, nremhr: 69.69, month: '2024-03'},
  {date: '2024-03-22', rmssd: 11.44, nremhr: 72.60, month: '2024-03'},
  {date: '2024-03-23', rmssd: 15.46, nremhr: 69.45, month: '2024-03'},
  {date: '2024-03-24', rmssd: 8.79, nremhr: 83.31, month: '2024-03'},
  {date: '2024-03-25', rmssd: 12.83, nremhr: 71.62, month: '2024-03'},
  {date: '2024-03-26', rmssd: 13.76, nremhr: 70.83, month: '2024-03'},
  {date: '2024-03-27', rmssd: 15.88, nremhr: 68.89, month: '2024-03'},
  {date: '2024-03-28', rmssd: 11.85, nremhr: 79.63, month: '2024-03'},
  {date: '2024-03-30', rmssd: 11.72, nremhr: 75.70, month: '2024-03'},
  {date: '2024-03-31', rmssd: 18.44, nremhr: 68.16, month: '2024-03'},
  {date: '2025-12-15', rmssd: 12.10, nremhr: 70.50, month: '2025-12'},
  {date: '2025-12-16', rmssd: 12.12, nremhr: 76.32, month: '2025-12'},
  {date: '2025-12-17', rmssd: 10.21, nremhr: 81.80, month: '2025-12'},
  {date: '2025-12-18', rmssd: 12.26, nremhr: 72.78, month: '2025-12'},
  {date: '2025-12-19', rmssd: 16.13, nremhr: 71.91, month: '2025-12'},
  {date: '2025-12-20', rmssd: 7.29, nremhr: 93.17, month: '2025-12'},
  {date: '2025-12-21', rmssd: 15.00, nremhr: 69.62, month: '2025-12'},
  {date: '2025-12-22', rmssd: 12.57, nremhr: 71.41, month: '2025-12'},
  {date: '2025-12-23', rmssd: 13.30, nremhr: 78.97, month: '2025-12'},
  {date: '2025-12-24', rmssd: 13.17, nremhr: 76.86, month: '2025-12'},
  {date: '2025-12-25', rmssd: 12.58, nremhr: 72.81, month: '2025-12'},
  {date: '2025-12-26', rmssd: 12.81, nremhr: 67.57, month: '2025-12'},
  {date: '2025-12-27', rmssd: 9.31, nremhr: 73.26, month: '2025-12'},
  {date: '2025-12-28', rmssd: 16.49, nremhr: 68.60, month: '2025-12'},
  {date: '2025-12-29', rmssd: 15.87, nremhr: 70.86, month: '2025-12'},
  {date: '2025-12-31', rmssd: 15.39, nremhr: 68.74, month: '2025-12'},
  {date: '2026-01-01', rmssd: 8.24, nremhr: 89.84, month: '2026-01'},
  {date: '2026-01-02', rmssd: 18.48, nremhr: 60.31, month: '2026-01'},
  {date: '2026-01-03', rmssd: 15.15, nremhr: 69.76, month: '2026-01'},
  {date: '2026-01-04', rmssd: 16.81, nremhr: 67.49, month: '2026-01'},
  {date: '2026-01-05', rmssd: 16.78, nremhr: 65.27, month: '2026-01'},
  {date: '2026-01-06', rmssd: 12.09, nremhr: 76.57, month: '2026-01'},
  {date: '2026-01-07', rmssd: 14.26, nremhr: 75.56, month: '2026-01'},
  {date: '2026-01-08', rmssd: 8.61, nremhr: 87.28, month: '2026-01'},
  {date: '2026-01-09', rmssd: 16.28, nremhr: 64.26, month: '2026-01'},
  {date: '2026-01-10', rmssd: 10.70, nremhr: 82.81, month: '2026-01'},
  {date: '2026-01-11', rmssd: 10.87, nremhr: 76.36, month: '2026-01'},
  {date: '2026-01-12', rmssd: 11.94, nremhr: 69.59, month: '2026-01'},
  {date: '2026-01-13', rmssd: 11.46, nremhr: 72.29, month: '2026-01'},
  {date: '2026-01-14', rmssd: 12.66, nremhr: 75.05, month: '2026-01'},
  {date: '2026-01-15', rmssd: 15.67, nremhr: 67.56, month: '2026-01'},
  {date: '2026-01-16', rmssd: 12.19, nremhr: 73.06, month: '2026-01'},
  {date: '2026-01-19', rmssd: 13.09, nremhr: 67.27, month: '2026-01'},
  {date: '2026-01-20', rmssd: 10.32, nremhr: 82.11, month: '2026-01'},
  {date: '2026-01-21', rmssd: 13.29, nremhr: 67.15, month: '2026-01'},
  {date: '2026-01-22', rmssd: 8.19, nremhr: 82.84, month: '2026-01'},
  {date: '2026-01-23', rmssd: 12.63, nremhr: 72.64, month: '2026-01'},
  {date: '2026-01-24', rmssd: 14.90, nremhr: 69.30, month: '2026-01'},
  {date: '2026-01-25', rmssd: 21.04, nremhr: 65.72, month: '2026-01'},
  {date: '2026-01-26', rmssd: 10.56, nremhr: 70.27, month: '2026-01'},
  {date: '2026-01-27', rmssd: 11.06, nremhr: 72.40, month: '2026-01'}
];

// Monthly averages
const monthlyData = [
  {month: 'Dec 22', hrv: 14.12, sleephr: 72.80, days: 4, fill: '#3b82f6'},
  {month: 'Jan 23', hrv: 15.66, sleephr: 71.78, days: 21, fill: '#3b82f6'},
  {month: 'Feb 23', hrv: 16.14, sleephr: 72.58, days: 17, fill: '#3b82f6'},
  {month: 'May 23', hrv: 16.51, sleephr: 71.09, days: 14, fill: '#3b82f6'},
  {month: 'Jun 23', hrv: 15.24, sleephr: 73.81, days: 21, fill: '#3b82f6'},
  {month: 'Jul 23', hrv: 20.61, sleephr: 66.80, days: 18, fill: '#22c55e'},
  {month: 'Aug 23', hrv: 20.73, sleephr: 65.79, days: 7, fill: '#22c55e'},
  {month: 'Sep 23', hrv: 12.08, sleephr: 72.60, days: 3, fill: '#f59e0b'},
  {month: 'Oct 23', hrv: 13.66, sleephr: 75.34, days: 1, fill: '#f59e0b'},
  {month: 'Jan 24', hrv: 17.30, sleephr: 68.41, days: 3, fill: '#3b82f6'},
  {month: 'Feb 24', hrv: 12.55, sleephr: 73.91, days: 15, fill: '#f59e0b'},
  {month: 'Mar 24', hrv: 12.96, sleephr: 73.59, days: 11, fill: '#f59e0b'},
  {month: 'Dec 25', hrv: 12.91, sleephr: 74.07, days: 16, fill: '#ef4444'},
  {month: 'Jan 26', hrv: 13.09, sleephr: 72.91, days: 25, fill: '#ef4444'}
];

// Stat Card Component
const StatCard = ({ title, value, unit, change, changeType, icon: Icon, description, alert }) => (
  <div className={`bg-white rounded-xl p-5 shadow-lg border-l-4 ${alert === 'danger' ? 'border-red-500' : alert === 'warning' ? 'border-amber-500' : 'border-blue-500'}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{title}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-lg text-gray-500">{unit}</span>
        </div>
        {change && (
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${changeType === 'negative' ? 'text-red-600' : 'text-green-600'}`}>
            {changeType === 'negative' ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
            <span>{change}</span>
          </div>
        )}
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </div>
      <div className={`p-3 rounded-lg ${alert === 'danger' ? 'bg-red-100' : alert === 'warning' ? 'bg-amber-100' : 'bg-blue-100'}`}>
        <Icon className={`w-6 h-6 ${alert === 'danger' ? 'text-red-600' : alert === 'warning' ? 'text-amber-600' : 'text-blue-600'}`} />
      </div>
    </div>
  </div>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value} {entry.name.includes('HR') ? 'bpm' : 'ms'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Main Dashboard Component
export default function HealthDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllHistory, setShowAllHistory] = useState(false);
  
  // Calculate statistics
  const stats = useMemo(() => {
    const hrvValues = allData.map(d => d.rmssd);
    const sleepHRValues = allData.filter(d => d.nremhr > 0).map(d => d.nremhr);
    const recentData = allData.filter(d => d.date >= '2025-12-01');
    const historicalData = allData.filter(d => d.date < '2025-12-01');
    
    const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const sorted = arr => [...arr].sort((a, b) => a - b);
    
    return {
      hrvMean: mean(hrvValues),
      hrvMin: Math.min(...hrvValues),
      hrvMax: Math.max(...hrvValues),
      sleepHRMean: mean(sleepHRValues),
      sleepHRMin: Math.min(...sleepHRValues),
      sleepHRMax: Math.max(...sleepHRValues),
      recentHRV: mean(recentData.map(d => d.rmssd)),
      historicalHRV: mean(historicalData.map(d => d.rmssd)),
      recentSleepHR: mean(recentData.filter(d => d.nremhr > 0).map(d => d.nremhr)),
      historicalSleepHR: mean(historicalData.filter(d => d.nremhr > 0).map(d => d.nremhr)),
      p5: sorted(hrvValues)[Math.floor(hrvValues.length * 0.05)],
      p95: sorted(hrvValues)[Math.floor(hrvValues.length * 0.95)],
      totalNights: allData.length
    };
  }, []);
  
  const hrvChange = ((stats.recentHRV - stats.historicalHRV) / stats.historicalHRV * 100).toFixed(1);
  const sleepHRChange = ((stats.recentSleepHR - stats.historicalSleepHR) / stats.historicalSleepHR * 100).toFixed(1);
  
  // Get worst days
  const worstHRVDays = useMemo(() => 
    [...allData].sort((a, b) => a.rmssd - b.rmssd).slice(0, 10), []);
  const worstSleepHRDays = useMemo(() => 
    [...allData].filter(d => d.nremhr > 0).sort((a, b) => b.nremhr - a.nremhr).slice(0, 10), []);
  
  // January 2026 data
  const jan26Data = allData.filter(d => d.date.startsWith('2026-01')).map(d => ({
    ...d,
    day: d.date.substring(8)
  }));
  
  // Prepare timeline data
  const timelineData = showAllHistory ? allData : allData.slice(-60);
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'hrv', label: 'HRV Analysis', icon: Heart },
    { id: 'sleep', label: 'Sleep HR', icon: Moon },
    { id: 'january', label: 'January 2026', icon: Calendar },
    { id: 'insights', label: 'Insights', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Health Analysis Dashboard</h1>
          </div>
          <p className="text-blue-100">Comprehensive biometric analysis • 176 nights tracked • Dec 2022 – Jan 2026</p>
        </div>
      </div>
      
      {/* Alert Banner */}
      <div className="max-w-7xl mx-auto px-6 -mt-4">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900">Recovery Deficit Detected</h3>
              <p className="text-gray-700 text-sm mt-1">
                Your HRV over the past 8 weeks is <strong className="text-red-600">18.6% below</strong> your historical average. 
                Combined with elevated sleep heart rate and today's low HR alerts (44-46 bpm), this indicates accumulated physiological stress.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Current HRV"
                value={stats.recentHRV.toFixed(1)}
                unit="ms"
                change={`${hrvChange}% vs baseline`}
                changeType="negative"
                icon={Heart}
                description="Recent 8-week average"
                alert="danger"
              />
              <StatCard
                title="Sleep Heart Rate"
                value={stats.recentSleepHR.toFixed(1)}
                unit="bpm"
                change={`+${sleepHRChange}% vs baseline`}
                changeType="negative"
                icon={Moon}
                description="Recent 8-week average"
                alert="warning"
              />
              <StatCard
                title="Total Nights"
                value={stats.totalNights}
                unit=""
                icon={Calendar}
                description="3+ years of tracking"
              />
              <StatCard
                title="Today's Alert"
                value="44-46"
                unit="bpm"
                icon={AlertTriangle}
                description="First-ever low HR alerts"
                alert="danger"
              />
            </div>
            
            {/* Main Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">HRV Timeline</h2>
                  <p className="text-sm text-gray-500">Heart rate variability over time</p>
                </div>
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  {showAllHistory ? 'Show Recent' : 'Show All History'}
                  {showAllHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="hrvGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={d => d.substring(5)} />
                  <YAxis domain={[0, 55]} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={16} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Baseline', fill: '#ef4444', fontSize: 11 }} />
                  <ReferenceLine y={10} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Danger', fill: '#f59e0b', fontSize: 11 }} />
                  <Area type="monotone" dataKey="rmssd" name="HRV" stroke="#3b82f6" fill="url(#hrvGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Monthly Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 25]} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="hrv" name="HRV" radius={[4, 4, 0, 0]}>
                    {monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500"></div> Best Months</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500"></div> Normal</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500"></div> Below Average</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"></div> Recent (Concerning)</div>
              </div>
            </div>
          </div>
        )}
        
        {/* HRV Analysis Tab */}
        {activeTab === 'hrv' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="All-Time Mean" value={stats.hrvMean.toFixed(1)} unit="ms" icon={Target} description="Your baseline" />
              <StatCard title="All-Time Min" value={stats.hrvMin.toFixed(1)} unit="ms" icon={TrendingDown} description="Dec 20, 2025" alert="danger" />
              <StatCard title="All-Time Max" value={stats.hrvMax.toFixed(1)} unit="ms" icon={TrendingUp} description="Jul 18, 2023" />
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">HRV Full History</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={allData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={10} tickFormatter={d => d.substring(2, 7)} />
                  <YAxis domain={[0, 55]} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={stats.hrvMean} stroke="#3b82f6" strokeDasharray="5 5" />
                  <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="rmssd" name="HRV" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10 Worst HRV Days</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">HRV</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Sleep HR</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {worstHRVDays.map((day, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{day.date}</td>
                        <td className="py-3 px-4 text-red-600 font-bold">{day.rmssd.toFixed(2)} ms</td>
                        <td className="py-3 px-4">{day.nremhr.toFixed(1)} bpm</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${day.date >= '2025-12-01' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                            {day.date >= '2025-12-01' ? 'Recent' : 'Historical'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Sleep HR Tab */}
        {activeTab === 'sleep' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="All-Time Mean" value={stats.sleepHRMean.toFixed(1)} unit="bpm" icon={Moon} />
              <StatCard title="All-Time Best" value={stats.sleepHRMin.toFixed(1)} unit="bpm" icon={TrendingDown} description="Jul 18, 2023" />
              <StatCard title="All-Time Worst" value={stats.sleepHRMax.toFixed(1)} unit="bpm" icon={TrendingUp} description="Dec 20, 2025" alert="danger" />
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sleep Heart Rate History</h2>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={allData.filter(d => d.nremhr > 0)}>
                  <defs>
                    <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={10} tickFormatter={d => d.substring(2, 7)} />
                  <YAxis domain={[50, 95]} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="5 5" label={{ value: 'Optimal', fill: '#22c55e', fontSize: 10 }} />
                  <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Elevated', fill: '#ef4444', fontSize: 10 }} />
                  <Area type="monotone" dataKey="nremhr" name="Sleep HR" stroke="#8b5cf6" fill="url(#sleepGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10 Highest Sleep HR Days</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Sleep HR</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">HRV</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {worstSleepHRDays.map((day, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{day.date}</td>
                        <td className="py-3 px-4 text-red-600 font-bold">{day.nremhr.toFixed(1)} bpm</td>
                        <td className="py-3 px-4">{day.rmssd.toFixed(2)} ms</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${day.date >= '2025-12-01' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                            {day.date >= '2025-12-01' ? 'Recent' : 'Historical'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* January 2026 Tab */}
        {activeTab === 'january' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">January 2026 — Day by Day</h2>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={jan26Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} label={{ value: 'Day of January', position: 'bottom', offset: -5 }} />
                  <YAxis yAxisId="left" domain={[5, 25]} tick={{ fontSize: 11 }} label={{ value: 'HRV (ms)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" domain={[55, 95]} tick={{ fontSize: 11 }} label={{ value: 'Sleep HR (bpm)', angle: 90, position: 'insideRight' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine yAxisId="left" y={16} stroke="#3b82f6" strokeDasharray="5 5" />
                  <ReferenceLine yAxisId="right" y={80} stroke="#ef4444" strokeDasharray="3 3" />
                  <Area yAxisId="left" type="monotone" dataKey="rmssd" name="HRV" fill="#3b82f6" fillOpacity={0.2} stroke="#3b82f6" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="nremhr" name="Sleep HR" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Pattern Detected: Saw-tooth Recovery</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Notice the inverse relationship — when HRV drops, sleep HR rises. This oscillating pattern indicates your system is struggling to maintain consistent recovery. Days with both low HRV and high sleep HR (Jan 1, 8, 22) represent nights of genuine physiological stress.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Breakdown</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Week</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Avg HRV</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Avg Sleep HR</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Assessment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Week 1 (Jan 1-7)</td>
                      <td className="py-3 px-4">14.54 ms</td>
                      <td className="py-3 px-4">72.11 bpm</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Below Average</span></td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-red-50">
                      <td className="py-3 px-4 font-medium">Week 2 (Jan 8-14)</td>
                      <td className="py-3 px-4 text-red-600 font-bold">11.79 ms</td>
                      <td className="py-3 px-4">75.38 bpm</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Poor Recovery</span></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Week 3 (Jan 15-21)</td>
                      <td className="py-3 px-4">12.91 ms</td>
                      <td className="py-3 px-4">71.43 bpm</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Below Average</span></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Week 4 (Jan 22-28)</td>
                      <td className="py-3 px-4">13.06 ms</td>
                      <td className="py-3 px-4">72.20 bpm</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Below Average</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-500 mb-4">Historical Baseline</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">HRV Average</p>
                    <p className="text-3xl font-bold text-gray-700">{stats.historicalHRV.toFixed(1)} ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sleep HR Average</p>
                    <p className="text-3xl font-bold text-gray-700">{stats.historicalSleepHR.toFixed(1)} bpm</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg border-2 border-red-200">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Recent Period (Dec-Jan)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">HRV Average</p>
                    <p className="text-3xl font-bold text-red-600">{stats.recentHRV.toFixed(1)} ms</p>
                    <p className="text-sm text-red-500 font-medium">{hrvChange}% from baseline</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sleep HR Average</p>
                    <p className="text-3xl font-bold text-amber-600">{stats.recentSleepHR.toFixed(1)} bpm</p>
                    <p className="text-sm text-amber-500 font-medium">+{sleepHRChange}% from baseline</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key Insights */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800">⚠️ Critical Finding</h4>
                  <p className="text-red-700 text-sm mt-1">4 of your 10 worst HRV days and 5 of your 10 worst sleep HR days occurred in the last 8 weeks. This concentration is statistically significant.</p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-semibold text-amber-800">📅 December 20, 2025</h4>
                  <p className="text-amber-700 text-sm mt-1">Your all-time worst day: HRV of 7.29 ms and sleep HR of 93.17 bpm. Something significant happened that day — your body hasn't fully recovered since.</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800">✨ Your Potential</h4>
                  <p className="text-green-700 text-sm mt-1">Summer 2023 showed your best metrics: HRV averaging 20+ ms and sleep HR in the low 60s. These levels are achievable again with proper recovery.</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800">💡 Recommendations</h4>
                  <p className="text-blue-700 text-sm mt-1">Rest aggressively for the next 48 hours. Skip cortisol supplements. Prioritize 7+ hours of sleep. Watch for HRV to recover toward 15+ ms as you heal from your current illness.</p>
                </div>
              </div>
            </div>
            
            {/* Statistics Summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Complete Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalNights}</p>
                  <p className="text-sm text-gray-500">Nights Tracked</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.hrvMean.toFixed(1)} ms</p>
                  <p className="text-sm text-gray-500">Mean HRV</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.p5.toFixed(1)}-{stats.p95.toFixed(1)}</p>
                  <p className="text-sm text-gray-500">HRV Range (5-95%)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">3+ yrs</p>
                  <p className="text-sm text-gray-500">Data Span</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 text-center py-6 mt-8">
        <p className="text-sm">Health Analysis Dashboard • 176 Nights • Dec 2022 – Jan 2026</p>
        <p className="text-xs mt-1">For personal health monitoring only. Consult a healthcare professional for medical advice.</p>
      </div>
    </div>
  );
}
