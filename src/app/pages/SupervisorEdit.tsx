import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

const mockInspectionData = {
  itemId: 'CAC12345',
  station: 'ST01 - Visual Inspection 1',
  timestamp: '2026-03-20T10:30:00',
  inspector: 'John Doe',
  checklist: [
    { id: '1', title: 'Appearance', status: 'ok' },
    { id: '2', title: 'Moulding Defect', status: 'ng' },
    { id: '3', title: 'Temporary Lug Location', status: 'ok' },
    { id: '4', title: 'Dimensional Check', status: 'ok' },
  ]
};

export default function SupervisorEdit() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(mockInspectionData.checklist);
  const [editReason, setEditReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStatusChange = (id: string, newStatus: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleSave = () => {
    if (!editReason.trim()) {
      alert('Please provide a reason for editing');
      return;
    }

    // Simulate save with audit log
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl mb-1">Supervisor Edit</h1>
            <p className="text-blue-200 text-sm">Item ID: {mockInspectionData.itemId}</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800">
              <strong>Supervisor Override:</strong> All changes will be logged in the audit trail with your credentials and timestamp.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl text-[#1E3A5F] mb-4">Inspection Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Station:</span>
              <p className="text-gray-900 mt-1">{mockInspectionData.station}</p>
            </div>
            <div>
              <span className="text-gray-600">Original Inspector:</span>
              <p className="text-gray-900 mt-1">{mockInspectionData.inspector}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Timestamp:</span>
              <p className="text-gray-900 mt-1">
                {new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(new Date(mockInspectionData.timestamp))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl text-[#1E3A5F] mb-6">Edit Checklist Results</h2>
          <div className="space-y-4">
            {checklist.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-[#1E3A5F] text-sm">{index + 1}</span>
                    </div>
                    <h3 className="text-[#1E3A5F]">{item.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs ${
                    item.status === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusChange(item.id, 'ok')}
                    className={`flex-1 py-3 rounded-xl transition-colors ${
                      item.status === 'ok'
                        ? 'bg-[#22C55E] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    OK
                  </button>
                  <button
                    onClick={() => handleStatusChange(item.id, 'ng')}
                    className={`flex-1 py-3 rounded-xl transition-colors ${
                      item.status === 'ng'
                        ? 'bg-[#EF4444] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    NG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl text-[#1E3A5F] mb-4">Reason for Edit</h2>
          <textarea
            value={editReason}
            onChange={(e) => setEditReason(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent min-h-[120px]"
            placeholder="Provide a detailed reason for modifying this inspection record..."
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            This reason will be permanently recorded in the audit log.
          </p>
        </div>

        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center">
              <Save className="w-4 h-4 text-white" />
            </div>
            <p className="text-green-800">Changes saved and logged successfully!</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!editReason.trim()}
            className="flex-1 bg-[#1E3A5F] text-white py-4 rounded-xl hover:bg-[#152b45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
