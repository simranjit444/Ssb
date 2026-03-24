import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Image as ImageIcon, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockItemData = {
  id: 'CAC12346',
  transactionId: 'TXN-2026-002',
  currentStatus: 'rework',
  timeline: [
    {
      station: 'ST01',
      stationName: 'Visual Inspection 1',
      status: 'ok',
      timestamp: '2026-03-20T10:30:00',
      inspector: 'John Doe',
    },
    {
      station: 'ST02',
      stationName: 'Visual Inspection 2',
      status: 'ng',
      timestamp: '2026-03-20T11:30:00',
      inspector: 'John Doe',
      defects: [
        {
          title: 'Moulding Defect',
          description: 'Black spots detected on surface',
          remarks: 'Multiple black spots visible on the top surface',
          suggestedAction: 'Rework - Clean and re-inspect',
          images: [
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
          ]
        }
      ]
    },
    {
      station: 'ST03',
      stationName: 'Assembly',
      status: 'pending',
      timestamp: null,
      inspector: null,
    },
    {
      station: 'ST04',
      stationName: 'Final Inspection',
      status: 'pending',
      timestamp: null,
      inspector: null,
    }
  ]
};

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return '-';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />;
      case 'ng':
        return <XCircle className="w-6 h-6 text-[#EF4444]" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'border-[#22C55E] bg-green-50';
      case 'ng':
        return 'border-[#EF4444] bg-red-50';
      case 'pending':
        return 'border-gray-300 bg-gray-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

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
            <h1 className="text-2xl mb-1">Item Detail</h1>
            <p className="text-blue-200 text-sm">Item ID: {mockItemData.id} • Transaction: {mockItemData.transactionId}</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-[#1E3A5F]">Inspection Timeline</h2>
            <span className={`px-4 py-2 rounded-xl text-sm ${
              mockItemData.currentStatus === 'completed' ? 'bg-green-100 text-green-800' :
              mockItemData.currentStatus === 'rework' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {mockItemData.currentStatus.toUpperCase()}
            </span>
          </div>

          <div className="relative">
            {mockItemData.timeline.map((step, index) => (
              <div key={step.station} className="relative pb-10 last:pb-0">
                {index < mockItemData.timeline.length - 1 && (
                  <div className={`absolute left-3 top-8 bottom-0 w-0.5 ${
                    step.status !== 'pending' ? 'bg-[#1E3A5F]' : 'bg-gray-300'
                  }`} />
                )}

                <div className="flex gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    step.status === 'ok' ? 'bg-[#22C55E]' :
                    step.status === 'ng' ? 'bg-[#EF4444]' :
                    'bg-gray-300'
                  }`}>
                    {step.status !== 'pending' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>

                  <div className="flex-1">
                    <div className={`border-2 rounded-2xl p-6 ${getStatusColor(step.status)}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg text-[#1E3A5F]">{step.station}</h3>
                            {getStatusIcon(step.status)}
                          </div>
                          <p className="text-sm text-gray-600">{step.stationName}</p>
                        </div>
                      </div>

                      {step.status !== 'pending' && (
                        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{formatTimestamp(step.timestamp)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{step.inspector}</span>
                          </div>
                        </div>
                      )}

                      {step.defects && step.defects.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-red-200 space-y-4">
                          {step.defects.map((defect, defectIdx) => (
                            <div key={defectIdx}>
                              <h4 className="text-[#EF4444] mb-2">{defect.title}</h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Description:</span>
                                  <p className="text-gray-900">{defect.description}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Remarks:</span>
                                  <p className="text-gray-900">{defect.remarks}</p>
                                </div>
                                {defect.suggestedAction && (
                                  <div>
                                    <span className="text-gray-600">Suggested Action:</span>
                                    <p className="text-gray-900">{defect.suggestedAction}</p>
                                  </div>
                                )}
                              </div>

                              {defect.images && defect.images.length > 0 && (
                                <div className="mt-4">
                                  <div className="flex items-center gap-2 mb-3">
                                    <ImageIcon className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-600">Evidence Photos</span>
                                  </div>
                                  <div className="grid grid-cols-4 gap-3">
                                    {defect.images.map((img, imgIdx) => (
                                      <button
                                        key={imgIdx}
                                        onClick={() => setSelectedImage(img)}
                                        className="aspect-square rounded-xl overflow-hidden border-2 border-red-200 hover:border-red-400 transition-colors"
                                      >
                                        <img src={img} alt={`Defect ${imgIdx + 1}`} className="w-full h-full object-cover" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="Zoomed defect"
                className="max-w-full max-h-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
