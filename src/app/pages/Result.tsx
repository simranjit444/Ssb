import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export default function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status') || 'ok';

  const isOK = status === 'ok';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isOK ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            {isOK ? (
              <CheckCircle2 className="w-14 h-14 text-[#22C55E]" />
            ) : (
              <XCircle className="w-14 h-14 text-[#EF4444]" />
            )}
          </motion.div>

          <h1 className={`text-2xl mb-3 ${isOK ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            {isOK ? 'Inspection Completed' : 'Item Sent to Rework'}
          </h1>

          <p className="text-gray-600 mb-8">
            {isOK
              ? 'All quality checks passed successfully. Item is ready to proceed to the next station.'
              : 'Quality issues detected. Item has been flagged for rework and cannot proceed to the next station.'}
          </p>

          {isOK && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-800">
                ✓ All checklist items passed
              </p>
            </div>
          )}

          {!isOK && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-red-800 mb-2">
                ⚠ Defects reported and documented
              </p>
              <p className="text-xs text-red-700">
                Forward movement blocked until rework is completed
              </p>
            </div>
          )}

          <div className="space-y-3">
            {isOK ? (
              <>
                <button
                  onClick={() => navigate('/stations')}
                  className="w-full bg-[#1E3A5F] text-white py-4 rounded-xl hover:bg-[#152b45] transition-colors flex items-center justify-center gap-2"
                >
                  Move to Next Station
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/scanner')}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Scan Another Item
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/rework')}
                  className="w-full bg-[#EF4444] text-white py-4 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  View Rework Details
                </button>
                <button
                  onClick={() => navigate('/stations')}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Back to Stations
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
