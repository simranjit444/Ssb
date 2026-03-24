import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Eye, Boxes, ClipboardCheck, LogOut, ArrowRight } from 'lucide-react';

const stationIcons: Record<string, React.ReactNode> = {
  ST01: <Eye className="w-8 h-8" />,
  ST02: <Eye className="w-8 h-8" />,
  ST03: <Boxes className="w-8 h-8" />,
  ST04: <ClipboardCheck className="w-8 h-8" />,
};

export default function StationSelection() {
  const { currentUser, setCurrentStation, logout } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleStationSelect = (station: typeof currentUser.stations[0]) => {
    setCurrentStation(station);
    navigate('/scanner');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h1 className="text-2xl mb-1">Select Station</h1>
            <p className="text-blue-200 text-sm">Welcome, {currentUser.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-3 hover:bg-white/10 rounded-xl transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          {currentUser.stations.map((station) => (
            <button
              key={station.id}
              onClick={() => handleStationSelect(station)}
              className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1E3A5F] rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  {stationIcons[station.id] || <ClipboardCheck className="w-8 h-8" />}
                </div>
                <div className="text-left">
                  <div className="text-xl text-[#1E3A5F] mb-1">{station.code}</div>
                  <div className="text-gray-600">{station.name}</div>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[#1E3A5F] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {currentUser.stations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-gray-600">No stations assigned to your account.</p>
            <p className="text-sm text-gray-500 mt-2">Please contact your supervisor.</p>
          </div>
        )}
      </div>
    </div>
  );
}