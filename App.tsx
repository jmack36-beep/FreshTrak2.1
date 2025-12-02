import React, { useState } from 'react';
import { User } from './types';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import LogisticsDashboard from './components/LogisticsDashboard';
import HotBuys from './components/HotBuys';
import Contracts from './components/Contracts';
import SourcingCalendar from './components/SourcingCalendar';
import FieldFlash from './components/FieldFlash';
import TeamDirectory from './components/TeamDirectory';
import OwnBrands from './components/OwnBrands';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('hot-buys');

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('hot-buys');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
        case 'hot-buys': return <HotBuys />;
        case 'contracts': return <Contracts />;
        case 'calendar': return <SourcingCalendar />;
        case 'logistics': return <LogisticsDashboard user={user} />;
        case 'field-flash': return <FieldFlash />;
        case 'own-brands': return <OwnBrands />;
        case 'team-directory': return <TeamDirectory />;
        default: return <HotBuys />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
        <Sidebar 
            user={user} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onLogout={handleLogout} 
        />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {renderContent()}
        </div>
    </div>
  );
}