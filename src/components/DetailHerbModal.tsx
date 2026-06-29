import { X, Droplet, Sprout, ShieldAlert, BookOpen, Clock, Tag, Calendar, Compass } from 'lucide-react';
import { Herb } from '../types';
import { statusMap, getCategoryStyles, formatWateredTime } from './HerbCard';

interface DetailHerbModalProps {
  isOpen: boolean;
  herb: Herb | null;
  onClose: () => void;
  onWater: (id: string, notes?: string) => void;
}

export default function DetailHerbModal({ isOpen, herb, onClose, onWater }: DetailHerbModalProps) {
  if (!isOpen || !herb) return null;

  const currentStatus = statusMap[herb.status] || statusMap.healthy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1b1c16]/45 backdrop-blur-[4px] transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="bg-white w-full max-w-lg overflow-hidden rounded-xl border border-[#c0c9c0] relative z-10 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Visual Hero Header */}
        <div className="w-full h-44 bg-gradient-to-br from-[#cdebc4]/60 to-[#fbfaf0] flex items-center justify-center relative border-b border-[#c0c9c0]/30 shrink-0">
          <div className="flex flex-col items-center justify-center text-[#215336]">
            <div className="p-3 bg-white/80 rounded-full border border-[#c0c9c0]/40 shadow-sm mb-2">
              <Sprout className="w-12 h-12 stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#4b6546]">BOTANICAL FIELD LOG</span>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#1b1c16]/10 hover:bg-[#1b1c16]/25 text-[#1b1c16] hover:text-white rounded-full p-2 transition-colors cursor-pointer"
            title="Close log"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable specs sheet */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Title and Category */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#1b1c16]">{herb.name}</h2>
              <p className="italic text-[#414942] text-sm mt-1">{herb.latin}</p>
            </div>
            <span className={`px-3 py-1 text-xs rounded-full uppercase font-bold tracking-wider border shrink-0 ${getCategoryStyles(herb.category)}`}>
              {herb.category}
            </span>
          </div>

          {/* Description Block */}
          {herb.description && (
            <p className="text-sm text-[#414942] leading-relaxed bg-[#fbfaf0] p-4 rounded-lg border border-[#c0c9c0]/40 font-serif italic shadow-inner">
              "{herb.description}"
            </p>
          )}

          {/* Care Stats row */}
          <div className="grid grid-cols-2 gap-3 border-t border-b border-[#f0eee4] py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#eae8df] rounded-lg text-[#414942]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#414942]/60 uppercase tracking-wider block font-bold">Health Status</span>
                <span className={`text-xs font-semibold flex items-center gap-1.5 ${currentStatus.textColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`}></span>
                  {currentStatus.text}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#eae8df] rounded-lg text-[#215336]">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#414942]/60 uppercase tracking-wider block font-bold">Lapsed Time</span>
                <span className="text-xs font-semibold text-[#1b1c16]">
                  {formatWateredTime(herb.lastWatered)}
                </span>
              </div>
            </div>
          </div>

          {/* Botanical Specifications Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#215336] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-1">
              <Compass className="w-4 h-4" /> Ecological Preferences
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
              <div className="bg-[#f5f4ea]/50 p-3 rounded">
                <span className="font-semibold text-[#414942] block">Sunlight Preference:</span>
                <span className="text-[#1b1c16] font-medium">{herb.sunlight || 'Full Sun'}</span>
              </div>
              
              <div className="bg-[#f5f4ea]/50 p-3 rounded">
                <span className="font-semibold text-[#414942] block">Water Frequency:</span>
                <span className="text-[#1b1c16] font-medium">Every {herb.waterFrequencyDays} days</span>
              </div>

              <div className="bg-[#f5f4ea]/50 p-3 rounded sm:col-span-2">
                <span className="font-semibold text-[#414942] block">Soil Preference:</span>
                <span className="text-[#1b1c16] font-medium">{herb.soilPreference}</span>
              </div>

              {herb.plantedDate && (
                <div className="bg-[#f5f4ea]/50 p-3 rounded sm:col-span-2 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#414942] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Date Added to Garden:
                  </span>
                  <span className="font-mono text-[#1b1c16]">{new Date(herb.plantedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
            </div>
          </div>

          {/* Active Constituents & Therapeutic Actions */}
          {(herb.activeConstituents || herb.uses) && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-[#713b00] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-1">
                <Tag className="w-4 h-4" /> Botanical Science & Uses
              </h3>

              <div className="space-y-3">
                {herb.activeConstituents && herb.activeConstituents.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-[#414942] block uppercase tracking-wide">Key Active Constituents</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {herb.activeConstituents.map((c, i) => (
                        <span key={i} className="bg-amber-50 text-amber-900 text-[10px] font-semibold font-mono border border-amber-200/50 px-2 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {herb.uses && herb.uses.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-[#414942] block uppercase tracking-wide mt-1.5">Primary Benefits & Applications</span>
                    <ul className="list-disc pl-4 text-xs text-[#414942] mt-1.5 space-y-1">
                      {herb.uses.map((use, i) => (
                        <li key={i} className="font-sans font-medium">{use}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* History / Folklore section */}
          {herb.history && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-[#215336] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#f0eee4] pb-1">
                <BookOpen className="w-4 h-4" /> Folklore & History
              </h3>
              <p className="text-xs text-[#414942] leading-relaxed font-serif p-3 bg-stone-50 border border-stone-200 rounded">
                {herb.history}
              </p>
            </div>
          )}
        </div>

        {/* Footer Action Water Bar */}
        <div className="p-4 bg-[#fbfaf0] border-t border-[#c0c9c0] flex gap-3 shrink-0">
          <button
            onClick={() => onWater(herb.id)}
            className="w-full py-3 bg-[#215336] hover:bg-[#163623] text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow active:scale-[0.98] cursor-pointer"
          >
            <Droplet className="w-4 h-4" />
            Recalibrate & Water Herb
          </button>
        </div>
      </div>
    </div>
  );
}
