import React, { useState } from 'react';
import { Contract } from '../types';
import { FileText, Filter, Search } from 'lucide-react';

const MOCK_CONTRACTS: Contract[] = [
  { id: 'C-101', commodity: 'Bananas', supplier: 'Del Monte', buyer: 'Global Sourcing', startDate: '2024-01-01', endDate: '2024-12-31', priceTerm: '$18.50 / Box (Fixed)', status: 'Active' },
  { id: 'C-102', commodity: 'Potatoes (Russet)', supplier: 'Idaho Best', buyer: 'Root Veg Desk', startDate: '2023-09-01', endDate: '2024-08-31', priceTerm: '$12.00 / Bale', status: 'Active' },
  { id: 'C-103', commodity: 'Iceberg Lettuce', supplier: 'Tanimura & Antle', buyer: 'Leafy Desk', startDate: '2024-04-01', endDate: '2024-10-31', priceTerm: 'Market + $2.00', status: 'Pending' },
  { id: 'C-104', commodity: 'Strawberries', supplier: 'Driscoll\'s', buyer: 'Berry Desk', startDate: '2023-01-01', endDate: '2023-12-31', priceTerm: '$16.00 / Flat', status: 'Expired' },
  { id: 'C-105', commodity: 'Pineapples', supplier: 'Dole', buyer: 'Tropicals', startDate: '2024-01-01', endDate: '2024-12-31', priceTerm: '$9.50 / Case', status: 'Active' },
];

const Contracts: React.FC = () => {
  const [filterCommodity, setFilterCommodity] = useState('');
  const [filterBuyer, setFilterBuyer] = useState('');

  const filteredContracts = MOCK_CONTRACTS.filter(c => {
    return (
      c.commodity.toLowerCase().includes(filterCommodity.toLowerCase()) &&
      c.buyer.toLowerCase().includes(filterBuyer.toLowerCase())
    );
  });

  return (
    <div className="p-8 bg-white min-h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-full text-[#004B87]">
            <FileText size={24} />
          </div>
          <div>
             <h1 className="text-2xl font-bold text-gray-900">Contract Pricing</h1>
             <p className="text-gray-500">View currently effective contract data.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mr-2">
                <Filter size={16} /> Filters:
            </div>
            <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Filter by Commodity..." 
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#004B87] focus:border-[#004B87]"
                    value={filterCommodity}
                    onChange={(e) => setFilterCommodity(e.target.value)}
                />
            </div>
             <div className="relative">
                <input 
                    type="text" 
                    placeholder="Filter by Buyer..." 
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[#004B87] focus:border-[#004B87]"
                    value={filterBuyer}
                    onChange={(e) => setFilterBuyer(e.target.value)}
                />
            </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing Term</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeframe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{contract.commodity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.supplier}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700 bg-blue-50 inline-block mt-3 ml-4 rounded px-2">{contract.priceTerm}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.buyer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contract.startDate} <span className="text-gray-300 mx-1">→</span> {contract.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${contract.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                  contract.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}>
                                {contract.status}
                            </span>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contracts;