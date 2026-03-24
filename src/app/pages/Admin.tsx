import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Users, MapPin, Settings, Plus, Edit, Trash2 } from 'lucide-react';

const mockUsers = [
  { id: 'user1', name: 'John Doe', role: 'Inspector', stations: ['ST01', 'ST02'] },
  { id: 'user2', name: 'Jane Smith', role: 'Inspector', stations: ['ST03', 'ST04'] },
  { id: 'supervisor', name: 'Supervisor', role: 'Supervisor', stations: ['ST01', 'ST02', 'ST03', 'ST04'] },
];

const mockStations = [
  { id: 'ST01', name: 'Visual Inspection 1', assignedUsers: 2 },
  { id: 'ST02', name: 'Visual Inspection 2', assignedUsers: 2 },
  { id: 'ST03', name: 'Assembly', assignedUsers: 2 },
  { id: 'ST04', name: 'Final Inspection', assignedUsers: 2 },
];

type Tab = 'users' | 'stations' | 'checklist';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('users');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl mb-1">Admin Panel</h1>
            <p className="text-blue-200 text-sm">Manage users, stations, and configurations</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'users'
                    ? 'border-b-2 border-[#1E3A5F] text-[#1E3A5F]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-5 h-5" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('stations')}
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'stations'
                    ? 'border-b-2 border-[#1E3A5F] text-[#1E3A5F]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapPin className="w-5 h-5" />
                Stations
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'checklist'
                    ? 'border-b-2 border-[#1E3A5F] text-[#1E3A5F]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="w-5 h-5" />
                Checklist Config
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-[#1E3A5F]">User Management</h2>
                  <button className="bg-[#1E3A5F] text-white px-4 py-2 rounded-xl hover:bg-[#152b45] transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add User
                  </button>
                </div>

                <div className="space-y-3">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="text-[#1E3A5F] mb-1">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.role}</p>
                        <div className="flex gap-2 mt-2">
                          {user.stations.map((station) => (
                            <span key={station} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
                              {station}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-[#1E3A5F]">Station Management</h2>
                  <button className="bg-[#1E3A5F] text-white px-4 py-2 rounded-xl hover:bg-[#152b45] transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Station
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockStations.map((station) => (
                    <div key={station.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg text-[#1E3A5F] mb-1">{station.id}</h3>
                          <p className="text-sm text-gray-600">{station.name}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {station.assignedUsers} users assigned
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'checklist' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-[#1E3A5F]">Checklist Configuration</h2>
                  <button className="bg-[#1E3A5F] text-white px-4 py-2 rounded-xl hover:bg-[#152b45] transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Checklist Item
                  </button>
                </div>

                <div className="space-y-4">
                  {['ST01', 'ST02', 'ST03', 'ST04'].map((stationId) => (
                    <div key={stationId} className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg text-[#1E3A5F] mb-4">
                        {stationId} Checklist
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">Appearance Check</span>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">Defect Inspection</span>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">Dimensional Check</span>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
