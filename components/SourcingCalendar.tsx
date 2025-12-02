import React, { useState } from 'react';
import { CalendarEvent } from '../types';
import { Calendar, X, Info } from 'lucide-react';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MOCK_EVENTS: CalendarEvent[] = [
    { id: 'E1', month: 0, title: 'Citrus Program', description: 'Finalizing Domestic Citrus program for Feb-Apr.', category: 'Program Start' },
    { id: 'E2', month: 2, title: 'Grape Negotiations', description: 'Mexico Table Grape discussions begin.', category: 'Negotiation' },
    { id: 'E3', month: 3, title: 'Stone Fruit Prep', description: 'Reviewing CA Stone Fruit crop estimates.', category: 'Harvest' },
    { id: 'E4', month: 5, title: 'Banana Contracts', description: 'Annual Banana contract negotiations with majors.', category: 'Negotiation' },
    { id: 'E5', month: 8, title: 'Melon Program', description: 'Import Melon program RFP.', category: 'Negotiation' },
    { id: 'E6', month: 9, title: 'Melon Finalization', description: 'Awarding contracts for Import Melons. Deadline Oct 31.', category: 'Negotiation' },
    { id: 'E7', month: 9, title: 'Thanksgiving Prep', description: 'Hard squash and sweet potato volume commits.', category: 'Program Start' },
    { id: 'E8', month: 10, title: 'Christmas Trees', description: 'Logistics coordination for tree delivery.', category: 'Program Start' },
];

const SourcingCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const getEventsForMonth = (monthIndex: number) => MOCK_EVENTS.filter(e => e.month === monthIndex);

  return (
    <div className="p-8 bg-white min-h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-100 rounded-full text-[#004B87]">
            <Calendar size={24} />
          </div>
          <div>
             <h1 className="text-2xl font-bold text-gray-900">Sourcing Calendar</h1>
             <p className="text-gray-500">Strategic negotiations and seasonal program roadmap.</p>
          </div>
        </div>

        {/* 12 Month Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {MONTHS.map((month, index) => {
                const events = getEventsForMonth(index);
                const hasNegotiation = events.some(e => e.category === 'Negotiation');
                
                return (
                    <div 
                        key={month}
                        onClick={() => setSelectedMonth(index)}
                        className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all relative overflow-hidden group h-48 flex flex-col justify-between`}
                    >
                        {/* Decorative background for months with negotiations */}
                        {hasNegotiation && (
                            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                        )}

                        <div className="relative z-10 flex justify-between items-start">
                             <h3 className="text-xl font-bold text-gray-800">{month}</h3>
                             {events.length > 0 && (
                                 <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                                     {events.length} Events
                                 </span>
                             )}
                        </div>

                        <div className="relative z-10 space-y-2 mt-4">
                            {events.slice(0, 2).map(e => (
                                <div key={e.id} className="text-xs truncate text-gray-600 flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                        e.category === 'Negotiation' ? 'bg-[#F37021]' :
                                        e.category === 'Program Start' ? 'bg-[#004B87]' : 'bg-green-400'
                                    }`}></div>
                                    {e.title}
                                </div>
                            ))}
                            {events.length > 2 && (
                                <div className="text-xs text-gray-400 italic">+ {events.length - 2} more</div>
                            )}
                        </div>

                         <div className="text-xs text-[#004B87] font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                             View Details →
                         </div>
                    </div>
                );
            })}
        </div>

        {/* Slide Out Panel for Details */}
        {selectedMonth !== null && (
            <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedMonth(null)}></div>
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="bg-[#004B87] px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-semibold text-white">
                                            {MONTHS[selectedMonth]} Sourcing Events
                                        </h2>
                                        <button className="text-blue-200 hover:text-white" onClick={() => setSelectedMonth(null)}>
                                            <X size={24} />
                                        </button>
                                    </div>
                                </div>
                                <div className="relative flex-1 px-4 py-6 sm:px-6 space-y-6">
                                    {getEventsForMonth(selectedMonth).length === 0 ? (
                                        <div className="text-center text-gray-500 py-10">
                                            <Info size={48} className="mx-auto text-gray-300 mb-4" />
                                            <p>No major sourcing events scheduled for this month.</p>
                                        </div>
                                    ) : (
                                        getEventsForMonth(selectedMonth).map(event => (
                                            <div key={event.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase
                                                        ${event.category === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                                                          event.category === 'Program Start' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                                                    `}>
                                                        {event.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                                            </div>
                                        ))
                                    )}
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

export default SourcingCalendar;