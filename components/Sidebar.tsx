import React from 'react';
import { Truck, ShoppingBag, FileText, Calendar, TrendingUp, LogOut, Users, Tag } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
    user: User;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, setActiveTab, onLogout }) => {
    
    const menuItems = [
        { id: 'hot-buys', label: 'Hot Buys', icon: ShoppingBag },
        { id: 'contracts', label: 'Contracts', icon: FileText },
        { id: 'calendar', label: 'Sourcing Calendar', icon: Calendar },
        { id: 'logistics', label: 'Logistics', icon: Truck },
        { id: 'field-flash', label: 'Field Flash', icon: TrendingUp },
        { id: 'own-brands', label: 'Own Brands', icon: Tag },
        { id: 'team-directory', label: 'Team Directory', icon: Users },
    ];

    return (
        <div className="w-64 bg-[#004B87] text-white flex flex-col h-screen flex-shrink-0 font-sans">
            {/* Logo Area */}
            <div className="p-6 border-b border-blue-800">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-[#004B87] text-lg font-extrabold">F</span>
                    </div>
                    FreshTrak
                </div>
                <p className="text-xs text-blue-200 mt-1 uppercase tracking-wider">Member Portal</p>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menuItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive 
                                ? 'bg-[#F37021] text-white shadow-lg shadow-orange-900/20' 
                                : 'text-blue-100 hover:bg-blue-800'
                            }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-blue-800 bg-[#003B6F]">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-2 border-blue-400">
                        {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-blue-300 truncate">{user.department}</p>
                    </div>
                </div>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-900 rounded-lg text-xs font-medium text-blue-300 hover:text-white hover:bg-blue-800 transition-colors"
                >
                    <LogOut size={14} /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;