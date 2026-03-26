import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Package, ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  {
    id: 'deco-panel-non-sensi',
    name: 'Deco Panel Non Sensi',
    description: 'Non-sensitive decorative panel inspection',
    icon: Package,
    color: '#1E3A5F'
  },
  {
    id: 'deco-panel-sensi',
    name: 'Deco Panel Sensi',
    description: 'Sensitive decorative panel inspection',
    icon: Package,
    color: '#0EA5E9'
  },
  {
    id: 'assembly-parts',
    name: 'Assembly Parts',
    description: 'Component assembly inspection',
    icon: Package,
    color: '#8B5CF6'
  }
];

export default function CategorySelection() {
  const { currentUser, logout, setSelectedCategory } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate('/stations');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-[#1E3A5F] text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl mb-1">Select Category</h1>
                <p className="text-blue-200 text-sm">Choose inspection category to continue</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">Inspector:</span>
              <span>{currentUser.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleCategorySelect(category.id)}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left group"
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: category.color }} />
                  </div>
                  
                  <h3 
                    className="text-xl mb-2 font-medium"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-sm" style={{ color: category.color }}>
                    <span>Select</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Select a category to view available inspection stations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}