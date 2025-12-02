import React, { useState } from 'react';
import { Leaf, ArrowRight, Lock } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const DEMO_USERS: User[] = [
  { id: 'MEM-821', name: 'Valley Green Co-op', department: 'Produce Dept' },
  { id: 'MEM-445', name: 'Highland Market', department: 'Floral & Gifts' },
  { id: 'MEM-103', name: 'Lakeside Grocers', department: 'General Logistics' },
];

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [selectedId, setSelectedId] = useState(DEMO_USERS[0].id);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.id === selectedId);
      if (user) onLogin(user);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#004B87] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Leaf size={200} className="absolute -top-10 -left-10 text-white transform rotate-12" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-3 rounded-full mb-4 shadow-lg">
              <Leaf size={32} className="text-[#004B87]" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">FreshTrak</h1>
            <p className="text-blue-200 text-sm mt-2">Member Distribution Portal</p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="member-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Member Organization
              </label>
              <div className="relative">
                <select
                  id="member-select"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-50 border transition-shadow shadow-sm"
                >
                  {DEMO_USERS.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  disabled
                  value="password123"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed py-3"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">Password pre-filled for demo.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#F37021] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all disabled:opacity-70 disabled:cursor-wait"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  Access Portal <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-xs text-[#004B87] hover:text-blue-800 font-medium">
              Forgot member ID?
            </a>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-center text-xs text-blue-200 opacity-60">
        &copy; 2024 FreshTrak Logistics. Authorized personnel only.
      </p>
    </div>
  );
};

export default LoginScreen;