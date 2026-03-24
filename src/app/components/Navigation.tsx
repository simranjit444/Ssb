import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, FileText, Settings, FileBarChart, ClipboardList, LogOut, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/reports', label: 'Reports', icon: FileBarChart },
  { path: '/audit', label: 'Audit Log', icon: ClipboardList },
  { path: '/admin', label: 'Admin', icon: Settings },
  { path: '/help', label: 'Help', icon: HelpCircle },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg" />
              <span className="text-xl text-[#1E3A5F]">QIS</span>
            </div>
            <div className="flex gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      isActive
                        ? 'bg-[#1E3A5F] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}