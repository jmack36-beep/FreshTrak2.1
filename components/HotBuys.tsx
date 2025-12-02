import React, { useState } from 'react';
import { HotBuy } from '../types';
import { ShoppingBag, Clock, Check, AlertCircle } from 'lucide-react';

const MOCK_HOT_BUYS: HotBuy[] = [
  {
    id: 'HB-001',
    commodity: 'Raspberries',
    variety: 'Organic, 6oz',
    price: 18.50,
    unit: 'Case (12ct)',
    totalQty: 500,
    remainingQty: 42,
    postedBy: 'Mike (Berry Desk)',
    expiry: '2h 15m',
    isSoldOut: false
  },
  {
    id: 'HB-002',
    commodity: 'Asparagus',
    variety: 'Large Green, 11lb',
    price: 22.00,
    unit: 'Case',
    totalQty: 200,
    remainingQty: 0,
    postedBy: 'Sarah (Veg Desk)',
    expiry: 'Expired',
    isSoldOut: true
  },
  {
    id: 'HB-003',
    commodity: 'Mangos',
    variety: 'Tommy Atkins, 9ct',
    price: 4.50,
    unit: 'Case',
    totalQty: 1000,
    remainingQty: 650,
    postedBy: 'Juan (Tropicals)',
    expiry: '1d 4h',
    isSoldOut: false
  },
  {
    id: 'HB-004',
    commodity: 'Tulips',
    variety: 'Assorted Colors, 10-stem',
    price: 5.75,
    unit: 'Bunch',
    totalQty: 300,
    remainingQty: 120,
    postedBy: 'Floral Team',
    expiry: '4h 00m',
    isSoldOut: false
  }
];

const HotBuys: React.FC = () => {
  const [buys, setBuys] = useState<HotBuy[]>(MOCK_HOT_BUYS);
  const [claimAmounts, setClaimAmounts] = useState<Record<string, number>>({});

  const handleClaim = (id: string) => {
    const amount = claimAmounts[id] || 0;
    if (amount <= 0) return;

    setBuys(current => current.map(buy => {
      if (buy.id === id) {
        const newRemaining = Math.max(0, buy.remainingQty - amount);
        return {
          ...buy,
          remainingQty: newRemaining,
          isSoldOut: newRemaining === 0
        };
      }
      return buy;
    }));
    
    // Reset input
    setClaimAmounts(prev => ({ ...prev, [id]: 0 }));
    alert(`Successfully claimed ${amount} units! Confirmation sent.`);
  };

  return (
    <div className="p-8 bg-white min-h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-orange-100 rounded-full text-[#F37021]">
            <Clock size={24} />
          </div>
          <div>
             <h1 className="text-2xl font-bold text-gray-900">Hot Buys</h1>
             <p className="text-gray-500">Limited time spot-market opportunities.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buys.map(buy => (
            <div key={buy.id} className={`bg-white rounded-xl shadow-sm border ${buy.isSoldOut ? 'border-gray-200 opacity-75' : 'border-orange-100'} overflow-hidden relative`}>
              {buy.isSoldOut && (
                <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
                  <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold transform -rotate-12 shadow-xl border-2 border-white">
                    SOLD OUT
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 mb-2">{buy.postedBy}</span>
                    <h3 className="text-xl font-bold text-gray-800">{buy.commodity}</h3>
                    <p className="text-sm text-gray-500">{buy.variety}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#004B87]">${buy.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">per {buy.unit}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className={buy.remainingQty < 50 ? "text-red-500" : "text-gray-600"}>
                      {buy.remainingQty} remaining
                    </span>
                    <span className="text-gray-400">{buy.totalQty} total</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${buy.remainingQty < 50 ? 'bg-red-500' : 'bg-[#004B87]'}`} 
                      style={{ width: `${(buy.remainingQty / buy.totalQty) * 100}%` }}
                    ></div>
                  </div>
                  {!buy.isSoldOut && (
                    <p className="text-xs text-[#F37021] mt-2 flex items-center gap-1">
                      <Clock size={12} /> Expires in {buy.expiry}
                    </p>
                  )}
                </div>

                {/* Claim Action */}
                <div className="flex gap-2 mt-6">
                  <input 
                    type="number" 
                    min="1" 
                    max={buy.remainingQty}
                    placeholder="Qty"
                    disabled={buy.isSoldOut}
                    value={claimAmounts[buy.id] || ''}
                    onChange={(e) => setClaimAmounts(prev => ({...prev, [buy.id]: parseInt(e.target.value)}))}
                    className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-[#004B87] focus:border-[#004B87] disabled:bg-gray-100"
                  />
                  <button 
                    onClick={() => handleClaim(buy.id)}
                    disabled={buy.isSoldOut || !claimAmounts[buy.id]}
                    className="flex-1 bg-[#F37021] text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} /> Claim Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotBuys;