import { Search, Plus, Leaf } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddClick: () => void;
  activeTab: string;
  onLogout: () => void;
}

export default function Header({
  searchTerm,
  setSearchTerm,
  onAddClick,
  activeTab,
  onLogout
}: HeaderProps){
  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case 'garden':
        return 'Search your garden...';
      case 'library':
        return 'Search botanical library...';
      case 'logs':
        return 'Search garden logs...';
      default:
        return 'Search HerbVault...';
    }
  };

  return (
    <header className="bg-[#fbfaf0] sticky top-0 z-40 border-b border-[#c0c9c0] w-full">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex justify-between items-center bg-[#fbfaf0]">
        
        {/* Logo and branding */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#cdebc4]/50 rounded-lg text-[#215336]">
            <Leaf className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold font-sans text-[#215336] tracking-tight flex items-center gap-1">
            HerbVault
            <span className="text-xs font-normal text-[#414942] bg-[#f0eee4] px-2 py-0.5 rounded border border-[#c0c9c0] font-mono hidden sm:inline-block">v1.0</span>
          </h1>
        </div>

        {/* Desktop Search input - Hidden on mobile */}
        {activeTab !== 'settings' && (
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414942] w-4 h-4" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none transition-all text-sm font-sans"
              type="text"
              placeholder={getSearchPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="desktop-search"
            />
          </div>
        )}

        {/* Global CTA "Add Herb" button */}
        <button
          onClick={onAddClick}
          
          className="bg-[#215336] hover:bg-[#163623] active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow"
          id="add-herb-btn"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Herb</span>
        </button>
        <button
  onClick={onLogout}
  className="ml-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
>
  Logout
</button>
      </div>

      {/* Mobile Search input - Hidden on desktop */}
      {activeTab !== 'settings' && (
        <div className="md:hidden px-4 pb-3 bg-[#fbfaf0]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414942] w-4 h-4" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-sm transition-all text-sans"
              type="text"
              placeholder={getSearchPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="mobile-search"
            />
          </div>
        </div>
      )}
    </header>
  );
}
