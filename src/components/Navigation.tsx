import { LayoutDashboard, Sprout, BookOpen, ClipboardList, Settings as SettingsIcon } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'dash', label: 'Dash', desktopLabel: 'Dashboard', icon: LayoutDashboard },
    { id: 'garden', label: 'Garden', desktopLabel: 'My Garden', icon: Sprout },
    { id: 'library', label: 'Library', desktopLabel: 'Herb Library', icon: BookOpen },
    { id: 'logs', label: 'Logs', desktopLabel: 'Planting Log', icon: ClipboardList },
    { id: 'settings', label: 'Settings', desktopLabel: 'Settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Bottom Navigation Bar (Mobile) - Hidden on desktop */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-2 pb-safe bg-[#fbfaf0]/95 backdrop-blur-md border-t border-[#c0c9c0] z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#215336] bg-[#cdebc4]/50 font-bold'
                  : 'text-[#414942] hover:bg-[#cdebc4]/10'
              }`}
              id={`nav-mobile-${tab.id}`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Side Navigation Bar (Desktop) - Hidden on mobile */}
      <aside className="hidden md:flex fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-[#fbfaf0] border-r border-[#c0c9c0] flex-col py-8 px-4 space-y-2">
        {tabs.slice(0, 4).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#cdebc4] text-[#1e5033] font-bold border-l-4 border-[#215336]'
                  : 'text-[#414942] hover:bg-[#eae8df] hover:text-[#1b1c16]'
              }`}
              id={`nav-desktop-${tab.id}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{tab.desktopLabel}</span>
            </button>
          );
        })}
        
        {/* Settings button pinned to the bottom */}
        <div className="mt-auto pt-4 border-t border-[#c0c9c0]/50">
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#cdebc4] text-[#1e5033] font-bold border-l-4 border-[#215336]'
                : 'text-[#414942] hover:bg-[#eae8df] hover:text-[#1b1c16]'
            }`}
            id="nav-desktop-settings"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
