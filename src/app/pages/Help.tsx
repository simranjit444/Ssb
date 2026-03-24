import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2, XCircle, Shield, TrendingUp, Users, Settings } from 'lucide-react';

export default function Help() {
  const navigate = useNavigate();

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
            <h1 className="text-2xl mb-1">System Guide</h1>
            <p className="text-blue-200 text-sm">Learn about all features and workflows</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl text-[#1E3A5F] mb-4">Welcome to Quality Inspection System</h2>
          <p className="text-gray-700 mb-4">
            A comprehensive industrial-grade manufacturing quality inspection system designed for
            both mobile inspectors and desktop supervisors.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl text-[#1E3A5F] mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <Shield className="w-8 h-8 text-[#1E3A5F] mb-2" />
              <h3 className="text-[#1E3A5F] mb-2">Role-Based Access</h3>
              <p className="text-sm text-gray-700">Users only see their assigned stations</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <XCircle className="w-8 h-8 text-[#EF4444] mb-2" />
              <h3 className="text-[#1E3A5F] mb-2">NG Enforcement</h3>
              <p className="text-sm text-gray-700">Cannot submit NG without image evidence</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-[#1E3A5F] mb-2" />
              <h3 className="text-[#1E3A5F] mb-2">Full Audit Trail</h3>
              <p className="text-sm text-gray-700">All changes permanently logged</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <Users className="w-8 h-8 text-[#1E3A5F] mb-2" />
              <h3 className="text-[#1E3A5F] mb-2">Timeline Tracking</h3>
              <p className="text-sm text-gray-700">Complete inspection history per item</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl text-[#1E3A5F] mb-6">Mobile Workflow</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white flex-shrink-0">1</div>
              <div>
                <h3 className="text-[#1E3A5F] mb-1">Login</h3>
                <p className="text-sm text-gray-700">Use your credentials to access the system</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white flex-shrink-0">2</div>
              <div>
                <h3 className="text-[#1E3A5F] mb-1">Select Station</h3>
                <p className="text-sm text-gray-700">Choose from your assigned stations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white flex-shrink-0">3</div>
              <div>
                <h3 className="text-[#1E3A5F] mb-1">Scan Item</h3>
                <p className="text-sm text-gray-700">Use barcode scanner to identify item</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white flex-shrink-0">4</div>
              <div>
                <h3 className="text-[#1E3A5F] mb-1">Complete Checklist</h3>
                <p className="text-sm text-gray-700">Mark each item as OK or NG with required documentation</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white flex-shrink-0">5</div>
              <div>
                <h3 className="text-[#1E3A5F] mb-1">Submit & Continue</h3>
                <p className="text-sm text-gray-700">Submit inspection and proceed to next item</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl text-[#1E3A5F] mb-6">NG Reporting Requirements</h2>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <p className="text-gray-700 mb-4">When marking an item as NG, you must provide:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-1">•</span>
                <span><strong>Defect Description:</strong> Detailed explanation of the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-1">•</span>
                <span><strong>Remarks:</strong> Additional context and observations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-1">•</span>
                <span><strong>Images:</strong> At least 1 photo (max 5) showing the defect</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-1">•</span>
                <span><strong>Suggested Action:</strong> (Optional) Recommended next steps</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl text-[#1E3A5F] mb-6">User Roles</h2>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="text-[#1E3A5F] mb-2">Inspector (user1, user2)</h3>
              <p className="text-sm text-gray-700">Can perform inspections on assigned stations</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Scan Items</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Complete Checklists</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Report NG</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="text-[#1E3A5F] mb-2">Supervisor</h3>
              <p className="text-sm text-gray-700">Can edit results, view all stations, and access reports</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Edit Results</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">View Reports</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Audit Access</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-[#1E3A5F] mb-2 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Demo Accounts
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700"><strong>user1:</strong> Access to ST01, ST02 (Mobile Inspector)</p>
            <p className="text-gray-700"><strong>user2:</strong> Access to ST03, ST04 (Mobile Inspector)</p>
            <p className="text-gray-700"><strong>supervisor:</strong> Access to all stations and dashboard</p>
            <p className="text-xs text-gray-600 mt-3">Password: Any value works in demo mode</p>
          </div>
        </div>
      </div>
    </div>
  );
}
