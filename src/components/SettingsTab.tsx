import { useState, FormEvent } from 'react';
import { Settings as SettingsIcon, RotateCcw, Trash2, Download, User, Compass, Droplet, Check, Play } from 'lucide-react';

interface SettingsTabProps {
  gardenerName: string;
  setGardenerName: (name: string) => void;
  climateZone: string;
  setClimateZone: (zone: string) => void;
  onResetData: () => void;
  onClearAll: () => void;
  onWaterAll: () => void;
  exportData: () => void;
  thirstyCount: number;
}

const CLIMATE_ZONES = [
  { id: 'Temperate', desc: 'Mild summers, cold wet winters. Standard watering schedules apply.' },
  { id: 'Mediterranean', desc: 'Hot dry summers, mild wet winters. Best for Lavender, Rosemary, and Oreganos.' },
  { id: 'Subtropical', desc: 'Humid hot summers, warm winters. Watch out for rapid peat evaporation.' },
  { id: 'Arid / Desert', desc: 'Extremely dry, high temperature fluctuations. Double watering frequencies.' },
];

export default function SettingsTab({
  gardenerName,
  setGardenerName,
  climateZone,
  setClimateZone,
  onResetData,
  onClearAll,
  onWaterAll,
  exportData,
  thirstyCount,
}: SettingsTabProps) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [localName, setLocalName] = useState(gardenerName);

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    setGardenerName(localName.trim() || 'Botanist Companion');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Editorial Header */}
      <div className="bg-white p-6 rounded-xl border border-[#c0c9c0] shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#215336] flex items-center gap-2">
          <SettingsIcon className="w-5.5 h-5.5" /> Garden Configurations
        </h2>
        <p className="text-xs sm:text-sm text-[#414942] mt-1.5 leading-relaxed">
          Calibrate climates, manage gardener certifications, and maintain the integrity of your offline field notes.
        </p>
      </div>

      {/* Gardener profile section */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#c0c9c0]/50 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#215336] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-1.5">
          <User className="w-4 h-4" /> Gardener Profile
        </h3>
        <form onSubmit={handleSaveProfile} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-[#414942] block mb-1">Gardener / Investigator Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#215336] max-w-sm"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="e.g. Dr. Carl Linnaeus"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#215336] hover:bg-[#163623] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" /> Profile Updated
              </>
            ) : (
              'Save Profile'
            )}
          </button>
        </form>
      </div>

      {/* Ecology Setup */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#c0c9c0]/50 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#215336] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-1.5">
          <Compass className="w-4 h-4" /> Eco-System & Regional Climate
        </h3>
        <p className="text-xs text-[#414942]/90 leading-relaxed">
          Selecting your regional biozone helps understand watering trends and adjust botanical evaporation calculations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {CLIMATE_ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setClimateZone(zone.id)}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col ${
                climateZone === zone.id
                  ? 'border-[#215336] bg-[#cdebc4]/20 ring-1 ring-[#215336]'
                  : 'border-[#c0c9c0]/50 hover:bg-[#eae8df]/30 bg-stone-50/20'
              }`}
            >
              <span className="text-xs font-bold text-[#1b1c16]">{zone.id}</span>
              <p className="text-[10.5px] text-[#414942] mt-1 leading-relaxed">{zone.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Global Actions */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#c0c9c0]/50 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-1.5 border-red-100">
          <Droplet className="w-4 h-4" /> Batch Garden Operations
        </h3>
        <p className="text-xs text-[#414942]/90 leading-relaxed">
          Perform bulk maintenance routines on all listed botanical elements in a single click.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onWaterAll}
            disabled={thirstyCount === 0}
            className={`px-4 py-2 text-xs font-bold border rounded-lg flex items-center gap-1.5 transition-all transition-colors ${
              thirstyCount === 0
                ? 'bg-[#eae8df]/50 border-[#c0c9c0]/40 text-[#414942]/50 cursor-not-allowed'
                : 'bg-white border-[#215336] text-[#215336] hover:bg-[#cdebc4]/20 active:scale-95 cursor-pointer'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            Hydrate All Thirsty Plants ({thirstyCount})
          </button>
        </div>
      </div>

      {/* Database control deck */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#c0c9c0]/50 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#414942] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-1.5">
          <Trash2 className="w-4 h-4 text-red-700" /> Database & Backup Controls
        </h3>
        <p className="text-xs text-[#414942]/90 leading-relaxed">
          In case of cataloging corruption or file transfer needs, manage your raw browser storage logs here.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Download JSON */}
          <button
            onClick={exportData}
            className="px-3.5 py-2.5 border border-[#c0c9c0] hover:border-[#215336] font-bold text-xs text-[#414942] hover:text-[#215336] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white"
          >
            <Download className="w-3.5 h-3.5" /> Export Field Notes
          </button>

          {/* Reset database */}
          <button
            onClick={onResetData}
            className="px-3.5 py-2.5 border border-[#c0c9c0] hover:border-[#713b00] font-bold text-xs text-[#414942] hover:text-[#713b00] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Seed/Reset Demo
          </button>

          {/* Wipe completely */}
          <button
            onClick={onClearAll}
            className="px-3.5 py-2.5 border border-red-200 hover:bg-red-50 font-bold text-xs text-red-700 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white"
          >
            <Trash2 className="w-3.5 h-3.5" /> Wipe Garden Blank
          </button>
        </div>
      </div>
    </div>
  );
}
