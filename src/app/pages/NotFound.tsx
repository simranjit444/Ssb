import React from 'react';
import { useNavigate } from 'react-router';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-[#EF4444]" />
        </div>
        <h1 className="text-4xl text-[#1E3A5F] mb-4">404</h1>
        <h2 className="text-2xl text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#1E3A5F] text-white px-6 py-3 rounded-xl hover:bg-[#152b45] transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
