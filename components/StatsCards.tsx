import React from 'react';
import { Truck, AlertTriangle, CheckCircle, Thermometer } from 'lucide-react';
import { Shipment } from '../types';

interface StatsCardsProps {
  shipments: Shipment[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ shipments }) => {
  const total = shipments.length;
  const critical = shipments.filter(s => s.status === 'Critical Temp').length;
  const delayed = shipments.filter(s => s.status === 'Delayed').length;
  const onTime = shipments.filter(s => s.status === 'On Time').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">Total In Transit</p>
          <p className="text-3xl font-bold text-gray-800">{total}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
          <Truck size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">On Schedule</p>
          <p className="text-3xl font-bold text-gray-800">{onTime}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-full text-green-600">
          <CheckCircle size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">Delayed</p>
          <p className="text-3xl font-bold text-gray-800">{delayed}</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
          <AlertTriangle size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">Temp Alerts</p>
          <p className="text-3xl font-bold text-gray-800">{critical}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-full text-red-600">
          <Thermometer size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
