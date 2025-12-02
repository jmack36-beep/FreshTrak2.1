import React, { useState, useEffect } from 'react';
import { X, MapPin, Thermometer, Calendar, Package, ExternalLink, Send, ArrowRight } from 'lucide-react';
import { Shipment } from '../types';
import { draftInquiryResponse } from '../services/geminiService';

interface ShipmentDetailProps {
  shipment: Shipment | null;
  onClose: () => void;
}

const ShipmentDetail: React.FC<ShipmentDetailProps> = ({ shipment, onClose }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setFeedback(null);
    setMessage('');
  }, [shipment]);

  if (!shipment) return null;

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setIsSending(true);
    
    // Simulate interaction with Gemini for auto-response drafting
    const response = await draftInquiryResponse(message, shipment);
    
    setTimeout(() => {
      setFeedback("Logistics Team Notified. Auto-Response: " + response.slice(0, 100) + "...");
      setIsSending(false);
      setMessage('');
    }, 1500);
  };

  const items = shipment.items && shipment.items.length > 0 ? shipment.items : [shipment.description];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              
              {/* Header */}
              <div className="bg-[#004B87] px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-semibold text-white" id="slide-over-title">
                    Shipment Details
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="rounded-md bg-blue-800 text-blue-200 hover:text-white focus:outline-none"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-blue-100">PO # {shipment.poNumber}</p>
                </div>
              </div>

              {/* Body */}
              <div className="relative flex-1 px-4 py-6 sm:px-6">
                
                {/* Visual Tracker Placeholder */}
                <div className="mb-8 bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#004B87]"></div>
                       <span className="text-xs font-semibold text-gray-500">Origin</span>
                    </div>
                     <div className="h-0.5 flex-1 bg-gray-200 mx-2 relative">
                        {/* Progress indicator */}
                        <div className="absolute left-0 top-0 h-full bg-[#004B87]" style={{width: '60%'}}></div>
                        <div className="absolute right-[40%] -top-1.5 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></div>
                     </div>
                     <div className="flex items-center gap-2">
                       <span className="text-xs font-semibold text-gray-500">Dest</span>
                       <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-800 flex items-center justify-center gap-2">
                      <MapPin size={16} className="text-blue-500"/>
                      {shipment.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Last Updated: 15 mins ago</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Load #</h4>
                    <p className="text-gray-800 font-medium">{shipment.loadNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Status</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${shipment.status === 'On Time' ? 'bg-green-100 text-green-800' : 
                        shipment.status === 'Delayed' ? 'bg-orange-100 text-orange-800' :
                        shipment.status === 'Critical Temp' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {shipment.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Items Included</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                       <ul className="space-y-2">
                          {items.map((item, i) => (
                             <li key={i} className="flex items-center gap-2 text-gray-800 font-medium text-sm">
                                <Package size={16} className="text-gray-400 flex-shrink-0" />
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Temperature</h4>
                    <div className={`flex items-center gap-2 font-bold text-lg
                       ${shipment.temperature > 42 ? 'text-red-600' : 'text-[#004B87]'}
                    `}>
                      <Thermometer size={20} />
                      {shipment.temperature}°F
                    </div>
                  </div>
                   <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Est. Arrival</h4>
                    <div className="flex items-center gap-2 text-gray-800 font-medium">
                      <Calendar size={18} className="text-gray-400" />
                      {shipment.dueDate}
                    </div>
                  </div>
                </div>

                {/* FourKites Link */}
                <div className="mb-8">
                  <a href={shipment.trackingUrl} target="_blank" rel="noreferrer" 
                     className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                     <ExternalLink size={16} />
                     View Live FourKites Map
                  </a>
                </div>

                {/* Contact Logistics Team Form */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Request Info on this PO</h3>
                  
                  {feedback ? (
                    <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm mb-4 border border-blue-100">
                      {feedback}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message to Logistics</label>
                        <textarea
                          id="message"
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 p-3"
                          placeholder="E.g., Why is this delayed? We need this for a promo on Friday."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendMessage}
                        disabled={isSending}
                        className="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-[#F37021] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        {isSending ? 'Sending...' : 'Send Request'}
                        {!isSending && <Send size={16} className="ml-2" />}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetail;