import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Filter } from 'lucide-react';

const mockAuditLog = [
  {
    id: '1',
    action: 'Inspection Result Updated',
    itemId: 'CAC12345',
    oldValue: 'NG',
    newValue: 'OK',
    changedBy: 'Supervisor',
    timestamp: '2026-03-20T14:30:00',
    reason: 'Re-inspection after rework confirmed item meets quality standards'
  },
  {
    id: '2',
    action: 'User Station Assignment',
    itemId: '-',
    oldValue: 'ST01, ST02',
    newValue: 'ST01, ST02, ST03',
    changedBy: 'Admin',
    timestamp: '2026-03-20T10:15:00',
    reason: 'User John Doe assigned to additional station for cross-training'
  },
  {
    id: '3',
    action: 'Checklist Item Modified',
    itemId: 'CAC12346',
    oldValue: 'OK',
    newValue: 'NG',
    changedBy: 'Supervisor',
    timestamp: '2026-03-19T16:45:00',
    reason: 'Defect found during secondary review that was missed in initial inspection'
  },
  {
    id: '4',
    action: 'Station Configuration Updated',
    itemId: '-',
    oldValue: 'ST03 - Assembly Line',
    newValue: 'ST03 - Assembly',
    changedBy: 'Admin',
    timestamp: '2026-03-19T09:20:00',
    reason: 'Station name simplified for consistency'
  },
  {
    id: '5',
    action: 'Inspection Result Updated',
    itemId: 'CAC12340',
    oldValue: 'Pending',
    newValue: 'OK',
    changedBy: 'John Doe',
    timestamp: '2026-03-18T13:10:00',
    reason: 'Completed inspection checklist'
  }
];

export default function AuditLog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const filteredLogs = mockAuditLog.filter(log => {
    const matchesSearch = log.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.changedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

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
          <div>
            <h1 className="text-2xl mb-1">Audit Log</h1>
            <p className="text-blue-200 text-sm">Complete history of all system changes</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by item ID, user, or action..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                >
                  <option value="all">All Actions</option>
                  <option value="Inspection Result Updated">Inspection Updates</option>
                  <option value="User Station Assignment">User Assignments</option>
                  <option value="Checklist Item Modified">Checklist Changes</option>
                  <option value="Station Configuration Updated">Station Config</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Action</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Item ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Old Value</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">New Value</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Changed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-[#1E3A5F]">{log.action}</div>
                        <div className="text-xs text-gray-500 mt-1">{log.reason}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {log.itemId}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm">
                        {log.oldValue}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
                        {log.newValue}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {log.changedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500">No audit log entries found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-[#1E3A5F] mb-2">Audit Log Information</h3>
          <p className="text-sm text-gray-700">
            All changes to inspection results, user assignments, and system configurations are permanently logged
            with timestamps, user credentials, and detailed reasons. This ensures complete traceability and accountability
            for all quality-related decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
