import React from 'react';
import { useNavigate } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ClipboardCheck, AlertTriangle, CheckCircle2, ArrowRight, Edit } from 'lucide-react';

const statsData = [
  { label: 'In Progress', value: 45, color: '#1E3A5F', icon: ClipboardCheck },
  { label: 'Rework', value: 12, color: '#EF4444', icon: AlertTriangle },
  { label: 'Completed', value: 234, color: '#22C55E', icon: CheckCircle2 },
];

const ngFrequencyData = [
  { station: 'ST01', ng: 5 },
  { station: 'ST02', ng: 12 },
  { station: 'ST03', ng: 3 },
  { station: 'ST04', ng: 8 },
];

const stationLoadData = [
  { name: 'ST01', value: 45 },
  { name: 'ST02', value: 38 },
  { name: 'ST03', value: 52 },
  { name: 'ST04', value: 41 },
];

const COLORS = ['#1E3A5F', '#22C55E', '#EF4444', '#F59E0B'];

const recentItems = [
  { id: 'CAC12345', status: 'in-progress', station: 'ST02', time: '2 min ago' },
  { id: 'CAC12346', status: 'rework', station: 'ST02', time: '15 min ago' },
  { id: 'CAC12347', status: 'completed', station: 'ST04', time: '1 hour ago' },
  { id: 'CAC12348', status: 'in-progress', station: 'ST03', time: '2 hours ago' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rework': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl mb-2">Quality Dashboard</h1>
          <p className="text-blue-200">Manufacturing Quality Inspection System</p>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-3xl" style={{ color: stat.color }}>{stat.value}</span>
                </div>
                <h3 className="text-gray-600">{stat.label}</h3>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl text-[#1E3A5F] mb-6">NG Frequency by Station</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ngFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="station" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="ng" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl text-[#1E3A5F] mb-6">Station Load Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stationLoadData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stationLoadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Items */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-[#1E3A5F]">Recent Items</h2>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/supervisor-edit')}
                className="text-[#1E3A5F] hover:underline text-sm flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Supervisor Edit
              </button>
              <button className="text-[#1E3A5F] hover:underline text-sm">View All</button>
            </div>
          </div>
          <div className="space-y-3">
            {recentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#1E3A5F]">{item.id}</div>
                  <span className={`px-3 py-1 rounded-lg text-xs ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{item.station}</span>
                  <span className="text-sm text-gray-500">{item.time}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}