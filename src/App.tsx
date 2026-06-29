import { useState, useEffect } from 'react';
import { 
  Sprout, 
  Droplet, 
  Compass, 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Check, 
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Flame,
  FileSpreadsheet
} from 'lucide-react';
import { Herb, GardenLog, LibraryItem, HerbCategory, HerbStatus } from './types';
import { INITIAL_HERBS, INITIAL_LOGS } from './data';
import Header from './components/Header';
import Navigation from './components/Navigation';
import StatsDashboard from './components/StatsDashboard';
import HerbCard from './components/HerbCard';
import AddHerbModal from './components/AddHerbModal';
import DetailHerbModal from './components/DetailHerbModal';
import LibraryTab from './components/LibraryTab';
import LogsTab from './components/LogsTab';
import SettingsTab from './components/SettingsTab';

const QUOTES = [
  { text: "To dwell is to garden.", author: "Martin Heidegger" },
  { text: "In all things of nature there is something of the marvelous.", author: "Aristotle" },
  { text: "The love of dirt is among the earliest of passions.", author: "Charles Dudley Warner" },
  { text: "The earth laughs in flowers.", author: "Ralph Waldo Emerson" },
  { text: "Deep in their roots, all flowers keep the light.", author: "Theodore Roethke" },
];

export default function App() {
  // Navigation & filtering state
  const [activeTab, setActiveTab] = useState<string>('garden'); // Garden is current active tab in mock
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [gardenFilter, setGardenFilter] = useState<'all' | 'healthy' | 'thirsty'>('all');
  const [gardenCategoryFilter, setGardenCategoryFilter] = useState<'All' | HerbCategory>('All');
  
  // Storage states
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [logs, setLogs] = useState<GardenLog[]>([]);
  const [gardenerName, setGardenerName] = useState<string>('Dr. Carl Linnaeus');
  const [climateZone, setClimateZone] = useState<string>('Temperate');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modal control states
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [selectedHerbId, setSelectedHerbId] = useState<string | null>(null);

  // In-app notifications/toast banner
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Fetch / Initialize storage from localStorage
  useEffect(() => {
    const savedHerbs = localStorage.getItem('herbvault_herbs');
    const savedLogs = localStorage.getItem('herbvault_logs');
    const savedName = localStorage.getItem('herbvault_name');
    const savedClimate = localStorage.getItem('herbvault_climate');
    const savedSound = localStorage.getItem('herbvault_sound');

    if (savedHerbs) {
      setHerbs(JSON.parse(savedHerbs));
    } else {
      setHerbs(INITIAL_HERBS);
      localStorage.setItem('herbvault_herbs', JSON.stringify(INITIAL_HERBS));
    }

    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      setLogs(INITIAL_LOGS);
      localStorage.setItem('herbvault_logs', JSON.stringify(INITIAL_LOGS));
    }

    if (savedName) setGardenerName(savedName);
    if (savedClimate) setClimateZone(savedClimate);
    if (savedSound) setSoundEnabled(JSON.parse(savedSound));
  }, []);

  // Write changes back to localStorage helper
  const saveHerbsToStorage = (newHerbs: Herb[]) => {
    setHerbs(newHerbs);
    localStorage.setItem('herbvault_herbs', JSON.stringify(newHerbs));
  };

  const saveLogsToStorage = (newLogs: GardenLog[]) => {
    setLogs(newLogs);
    localStorage.setItem('herbvault_logs', JSON.stringify(newLogs));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Sound cue simulation
  const playSoundCue = (type: 'water' | 'success' | 'click') => {
    if (!soundEnabled) return;
    try {
      const frequencies = { water: [440, 554, 659, 880], success: [523, 659, 784, 1046], click: [600] };
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      const wave = type === 'water' ? 'sine' : 'triangle';
      
      frequencies[type].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = wave as OscillatorType;
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.08, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.3);
      });
    } catch (e) {
      // Audio context may be blocked by user interactions, ignore gracefully
    }
  };

  // Gardener Greeting based on Hour
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Core Actions
  const handleWaterHerb = (herbId: string, customNotes?: string) => {
    const targetHerb = herbs.find((h) => h.id === herbId);
    if (!targetHerb) return;

    const updatedHerbs = herbs.map((h) => {
      if (h.id === herbId) {
        return {
          ...h,
          status: 'healthy' as HerbStatus,
          lastWatered: new Date().toISOString(),
        };
      }
      return h;
    });

    const newLog: GardenLog = {
      id: `log-${Date.now()}`,
      herbId,
      herbName: targetHerb.name,
      type: 'Watering',
      timestamp: new Date().toISOString(),
      notes: customNotes || `Performed routine watering. Soil hydrated successfully according to ${targetHerb.sunlight} transpiration rates.`,
      intensity: 'standard',
    };

    saveHerbsToStorage(updatedHerbs);
    saveLogsToStorage([newLog, ...logs]);
    playSoundCue('water');
    showToast(`Successfully watered ${targetHerb.name}!`, 'success');
  };

  const handleWaterAllThirsty = () => {
    const thirstyHerbs = herbs.filter((h) => h.status === 'thirst');
    if (thirstyHerbs.length === 0) return;

    const updatedHerbs = herbs.map((h) => {
      if (h.status === 'thirst') {
        return {
          ...h,
          status: 'healthy' as HerbStatus,
          lastWatered: new Date().toISOString(),
        };
      }
      return h;
    });

    const bulkWaterNotes = `Bulk garden hydration routine performed for: ${thirstyHerbs.map(h => h.name).join(', ')}. All specimens returned to Healthy state.`;
    const newLog: GardenLog = {
      id: `log-${Date.now()}`,
      type: 'Watering',
      timestamp: new Date().toISOString(),
      notes: bulkWaterNotes,
      intensity: 'heavy',
    };

    saveHerbsToStorage(updatedHerbs);
    saveLogsToStorage([newLog, ...logs]);
    playSoundCue('water');
    showToast(`Hydrated all ${thirstyHerbs.length} thirsty specimens successfully!`, 'success');
  };

  const handleSaveNewHerb = (newHerbData: Omit<Herb, 'id' | 'lastWatered'>) => {
    const newSpecimenId = `herb-${Date.now()}`;
    const newSpecimen: Herb = {
      ...newHerbData,
      id: newSpecimenId,
      lastWatered: new Date().toISOString(),
    };

    const newLog: GardenLog = {
      id: `log-add-${Date.now()}`,
      herbId: newSpecimenId,
      herbName: newSpecimen.name,
      type: 'Observation',
      timestamp: new Date().toISOString(),
      notes: `Propagated fresh young seedlings of ${newSpecimen.name} (${newSpecimen.latin}) into climate zone [${climateZone}]. Initially set base state as ${newSpecimen.status}.`,
      intensity: 'standard',
    };

    saveHerbsToStorage([newSpecimen, ...herbs]);
    saveLogsToStorage([newLog, ...logs]);
    playSoundCue('success');
    showToast(`Propagated ${newSpecimen.name} into garden!`, 'success');
  };

  const handlePropagateFromLibrary = (libItem: LibraryItem) => {
    const alreadyExists = herbs.some((h) => h.name.toLowerCase() === libItem.name.toLowerCase());
    
    if (alreadyExists) {
      showToast(`Specimen '${libItem.name}' is already growing in your garden!`, 'info');
      // Set active tab to garden so they can view it
      setActiveTab('garden');
      return;
    }

    const newHerb: Herb = {
      id: `herb-${Date.now()}`,
      name: libItem.name,
      latin: libItem.latin,
      category: libItem.category,
      status: 'healthy',
      lastWatered: new Date().toISOString(),
      waterFrequencyDays: libItem.waterFrequency.includes('3') ? 3 : libItem.waterFrequency.includes('7') ? 7 : 5,
      sunlight: libItem.sunlight,
      soilPreference: libItem.optimalSoil,
      activeConstituents: libItem.constituents,
      uses: libItem.therapeuticActions,
      description: libItem.description,
      plantedDate: new Date().toISOString(),
    };

    const newLog: GardenLog = {
      id: `log-prop-${Date.now()}`,
      herbId: newHerb.id,
      herbName: newHerb.name,
      type: 'Observation',
      timestamp: new Date().toISOString(),
      notes: `Successfully cloned and propagated premium seed varieties of ${newHerb.name} from the collective botanical encyclopedia. Seedlings thrive at ${newHerb.sunlight} exposure levels.`,
      intensity: 'standard',
    };

    saveHerbsToStorage([newHerb, ...herbs]);
    saveLogsToStorage([newLog, ...logs]);
    playSoundCue('success');
    showToast(`Propagated encyclopedia specimen ${newHerb.name}!`, 'success');
    setActiveTab('garden');
  };

  const handleCompostHerb = (id: string) => {
    const targetHerb = herbs.find((h) => h.id === id);
    if (!targetHerb) return;

    const filteredHerbs = herbs.filter((h) => h.id !== id);
    const newLog: GardenLog = {
      id: `log-del-${Date.now()}`,
      type: 'Observation',
      timestamp: new Date().toISOString(),
      notes: `Decommissioned and composted specimen ${targetHerb.name} (${targetHerb.latin}). Soil ingredients returned to local recycling mulch.`,
      intensity: 'light',
    };

    saveHerbsToStorage(filteredHerbs);
    saveLogsToStorage([newLog, ...logs]);
    setSelectedHerbId(null);
    playSoundCue('success');
    showToast(`Composted specimen ${targetHerb.name}.`, 'info');
  };

  const handleDeleteLog = (id: string) => {
    const updatedLogs = logs.filter((l) => l.id !== id);
    saveLogsToStorage(updatedLogs);
    showToast('Log entry purged successfully.', 'info');
  };

  // Database actions
  const handleResetToDemo = () => {
    if (window.confirm("Restore default historical herbs and logs? This will overwrite recent offline changes.")) {
      localStorage.removeItem('herbvault_herbs');
      localStorage.removeItem('herbvault_logs');
      setHerbs(INITIAL_HERBS);
      setLogs(INITIAL_LOGS);
      localStorage.setItem('herbvault_herbs', JSON.stringify(INITIAL_HERBS));
      localStorage.setItem('herbvault_logs', JSON.stringify(INITIAL_LOGS));
      showToast('Database reset to preloaded specimens.', 'success');
      playSoundCue('success');
    }
  };

  const handleWipeBlank = () => {
    if (window.confirm("Are you sure you want to compost your entire garden and clear logs? This is irreversible!")) {
      saveHerbsToStorage([]);
      saveLogsToStorage([]);
      showToast('Garden wiped completely blank.', 'error');
      playSoundCue('success');
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ herbs, logs, gardenerName, climateZone }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `herbvault_fieldnotes_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Field notes downloaded successfully.', 'success');
  };

  const handleSaveGardenerName = (name: string) => {
    setGardenerName(name);
    localStorage.setItem('herbvault_name', name);
  };

  const handleSaveClimateZone = (zone: string) => {
    setClimateZone(zone);
    localStorage.setItem('herbvault_climate', zone);
    showToast(`Biozone updated to ${zone}.`, 'info');
  };

  // Filtering calculations
  const totalCount = herbs.length;
  const healthyCount = herbs.filter((h) => h.status === 'healthy').length;
  const thirstyCount = herbs.filter((h) => h.status === 'thirst').length;

  const currentDetailHerb = herbs.find((h) => h.id === selectedHerbId) || null;

  // Render tabs
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dash':
        return renderDashboard();
      case 'garden':
        return renderGardenSpecimens();
      case 'library':
        return (
          <LibraryTab
            searchTerm={searchTerm}
            onPropagate={handlePropagateFromLibrary}
            propagatedIds={herbs.map((h) => h.name.toLowerCase())}
          />
        );
      case 'logs':
        return (
          <LogsTab
            logs={logs}
            herbs={herbs}
            searchTerm={searchTerm}
            onAddLog={handleSaveNewHerb as any}
            onDeleteLog={handleDeleteLog}
          />
        );
      case 'settings':
        return (
          <SettingsTab
            gardenerName={gardenerName}
            setGardenerName={handleSaveGardenerName}
            climateZone={climateZone}
            setClimateZone={handleSaveClimateZone}
            onResetData={handleResetToDemo}
            onClearAll={handleWipeBlank}
            onWaterAll={handleWaterAllThirsty}
            exportData={handleExportJSON}
            thirstyCount={thirstyCount}
          />
        );
      default:
        return renderGardenSpecimens();
    }
  };

  // Dashboard Tab Sub-renderer
  const renderDashboard = () => {
    const activeAlerts = herbs.filter((h) => h.status === 'thirst');
    const recentLogs = logs.slice(0, 3);
    const quoteIndex = new Date().getDate() % QUOTES.length;
    const quote = QUOTES[quoteIndex];

    return (
      <div className="space-y-6">
        {/* Welcome block */}
        <div className="bg-white p-6 rounded-xl border border-[#c0c9c0]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#215336]">
              {getGreeting()}, {gardenerName}!
            </h2>
            <p className="text-sm text-[#414942] mt-1.5 leading-relaxed max-w-xl">
              Nursery Biozone: <span className="font-semibold text-[#1e5033]">{climateZone} Climate</span>. Your plant collection is actively monitored. Complete routine hydration tasks to preserve moisture layers.
            </p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 border border-[#c0c9c0]/50 rounded-lg text-[#414942] hover:bg-[#eae8df]/40 transition-colors self-start md:self-auto flex items-center gap-2 cursor-pointer text-xs font-bold"
            title="Toggle botanical signals feedback"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#215336]" /> : <VolumeX className="w-4 h-4 text-red-700" />}
            {soundEnabled ? 'Signals: On' : 'Signals: Mut'}
          </button>
        </div>

        {/* Stats view */}
        <StatsDashboard
          totalCount={totalCount}
          healthyCount={healthyCount}
          thirstyCount={thirstyCount}
          filter={gardenFilter}
          setFilter={(f) => {
            setGardenFilter(f);
            setActiveTab('garden');
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active alerts column */}
          <div className="bg-white p-5 rounded-xl border border-[#c0c9c0]/50 flex flex-col shadow-sm">
            <h3 className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-2.5">
              <AlertTriangle className="w-4 h-4" /> Hydration Hotspots Required ({activeAlerts.length})
            </h3>
            
            {activeAlerts.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10 text-center gap-2">
                <div className="p-3 bg-[#cdebc4]/30 rounded-full text-[#215336]">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-xs text-[#414942] font-semibold italic">Nursery hydrated completely! No alarms.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#f0eee4] flex-1 overflow-y-auto max-h-60 mt-2">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="py-3 flex items-center justify-between group">
                    <div className="truncate pr-4">
                      <span className="font-semibold text-xs sm:text-sm text-[#1b1c16] group-hover:text-red-700 transition-colors uppercase font-sans">
                        {alert.name}
                      </span>
                      <p className="text-[11px] text-[#414942] italic mt-0.5 mt-0">{alert.latin}</p>
                    </div>
                    <button
                      onClick={() => handleWaterHerb(alert.id)}
                      className="text-[10px] font-bold bg-[#215336] hover:bg-[#163623] text-white px-2.5 py-1 rounded cursor-pointer transition-colors whitespace-nowrap"
                    >
                      Water
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick timeline column */}
          <div className="bg-white p-5 rounded-xl border border-[#c0c9c0]/50 flex flex-col shadow-sm">
            <h3 className="text-xs font-bold text-[#215336] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-2.5">
              <Clock className="w-4 h-4" /> Recent Timeline Entries
            </h3>
            
            {recentLogs.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-10 text-center text-xs text-[#414942] italic">
                Blank garden journal. Record an event to begin.
              </div>
            ) : (
              <div className="space-y-4 flex-1 overflow-y-auto max-h-62 mt-3 text-xs">
                {recentLogs.map((log) => (
                  <div key={log.id} className="border-l-2 border-[#215336] pl-3 py-0.5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-[#414942]/70 font-mono">
                      <span className="font-bold text-[#1b1c16]">{log.type}</span>
                      <span>{new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <p className="text-slate-600 font-serif italic line-clamp-2">"{log.notes}"</p>
                  </div>
                ))}
                
                <button
                  onClick={() => setActiveTab('logs')}
                  className="w-full text-center text-xs text-[#215336] hover:text-[#163623] font-bold flex items-center justify-center gap-1 mt-4"
                >
                  Browse Full Ledger <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Botanical quote of the day */}
        <div className="bg-stone-50 border border-[#c0c9c0]/40 p-5 rounded-xl text-center space-y-1">
          <p className="font-serif italic text-[#414942]/90 text-sm sm:text-base leading-relaxed">
            "{quote.text}"
          </p>
          <span className="text-[10.5px] uppercase font-mono tracking-widest text-[#713b00] block mt-1.5">
            — {quote.author}
          </span>
        </div>
      </div>
    );
  };

  // Garden Specimens Tab Renderer
  const renderGardenSpecimens = () => {
    // Interactive filter computations
    const filteredHerbs = herbs.filter((herb) => {
      const matchSearch =
        herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = 
        gardenFilter === 'all' ||
        (gardenFilter === 'healthy' && herb.status === 'healthy') ||
        (gardenFilter === 'thirsty' && herb.status === 'thirst');

      const matchCategory =
        gardenCategoryFilter === 'All' ||
        herb.category === gardenCategoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });

    const categoryTabs: ('All' | HerbCategory)[] = ['All', 'Medicinal', 'Culinary', 'Aromatic'];

    return (
      <div className="space-y-6">
        {/* Dynamic active filters row */}
        <div className="bg-white p-5 rounded-xl border border-[#c0c9c0] shadow-sm space-y-4">
          <h2 className="text-[13px] font-bold text-[#215336] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4" /> Filter Collection
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category selection */}
            <div className="flex flex-wrap gap-1.5">
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGardenCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all border cursor-pointer ${
                    gardenCategoryFilter === cat
                      ? 'bg-[#215336] text-white border-[#215336]'
                      : 'bg-white text-[#414942] border-[#c0c9c0]/40 hover:bg-[#eae8df]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick stats active notification bar */}
            {(gardenFilter !== 'all' || gardenCategoryFilter !== 'All') && (
              <button
                onClick={() => {
                  setGardenFilter('all');
                  setGardenCategoryFilter('All');
                }}
                className="text-[11px] text-red-700 font-bold hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Herb Grid */}
        {filteredHerbs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-[#c0c9c0]/50 shadow-sm space-y-3">
            <p className="text-[#414942] italic text-sm">No botanical specimens found matching current queries.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setGardenCategoryFilter('All');
                setGardenFilter('all');
              }}
              className="text-xs text-[#215336] font-bold underline cursor-pointer"
            >
              Reset active filter states
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="herb-grid">
            {filteredHerbs.map((herb) => (
              <HerbCard
                key={herb.id}
                herb={herb}
                onClick={() => setSelectedHerbId(herb.id)}
                onWaterClick={(e, id) => {
                  e.stopPropagation();
                  handleWaterHerb(id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-[#1b1c16] pb-24 md:pb-0 md:pl-64">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-55 bg-white border border-[#215336]/60 rounded-lg p-3.5 shadow-2xl max-w-sm flex items-center gap-3 animate-slideIn">
          <div className="p-1.5 bg-[#cdebc4]/50 rounded-full text-[#215336]">
            <Check className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold font-sans text-stone-800 pr-2 leading-tight">
            {notification.message}
          </p>
        </div>
      )}

      {/* Side and Bottom Navs */}
      <Navigation activeTab={activeTab} setActiveTab={(tab) => {
        setSearchTerm('');
        setActiveTab(tab);
      }} />

      {/* Main Header bar */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => setIsAddOpen(true)}
        activeTab={activeTab}
      />

      {/* App Body container */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Render actual content page */}
        {renderActiveTabContent()}

      </main>

      {/* Modals Deck */}
      <AddHerbModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleSaveNewHerb}
      />

      <DetailHerbModal
        isOpen={selectedHerbId !== null}
        herb={currentDetailHerb}
        onClose={() => setSelectedHerbId(null)}
        onWater={(id) => handleWaterHerb(id)}
      />
    </div>
  );
}
