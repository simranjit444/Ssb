import React from 'react';
import { useNavigate } from 'react-router';
import { Home, Smartphone, LayoutDashboard } from 'lucide-react';

export function MobileMenu() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate('/stations')}
          className="flex flex-col items-center justify-center flex-1 py-2 text-gray-600 hover:text-[#1E3A5F] transition-colors"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Stations</span>
        </button>
        <button
          onClick={() => navigate('/scanner')}
          className="flex flex-col items-center justify-center flex-1 py-2 text-gray-600 hover:text-[#1E3A5F] transition-colors"
        >
          <Smartphone className="w-6 h-6" />
          <span className="text-xs mt-1">Scan</span>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center justify-center flex-1 py-2 text-gray-600 hover:text-[#1E3A5F] transition-colors"
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
      </div>
    </div>
  );
}
