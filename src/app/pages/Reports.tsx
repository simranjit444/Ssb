import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Download, Filter, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ngPercentageData = [
  { date: '15 Mar', percentage: 4.2 },
  { date: '16 Mar', percentage: 5.1 },
  { date: '17 Mar', percentage: 3.8 },
  { date: '18 Mar', percentage: 6.3 },
  { date: '19 Mar', percentage: 4.5 },
  { date: '20 Mar', percentage: 5.2 },
];

const productivityData = [
  { station: 'ST01', inspected: 52, target: 60 },
  { station: 'ST02', inspected: 48, target: 60 },
  { station: 'ST03', inspected: 65, target: 60 },
  { station: 'ST04', inspected: 44, target: 60 },
];

const stationEfficiencyData = [
  { station: 'ST01', efficiency: 87 },
  { station: 'ST02', efficiency: 80 },
  { station: 'ST03', efficiency: 92 },
  { station: 'ST04', efficiency: 73 },
];

export default function Reports() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('last-7-days');
  const [selectedStation, setSelectedStation] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl mb-1">Reports & Analytics</h1>
            <p className="text-blue-200 text-sm">Quality inspection performance metrics</p>
          </div>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg text-[#1E3A5F]">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                >
                  <option value="today">Today</option>
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="this-month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Station</label>
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
              >
                <option value="all">All Stations</option>
                <option value="ST01">ST01 - Visual Inspection 1</option>
                <option value="ST02">ST02 - Visual Inspection 2</option>
                <option value="ST03">ST03 - Assembly</option>
                <option value="ST04">ST04 - Final Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">User</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
              >
                <option value="all">All Users</option>
                <option value="user1">John Doe</option>
                <option value="user2">Jane Smith</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl text-[#1E3A5F] mb-6">NG Percentage Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ngPercentageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl text-[#1E3A5F] mb-6">Productivity by Station</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="station" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="inspected" fill="#1E3A5F" radius={[8, 8, 0, 0]} name="Inspected" />
                <Bar dataKey="target" fill="#22C55E" radius={[8, 8, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl text-[#1E3A5F] mb-6">Station Efficiency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationEfficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="station" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="efficiency" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Total Inspections</p>
            <p className="text-3xl text-[#1E3A5F]">234</p>
            <p className="text-xs text-green-600 mt-2">↑ 12% from last week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Average NG Rate</p>
            <p className="text-3xl text-[#EF4444]">4.8%</p>
            <p className="text-xs text-green-600 mt-2">↓ 0.5% from last week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Active Rework</p>
            <p className="text-3xl text-[#F59E0B]">12</p>
            <p className="text-xs text-gray-500 mt-2">3 resolved today</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-2">Avg. Efficiency</p>
            <p className="text-3xl text-[#22C55E]">83%</p>
            <p className="text-xs text-green-600 mt-2">↑ 3% from last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}