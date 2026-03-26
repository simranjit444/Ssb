import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, X, Camera, Scan } from 'lucide-react';
import { NGModal } from '../components/NGModal';
import { motion } from 'motion/react';

const stationChecklists: Record<string, Array<{
  id: string;
  title: string;
  requirement: string;
}>> = {
  ST01: [
    {
      id: '1',
      title: 'Appearance',
      requirement: 'Parts should be free from dust & contamination'
    },
    {
      id: '2',
      title: 'Moulding Defect',
      requirement: 'Parts should be free from moulding defects (Warpage, Flash, Gate point NG Cutting, short moulding, black spot, color variation, ribs broken, dent and damages, shrinkage)'
    },
    {
      id: '3',
      title: 'Temporary Lug Location & Movement',
      requirement: 'Temporary Lug location should be as per WI and there should be free movement'
    }
  ],
  ST02: [
    {
      id: '1',
      title: 'Appearance',
      requirement: 'Parts should be free from dust & contamination'
    },
    {
      id: '2',
      title: 'Moulding Defect',
      requirement: 'Parts should be free from moulding defects (Flash, Gate point NG Cutting, short moulding, black spot, color variation, ribs broken, dent and damages, shrinkage)'
    },
    {
      id: '3',
      title: 'Sealing Miss',
      requirement: 'There should be 41 sealings (Reference template)'
    },
    {
      id: '4',
      title: 'Sealing Location & Condition',
      requirement: 'Sealing location should be OK as per reference point & no tear, loose pasting, mis-alignment, wrinkle on the sealing'
    },
    {
      id: '5',
      title: 'Temporary Lug',
      requirement: '2 temporary lug and should have proper movement of fixture'
    },
    {
      id: '6',
      title: 'Lug and Screw',
      requirement: '4 lug and 4 screw, no loose & free screw, shaft at location'
    }
  ],
  ST03: [
    {
      id: '1',
      title: 'Assembly Check',
      requirement: 'All components properly assembled'
    },
    {
      id: '2',
      title: 'Fastener Check',
      requirement: 'All screws and fasteners properly tightened'
    },
    {
      id: '3',
      title: 'Functionality',
      requirement: 'Assembly functions as per specification'
    }
  ],
  ST04: [
    {
      id: '1',
      title: 'Final Visual Inspection',
      requirement: 'Complete visual inspection for defects'
    },
    {
      id: '2',
      title: 'Packaging Check',
      requirement: 'Proper packaging and labeling'
    },
    {
      id: '3',
      title: 'Documentation',
      requirement: 'All required documentation complete'
    }
  ]
};

export default function Checklist() {
  const { currentStation, selectedCategory, scannedItemId, currentUser, setScannedItemId, addInspection } = useApp();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<Array<{
    id: string;
    title: string;
    requirement: string;
  }>>([]);
  const [ngModalOpen, setNgModalOpen] = useState(false);
  const [timestamp] = useState(new Date());
  const [scanning, setScanning] = useState(true);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isFirstScan, setIsFirstScan] = useState(true); // Track if this is first or second scan
  const [currentItemBarcode, setCurrentItemBarcode] = useState<string | null>(null);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (currentStation) {
      const stationChecklist = stationChecklists[currentStation.id] || stationChecklists.ST01;
      setChecklist(stationChecklist);
    }
  }, [currentStation]);

  useEffect(() => {
    if (!currentStation || !scannedItemId) {
      navigate('/stations');
    }
  }, [currentStation, scannedItemId, navigate]);

  // Auto-scan simulation - continuously scanning
  useEffect(() => {
    if (scanning && !scannedCode) {
      const timer = setTimeout(() => {
        // Simulate barcode detection after 2 seconds
        const mockItemId = `CAC${Math.floor(10000 + Math.random() * 90000)}`;
        setScannedCode(mockItemId);
        setScanning(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [scanning, scannedCode]);

  // Handle barcode scan - different logic for first vs second scan
  useEffect(() => {
    if (scannedCode && currentStation && scannedItemId && currentUser) {
      if (isFirstScan) {
        // STEP 1: First scan - Load checklist and wait for inspection
        setCurrentItemBarcode(scannedCode);
        setIsFirstScan(false);
        setScannedCode(null);
        setScanning(true); // Start scanning for second barcode (confirmation)
      } else {
        // STEP 2: Second scan - Record OK inspection and redirect to scanner
        const timer = setTimeout(() => {
          // Record the inspection as OK
          const inspection = {
            itemId: scannedItemId,
            stationId: currentStation.id,
            stationName: currentStation.name,
            timestamp: new Date().toISOString(),
            inspector: currentUser.name,
            status: 'ok' as const,
            checklist: []
          };
          
          addInspection(scannedItemId, inspection);
          
          // Show success flash
          setShowSuccessFlash(true);
          
          // Reset and redirect to scanner after brief flash
          setTimeout(() => {
            navigate('/scanner');
          }, 800);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }, [scannedCode, isFirstScan, currentStation, scannedItemId, currentUser, addInspection, navigate]);

  if (!currentStation || !scannedItemId) {
    return null;
  }

  const handleNG = () => {
    setNgModalOpen(true);
  };

  const handleNGSubmit = (data: any) => {
    if (currentStation && scannedItemId && currentUser) {
      // Record the inspection as NG
      const inspection = {
        itemId: scannedItemId,
        stationId: currentStation.id,
        stationName: currentStation.name,
        timestamp: new Date().toISOString(),
        inspector: currentUser.name,
        status: 'ng' as const,
        checklist: []
      };
      
      addInspection(scannedItemId, inspection);
    }
    
    setNgModalOpen(false);
    // After NG submission, redirect to scanner
    setShowSuccessFlash(true);
    setTimeout(() => {
      navigate('/scanner');
    }, 800);
  };

  const handleRescan = () => {
    setScannedCode(null);
    setScanning(true);
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Success Flash Overlay */}
      {showSuccessFlash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#22C55E]/20 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-[#22C55E] text-white px-12 py-6 rounded-2xl shadow-2xl"
          >
            <div className="text-4xl font-bold">✓ OK</div>
          </motion.div>
        </motion.div>
      )}

      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/stations')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl mb-1">Quality Inspection</h1>
              <p className="text-blue-200 text-sm">Item ID: {scannedItemId}</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <div className="text-xs text-blue-200">Items Inspected</div>
              <div className="text-2xl font-bold">{itemCount}</div>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Category:</span>
              <span>{getCategoryName()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Part Number:</span>
              <span>3P790748-1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Model No.:</span>
              <span>BYCQ125EAF6</span>
            </div>
            <div className="border-t border-white/20 my-2"></div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Station:</span>
              <span>{currentStation.code} - {currentStation.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Timestamp:</span>
              <span>{formatTimestamp(timestamp)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Inspector:</span>
              <span>{currentUser?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Checklist */}
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  {isFirstScan ? (
                    <><strong>STEP 1:</strong> Scan item barcode to load checklist</>
                  ) : (
                    <><strong>STEP 2:</strong> Review checkpoints below, then scan again to confirm submission. If defect found, click NG button.</>
                  )}
                </p>
              </div>

              <div className="space-y-4">
                {checklist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-md p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#1E3A5F] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <span>{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-[#1E3A5F] mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.requirement}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Scanner & Actions */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Scanner */}
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  {/* Camera placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-600" />
                  </div>

                  {/* Scan overlay box */}
                  <div className="relative z-10 w-48 h-32 border-4 border-white rounded-xl">
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
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />
                  </div>

                  {/* Status messages */}
                  <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                    {scanning && (
                      <p className="text-white text-sm">Scanning barcode...</p>
                    )}
                    {scannedCode && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-[#22C55E] text-white px-4 py-2 rounded-lg inline-block max-w-full"
                      >
                        <p className="font-mono font-bold text-base sm:text-lg break-all">{scannedCode}</p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6">
                  {scannedCode ? (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                        <p className="text-center text-sm text-green-800">
                          ✓ Auto-submitting as OK in 3 seconds...
                        </p>
                      </div>
                      <div className="space-y-3">
                        <button
                          onClick={handleNG}
                          className="w-full bg-[#EF4444] text-white py-4 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-5 h-5" />
                          Report Defect (NG)
                        </button>
                        <button
                          onClick={handleRescan}
                          className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Scan className="w-4 h-4" />
                          Scan Different Item
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <button
                          disabled
                          className="w-full bg-gray-200 text-gray-400 py-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <Scan className="w-5 h-5" />
                          Waiting for scan...
                        </button>
                        <button
                          onClick={handleNG}
                          className="w-full bg-[#EF4444] text-white py-4 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-5 h-5" />
                          Report Defect (NG)
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NGModal
        isOpen={ngModalOpen}
        onClose={() => {
          setNgModalOpen(false);
        }}
        onSubmit={handleNGSubmit}
        checklistItemTitle="Product Inspection"
      />
    </div>
  );
}