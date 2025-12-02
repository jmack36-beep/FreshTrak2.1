import React, { useState, useEffect } from 'react';
import { getLogisticsBriefing } from '../services/geminiService';
import { getShipments } from '../services/shipmentService';
import { Shipment, FilterState, User } from '../types';
import StatsCards from './StatsCards';
import FilterRail from './FilterRail';
import ShipmentDetail from './ShipmentDetail';
import { Leaf, RefreshCcw } from 'lucide-react';

interface LogisticsDashboardProps {
  user: User;
}

const ShipmentRow: React.FC<{ shipment: Shipment; onClick: () => void }> = ({ shipment, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-orange-100 text-orange-800';
      case 'Critical Temp': return 'bg-red-100 text-red-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Safe fallback if items is missing for some reason
  const items = shipment.items && shipment.items.length > 0 ? shipment.items : [shipment.description];

  return (
    <tr 
      onClick={onClick}
      className="hover:bg-blue-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0 group"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.loadNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.poNumber}</td>
      <td className="px-6 py-4 text-sm text-gray-600 relative">
        <div className="flex items-center gap-2">
           <span className="truncate max-w-[180px]">{items[0]}</span>
           {items.length > 1 && (
             <div className="relative group/tooltip">
                <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-[#004B87] text-xs font-bold whitespace-nowrap">
                   + {items.length - 1} more
                </span>
                
                {/* Hover list */}
                <div className="absolute left-0 top-6 w-64 bg-white shadow-xl rounded-lg border border-gray-200 p-3 z-50 hidden group-hover/tooltip:block">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">Items in PO</h4>
                  <ul className="space-y-1">
                      {items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 leading-tight py-1 border-b border-dashed border-gray-100 last:border-0">
                              {item}
                          </li>
                      ))}
                  </ul>
                </div>
             </div>
           )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.dueDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.location}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
         <span className={`px-2 py-1 rounded text-xs font-semibold ${shipment.temperature > 40 ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'}`}>
           {shipment.temperature}°F
         </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
          {shipment.status}
        </span>
      </td>
    </tr>
  );
};

const LogisticsDashboard: React.FC<LogisticsDashboardProps> = ({ user }) => {
  const [allShipments, setAllShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [briefing, setBriefing] = useState<string>('');
  
  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    showOnTime: true,
    showDelayed: true,
    showDelivered: true,
    showCriticalTemp: true,
    tempRange: [0, 60]
  });

  const refreshData = async () => {
    setLoading(true);
    const data = await getShipments(user);
    setAllShipments(data);
    
    const userSpecificShipments = data.filter(s => s.memberId === user.id);
    const aiBriefing = await getLogisticsBriefing(userSpecificShipments);
    setBriefing(aiBriefing);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const userShipments = allShipments.filter(s => s.memberId === user.id);

  const filteredShipments = userShipments.filter(s => {
    const query = searchQuery.toLowerCase();
    
    // Check main description or any item in the list
    const itemsMatch = s.items ? s.items.some(i => i.toLowerCase().includes(query)) : false;
    const descMatch = s.description.toLowerCase().includes(query);

    const matchesSearch = 
      s.poNumber.toLowerCase().includes(query) ||
      s.loadNumber.toLowerCase().includes(query) ||
      descMatch || itemsMatch;

    if (!matchesSearch) return false;
    if (!filters.showOnTime && s.status === 'On Time') return false;
    if (!filters.showDelayed && s.status === 'Delayed') return false;
    if (!filters.showDelivered && s.status === 'Delivered') return false;
    if (!filters.showCriticalTemp && s.status === 'Critical Temp') return false;
    if (s.temperature > filters.tempRange[1]) return false;

    return true;
  });

  return (
    <div className="flex h-full overflow-hidden">
      <FilterRail 
        filters={filters} 
        setFilters={setFilters} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-white">
        <div className="max-w-6xl mx-auto">
           {/* Header with refresh */}
           <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Logistics Dashboard</h1>
              <button onClick={refreshData} disabled={loading} className="flex items-center gap-2 text-sm text-[#004B87] hover:text-blue-900 font-medium">
                  <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
                  Refresh Data
              </button>
           </div>

           <div className="mb-8 bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Leaf size={120} className="text-[#004B87] transform rotate-12" />
              </div>
              <h2 className="text-lg font-bold text-[#004B87] mb-2">Daily Logistics Briefing</h2>
              <div className="text-blue-900 text-sm leading-relaxed max-w-3xl">
                 {loading ? (
                   <div className="h-4 bg-blue-200 rounded w-1/2 animate-pulse"></div>
                 ) : (
                   briefing
                 )}
              </div>
           </div>

          <StatsCards shipments={userShipments} />

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">My Active Shipments</h3>
              <span className="text-sm text-gray-500">{filteredShipments.length} results found</span>
            </div>
            
            <div className="overflow-x-auto min-h-[300px]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Load #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-12"></div></td>
                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                      </tr>
                    ))
                  ) : (
                    filteredShipments.map(shipment => (
                      <ShipmentRow 
                        key={shipment.id} 
                        shipment={shipment} 
                        onClick={() => setSelectedShipment(shipment)} 
                      />
                    ))
                  )}
                  {!loading && filteredShipments.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                         {userShipments.length === 0 
                            ? "No active shipments found for this member account." 
                            : "No shipments match your current filters."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <ShipmentDetail 
        shipment={selectedShipment} 
        onClose={() => setSelectedShipment(null)} 
      />
    </div>
  );
};

export default LogisticsDashboard;