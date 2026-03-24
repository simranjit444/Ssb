import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Lock, User, Smartphone, Monitor } from 'lucide-react';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(userId, password)) {
      navigate('/stations');
    } else {
      setError('Invalid credentials. Try user1, user2, or supervisor');
    }
  };

  const handleQuickAccessDashboard = () => {
    // Quick access for demo - login as supervisor
    if (login('supervisor', 'demo')) {
      navigate('/dashboard');
    }
  };

  const handleQuickAccessMobile = () => {
    // Quick access for demo - login as user1
    if (login('user1', 'demo')) {
      navigate('/stations');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#1E3A5F] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl text-[#1E3A5F] mb-2">Quality Inspection</h1>
          <p className="text-gray-600">Manufacturing Quality System</p>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleQuickAccessMobile}
            className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Smartphone className="w-6 h-6 text-[#1E3A5F] mx-auto mb-2" />
            <div className="text-sm text-[#1E3A5F]">Mobile App</div>
            <div className="text-xs text-gray-600 mt-1">Inspector View</div>
          </button>
          <button
            onClick={handleQuickAccessDashboard}
            className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Monitor className="w-6 h-6 text-[#1E3A5F] mx-auto mb-2" />
            <div className="text-sm text-[#1E3A5F]">Web Dashboard</div>
            <div className="text-xs text-gray-600 mt-1">Desktop View</div>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or login manually</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm mb-2 text-gray-700">
                User ID
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                  placeholder="Enter your user ID"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#1E3A5F] text-white py-4 rounded-xl hover:bg-[#152b45] transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-700">user1 / user2 / supervisor (any password)</p>
          </div>
        </div>
      </div>
    </div>
  );
}