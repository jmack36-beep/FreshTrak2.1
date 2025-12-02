import React, { useState } from 'react';
import { OwnBrandItem } from '../types';
import { Tag, X, Box, Scale, Layers, Wind, Thermometer, Droplets, Globe, Calendar, Search } from 'lucide-react';

const MOCK_CATALOG: OwnBrandItem[] = [
  {
    id: 'OB-101',
    sku: '883921',
    name: 'Premium Organic Spring Mix',
    brand: 'FreshHarvest',
    category: 'Salads',
    imageColor: 'bg-green-100',
    specs: {
      plu: '94567',
      caseDimensions: '19.75" x 11.88" x 8.5"',
      caseGrossWeight: '4.5 lbs',
      caseNetWeight: '3 lbs',
      caseCube: '1.15 ft³',
      palletTiHi: '8 x 9',
      ethanolSensitivity: 'High',
      ethanolProducer: false,
      idealTemp: '34°F - 36°F',
      idealHumidity: '95% - 98%',
      coo: 'USA',
      seasonality: 'Year Round (Yuma/Salinas)'
    }
  },
  {
    id: 'OB-102',
    sku: '772109',
    name: 'Gold Pineapple (Crownless)',
    brand: 'TropicSun',
    category: 'Tropicals',
    imageColor: 'bg-yellow-100',
    specs: {
      plu: '4430',
      caseDimensions: '23.5" x 15.5" x 5.5"',
      caseGrossWeight: '26 lbs',
      caseNetWeight: '24 lbs',
      caseCube: '1.35 ft³',
      palletTiHi: '5 x 12',
      ethanolSensitivity: 'Low',
      ethanolProducer: false,
      idealTemp: '45°F - 50°F',
      idealHumidity: '85% - 90%',
      coo: 'Costa Rica',
      seasonality: 'Year Round'
    }
  },
  {
    id: 'OB-103',
    sku: '556001',
    name: 'Organic Gala Apples (Bagged)',
    brand: 'Orchard Select',
    category: 'Fruit',
    imageColor: 'bg-red-100',
    specs: {
      plu: '94173',
      caseDimensions: '19.5" x 12.5" x 11.0"',
      caseGrossWeight: '42 lbs',
      caseNetWeight: '40 lbs',
      caseCube: '1.55 ft³',
      palletTiHi: '7 x 7',
      ethanolSensitivity: 'Moderate',
      ethanolProducer: true,
      idealTemp: '32°F - 34°F',
      idealHumidity: '90% - 95%',
      coo: 'USA (WA)',
      seasonality: 'Aug - May'
    }
  },
  {
    id: 'OB-104',
    sku: '223405',
    name: 'Russet Potatoes (5lb Bag)',
    brand: 'EarthBorn',
    category: 'Vegetables',
    imageColor: 'bg-amber-100',
    specs: {
      plu: 'N/A',
      caseDimensions: '24" x 16" x 8"',
      caseGrossWeight: '51 lbs',
      caseNetWeight: '50 lbs',
      caseCube: '1.78 ft³',
      palletTiHi: '5 x 8',
      ethanolSensitivity: 'Low',
      ethanolProducer: false,
      idealTemp: '45°F - 50°F',
      idealHumidity: '95%',
      coo: 'USA (ID)',
      seasonality: 'Year Round'
    }
  },
  {
    id: 'OB-105',
    sku: '119922',
    name: 'Mini Watermelon (Bin)',
    brand: 'SummerSweet',
    category: 'Melons',
    imageColor: 'bg-emerald-100',
    specs: {
      plu: '3421',
      caseDimensions: '48" x 40" x 36"',
      caseGrossWeight: '750 lbs',
      caseNetWeight: '700 lbs',
      caseCube: '40 ft³',
      palletTiHi: '1 x 1',
      ethanolSensitivity: 'High',
      ethanolProducer: true,
      idealTemp: '50°F - 60°F',
      idealHumidity: '90%',
      coo: 'Mexico/USA',
      seasonality: 'May - Sept'
    }
  }
];

const OwnBrands: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<OwnBrandItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MOCK_CATALOG.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.sku.includes(searchQuery) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-white min-h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-full text-[#004B87]">
            <Tag size={24} />
          </div>
          <div>
             <h1 className="text-2xl font-bold text-gray-900">Own Brands</h1>
             <p className="text-gray-500">Product specifications and packaging details.</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 max-w-lg">
            <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search by SKU, Name, or Category..." 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87] bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className={`h-40 ${item.imageColor} flex items-center justify-center relative`}>
                 <Tag size={48} className="text-gray-400 opacity-20" />
                 <span className="absolute bottom-2 right-2 text-xs font-bold text-gray-500 bg-white/80 px-2 py-1 rounded">
                    {item.brand}
                 </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-[#004B87] uppercase tracking-wide mb-1">{item.category}</p>
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                <div className="mt-4 flex items-center text-[#004B87] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Specs <span className="ml-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide-out Detail Panel */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedItem(null)}></div>
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-lg">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    
                    {/* Header */}
                    <div className="bg-[#004B87] px-4 py-6 sm:px-6 relative overflow-hidden">
                      <div className="flex items-start justify-between relative z-10">
                        <h2 className="text-lg font-semibold text-white">Item Specifications</h2>
                        <button className="text-blue-200 hover:text-white" onClick={() => setSelectedItem(null)}>
                          <X size={24} />
                        </button>
                      </div>
                      <div className="mt-4 relative z-10">
                         <h1 className="text-2xl font-bold text-white">{selectedItem.name}</h1>
                         <p className="text-blue-100 mt-1">{selectedItem.brand} • SKU {selectedItem.sku}</p>
                      </div>
                      <Tag size={120} className="absolute -bottom-6 -right-6 text-blue-800 opacity-20 transform -rotate-12" />
                    </div>

                    {/* Content */}
                    <div className="relative flex-1 px-4 py-8 sm:px-6 bg-gray-50">
                        
                        {/* Section: Logistics */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Logistics Data</h3>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <SpecItem icon={Box} label="Case Dimensions" value={selectedItem.specs.caseDimensions} />
                                <SpecItem icon={Box} label="Case Cube" value={selectedItem.specs.caseCube} />
                                <SpecItem icon={Scale} label="Gross Weight" value={selectedItem.specs.caseGrossWeight} />
                                <SpecItem icon={Scale} label="Net Weight" value={selectedItem.specs.caseNetWeight} />
                                <SpecItem icon={Layers} label="Pallet TiHi" value={selectedItem.specs.palletTiHi} />
                                <SpecItem icon={Tag} label="PLU #" value={selectedItem.specs.plu} />
                            </div>
                        </div>

                        {/* Section: Quality & Handling */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Storage & Handling</h3>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <SpecItem icon={Thermometer} label="Ideal Temperature" value={selectedItem.specs.idealTemp} />
                                <SpecItem icon={Droplets} label="Ideal Humidity" value={selectedItem.specs.idealHumidity} />
                                <SpecItem icon={Wind} label="Ethanol Sensitivity" value={selectedItem.specs.ethanolSensitivity} />
                                <SpecItem icon={Wind} label="Ethanol Producer" value={selectedItem.specs.ethanolProducer ? 'Yes' : 'No'} />
                            </div>
                        </div>

                         {/* Section: Origin */}
                         <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Origin & Seasonality</h3>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <SpecItem icon={Globe} label="Country of Origin" value={selectedItem.specs.coo} />
                                <SpecItem icon={Calendar} label="Seasonality" value={selectedItem.specs.seasonality} />
                            </div>
                        </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SpecItem: React.FC<{ icon: any, label: string, value: string }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="p-2 bg-white border border-gray-200 rounded-lg text-[#004B87] shadow-sm">
            <Icon size={18} />
        </div>
        <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default OwnBrands;