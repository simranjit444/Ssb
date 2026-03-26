import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Camera, ArrowLeft, Scan } from 'lucide-react';
import { motion } from 'motion/react';

export default function BarcodeScanner() {
  const { currentStation, selectedCategory, setScannedItemId, canScanAtStation } = useApp();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!currentStation) {
    navigate('/stations');
    return null;
  }

  const getCategoryName = () => {
    switch(selectedCategory) {
      case 'deco-panel-non-sensi':
        return 'Deco Panel Non Sensi';
      case 'deco-panel-sensi':
        return 'Deco Panel Sensi';
      case 'assembly-parts':
        return 'Assembly Parts';
      default:
        return 'Category';
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setError(null);
    
    // Simulate barcode scan
    setTimeout(() => {
      const mockItemId = `CAC${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Check if item can be scanned at this station
      const validation = canScanAtStation(mockItemId, currentStation.id);
      
      if (!validation.allowed) {
        setError(validation.reason || 'Cannot scan item at this station');
        setScanning(false);
        return;
      }
      
      setScannedItemId(mockItemId);
      navigate('/checklist');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/stations')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl mb-1">Scan Item</h1>
              <p className="text-blue-200 text-sm">{currentStation.code} - {currentStation.name}</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-blue-200">Category:</span>
              <span>{getCategoryName()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-blue-200">Part Number:</span>
              <span>3P790748-1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Model No.:</span>
              <span>BYCQ125EAF6</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative bg-gray-900 aspect-square flex items-center justify-center">
              {/* Camera placeholder */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                <Camera className="w-20 h-20 text-gray-600" />
              </div>

              {/* Scan overlay box */}
              <div className="relative z-10 w-64 h-64 border-4 border-white rounded-2xl">
                {scanning && (
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-[#22C55E] shadow-lg shadow-green-500/50"
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                )}
                
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
              </div>

              {scanning && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-white text-sm">Scanning barcode...</p>
                </div>
              )}
            </div>

            <div className="p-6">
              <button
                onClick={simulateScan}
                disabled={scanning}
                className="w-full bg-[#1E3A5F] text-white py-4 rounded-xl hover:bg-[#152b45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Scan className="w-5 h-5" />
                {scanning ? 'Scanning...' : 'Start Scan'}
              </button>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <p className="text-center text-sm text-gray-500 mt-4">
                Position barcode within the frame
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}