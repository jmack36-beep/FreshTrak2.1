import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Search, Mail, Phone, Users, UserCircle } from 'lucide-react';

const MOCK_TEAM: TeamMember[] = [
  { id: '1', name: 'Eleanor Rigby', role: 'VP of Procurement', category: 'Executive', email: 'e.rigby@freshtrak.coop', phone: '(555) 123-4567' },
  { id: '2', name: 'Sarah Jenkins', role: 'Senior Buyer - Wet Veg', category: 'Produce Buying', email: 's.jenkins@freshtrak.coop', phone: '(555) 123-4568' },
  { id: '3', name: 'Mike Ross', role: 'Category Manager - Berries', category: 'Produce Buying', email: 'm.ross@freshtrak.coop', phone: '(555) 123-4569' },
  { id: '4', name: 'Juan Castillo', role: 'Buyer - Tropicals', category: 'Produce Buying', email: 'j.castillo@freshtrak.coop', phone: '(555) 123-4570' },
  { id: '5', name: 'Elena Rodriguez', role: 'Director of Floral', category: 'Floral Buying', email: 'e.rodriguez@freshtrak.coop', phone: '(555) 123-4571' },
  { id: '6', name: 'David Chen', role: 'Logistics Manager', category: 'Logistics', email: 'd.chen@freshtrak.coop', phone: '(555) 123-4572' },
  { id: '7', name: 'Marcus Johnson', role: 'Logistics Coordinator', category: 'Logistics', email: 'm.johnson@freshtrak.coop', phone: '(555) 123-4573' },
  { id: '8', name: 'Amanda Smith', role: 'QC Supervisor', category: 'Quality Control', email: 'a.smith@freshtrak.coop', phone: '(555) 123-4574' },
  { id: '9', name: 'Tom Baker', role: 'Accounting Lead', category: 'Accounting', email: 't.baker@freshtrak.coop', phone: '(555) 123-4575' },
  { id: '10', name: 'Linda Wu', role: 'Buyer - Hard Goods', category: 'Floral Buying', email: 'l.wu@freshtrak.coop', phone: '(555) 123-4576' },
  { id: '11', name: 'Sam Kolder', role: 'QC Inspector', category: 'Quality Control', email: 's.kolder@freshtrak.coop', phone: '(555) 123-4577' },
];

const CATEGORIES = ['All', 'Executive', 'Produce Buying', 'Floral Buying', 'Logistics', 'Quality Control', 'Accounting'];

const TeamDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTeam = MOCK_TEAM.filter(member => {
    const matchesCategory = selectedCategory === 'All' || member.category === selectedCategory;
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8 bg-white min-h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-100 rounded-full text-[#004B87]">
            <Users size={24} />
          </div>
          <div>
             <h1 className="text-2xl font-bold text-gray-900">Team Directory</h1>
             <p className="text-gray-500">Contact information for our department staff.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search by name, role, or department..." 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-transparent bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                            selectedCategory === cat 
                            ? 'bg-[#004B87] text-white border-[#004B87]' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeam.map(member => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                {member.imageUrl ? (
                                    <img src={member.imageUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <UserCircle size={32} />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                         </div>
                    </div>
                    
                    <span className={`self-start px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide mb-6
                        ${member.category === 'Produce Buying' ? 'bg-green-100 text-green-700' :
                          member.category === 'Floral Buying' ? 'bg-pink-100 text-pink-700' :
                          member.category === 'Logistics' ? 'bg-blue-100 text-blue-700' :
                          member.category === 'Quality Control' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'}
                    `}>
                        {member.category}
                    </span>

                    <div className="mt-auto space-y-2 pt-4 border-t border-gray-100">
                        <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#004B87] transition-colors">
                            <Mail size={16} /> {member.email}
                        </a>
                        <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#004B87] transition-colors">
                            <Phone size={16} /> {member.phone}
                        </a>
                    </div>
                </div>
            ))}
            
            {filteredTeam.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                    <p>No team members found matching your search.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TeamDirectory;