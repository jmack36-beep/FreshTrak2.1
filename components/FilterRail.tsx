import React from 'react';
import { FilterState } from '../types';
import { Thermometer, Calendar, Search } from 'lucide-react';

interface FilterRailProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const FilterRail: React.FC<FilterRailProps> = ({ filters, setFilters, searchQuery, setSearchQuery }) => {
  
  const toggleFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white w-full lg:w-72 lg:flex-shrink-0 lg:h-[calc(100vh-80px)] p-6 shadow-sm border-r border-gray-100 flex flex-col gap-8 overflow-y-auto font-sans">
      
      {/* Search */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="PO #, Load #, Item..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Status Toggles (The "Sliders") */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Status Filters</h3>
        <div className="space-y-4">
          <ToggleOption 
            label="On Time" 
            active={filters.showOnTime} 
            color="bg-green-500"
            onClick={() => toggleFilter('showOnTime')} 
          />
          <ToggleOption 
            label="Delayed" 
            active={filters.showDelayed} 
            color="bg-[#F37021]"
            onClick={() => toggleFilter('showDelayed')} 
          />
          <ToggleOption 
            label="Delivered" 
            active={filters.showDelivered} 
            color="bg-gray-500"
            onClick={() => toggleFilter('showDelivered')} 
          />
          <ToggleOption 
            label="Critical Temp" 
            active={filters.showCriticalTemp} 
            color="bg-red-500"
            onClick={() => toggleFilter('showCriticalTemp')} 
          />
        </div>
      </div>

      {/* Temperature Range Slider (Simulated visual slider) */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Thermometer size={16} className="text-gray-400" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Max Temp (°F)</h3>
        </div>
        
        <div className="px-2">
           <input 
            type="range" 
            min="30" 
            max="60" 
            value={filters.tempRange[1]} 
            onChange={(e) => setFilters(prev => ({...prev, tempRange: [prev.tempRange[0], parseInt(e.target.value)]}))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#004B87]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>30°F</span>
            <span className="text-[#004B87] font-bold">{filters.tempRange[1]}°F</span>
            <span>60°F+</span>
          </div>
        </div>
      </div>

      {/* Date Range (Simulated) */}
      <div>
         <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-gray-400" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ship Date Window</h3>
        </div>
        <div className="flex items-center gap-2 text-sm">
           <span className="bg-gray-100 px-3 py-1 rounded text-gray-600">Oct 20</span>
           <span className="text-gray-300">-</span>
           <span className="bg-gray-100 px-3 py-1 rounded text-gray-600">Nov 05</span>
        </div>
      </div>
    </div>
  );
};

// Helper component for the aesthetic toggles
const ToggleOption: React.FC<{ label: string, active: boolean, onClick: () => void, color: string }> = ({ label, active, onClick, color }) => (
  <div className="flex items-center justify-between cursor-pointer group" onClick={onClick}>
    <span className={`text-sm font-medium ${active ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-600'}`}>{label}</span>
    <div className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${active ? color : 'bg-gray-200'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

export default FilterRail;