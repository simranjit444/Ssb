import React, { useState } from 'react';
import { X, Upload, Camera, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NGModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    description: string;
    remarks: string;
    suggestedAction: string;
    images: string[];
  }) => void;
  checklistItemTitle: string;
}

export function NGModal({ isOpen, onClose, onSubmit, checklistItemTitle }: NGModalProps) {
  const [description, setDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [suggestedAction, setSuggestedAction] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleImageUpload = () => {
    // Simulate image upload
    const mockImageUrl = `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop`;
    if (images.length < 5) {
      setImages([...images, mockImageUrl]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newErrors: string[] = [];

    if (!description.trim()) {
      newErrors.push('Defect description is required');
    }

    if (!remarks.trim()) {
      newErrors.push('Remarks are required');
    }

    if (images.length === 0) {
      newErrors.push('At least one image is required');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ description, remarks, suggestedAction, images });
    
    // Reset form
    setDescription('');
    setRemarks('');
    setSuggestedAction('');
    setImages([]);
    setErrors([]);
  };

  const isValid = description.trim() && remarks.trim() && images.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl text-[#1E3A5F]">Report Defect</h2>
                <p className="text-sm text-gray-600 mt-1">{checklistItemTitle}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-red-800 mb-2">Please fix the following errors:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {errors.map((error, idx) => (
                          <li key={idx} className="text-sm text-red-700">{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Defect Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent min-h-[100px]"
                  placeholder="Describe the defect in detail..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Remarks <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent min-h-[100px]"
                  placeholder="Additional remarks..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Suggested Action
                </label>
                <input
                  type="text"
                  value={suggestedAction}
                  onChange={(e) => setSuggestedAction(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                  placeholder="e.g., Rework, Scrap, Return to supplier"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Upload Images <span className="text-red-500">*</span>
                  <span className="text-gray-500 text-xs ml-2">(Max 5)</span>
                </label>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img src={img} alt={`Defect ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#1E3A5F] hover:bg-blue-50 transition-colors flex flex-col items-center gap-2"
                  >
                    <div className="flex gap-2">
                      <Camera className="w-6 h-6 text-gray-400" />
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Tap to add image</p>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex-1 bg-[#EF4444] text-white py-4 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit NG Report
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
