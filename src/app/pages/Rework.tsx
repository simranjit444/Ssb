import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, Image as ImageIcon, RotateCcw } from 'lucide-react';

export default function Rework() {
  const navigate = useNavigate();

  const mockReworkData = {
    itemId: 'CAC12345',
    station: 'ST02 - Visual Inspection 2',
    timestamp: '23 Mar 2026, 11:30 AM',
    inspector: 'John Doe',
    defects: [
      {
        title: 'Moulding Defect',
        description: 'Black spots detected on surface',
        remarks: 'Multiple black spots visible on the top surface',
        suggestedAction: 'Rework - Clean and re-inspect',
        images: [
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
        ]
      }
    ],
    status: 'Pending Rework'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#EF4444] text-white p-6 shadow-md">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/stations')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl mb-1">Rework Status</h1>
            <p className="text-red-100 text-sm">Item ID: {mockReworkData.itemId}</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-[#EF4444] rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl text-[#EF4444] mb-2">{mockReworkData.status}</h2>
            <p className="text-sm text-red-700">
              This item cannot proceed to the next station until all defects are resolved and re-inspected.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-lg text-[#1E3A5F] mb-4">Inspection Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Station:</span>
              <p className="text-gray-900 mt-1">{mockReworkData.station}</p>
            </div>
            <div>
              <span className="text-gray-600">Inspector:</span>
              <p className="text-gray-900 mt-1">{mockReworkData.inspector}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Timestamp:</span>
              <p className="text-gray-900 mt-1">{mockReworkData.timestamp}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {mockReworkData.defects.map((defect, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#EF4444]">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg text-[#1E3A5F] mb-1">{defect.title}</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Description:</span>
                      <p className="text-gray-900 mt-1">{defect.description}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Remarks:</span>
                      <p className="text-gray-900 mt-1">{defect.remarks}</p>
                    </div>
                    {defect.suggestedAction && (
                      <div>
                        <span className="text-gray-600">Suggested Action:</span>
                        <p className="text-gray-900 mt-1">{defect.suggestedAction}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {defect.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Evidence Photos</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {defect.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="aspect-square rounded-xl overflow-hidden border border-gray-200">
                        <img src={img} alt={`Defect ${imgIdx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate('/scanner')}
            className="w-full bg-[#1E3A5F] text-white py-4 rounded-xl hover:bg-[#152b45] transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Re-inspect After Rework
          </button>
          <button
            onClick={() => navigate('/stations')}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Back to Stations
          </button>
        </div>
      </div>
    </div>
  );
}
