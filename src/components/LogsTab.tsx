import React, { useState } from 'react';
import { ClipboardList, Plus, Search, Calendar, Droplet, Eye, Trash2, ArrowUpRight, Leaf, Sparkles } from 'lucide-react';
import { GardenLog, LogType, Herb } from '../types';

interface LogsTabProps {
  logs: GardenLog[];
  herbs: Herb[];
  searchTerm: string;
  onAddLog: (log: Omit<GardenLog, 'id' | 'timestamp'>) => void;
  onDeleteLog: (id: string) => void;
}

export default function LogsTab({ logs, herbs, searchTerm, onAddLog, onDeleteLog }: LogsTabProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [herbId, setHerbId] = useState('');
  const [type, setType] = useState<LogType>('Observation');
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'heavy' | 'standard'>('standard');
  const [notes, setNotes] = useState('');

  // Filtering logs
  const filteredLogs = logs.filter((log) => {
    const textMatches =
      log.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.herbName && log.herbName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.type.toLowerCase().includes(searchTerm.toLowerCase());
    return textMatches;
  });

  const getLogIconColors = (logType: LogType) => {
    switch (logType) {
      case 'Watering':
        return { bg: 'bg-blue-50 border-blue-100 text-blue-600', icon: Droplet };
      case 'Pruning':
        return { bg: 'bg-amber-50 border-amber-100 text-amber-600', icon: Leaf };
      case 'Repotting':
        return { bg: 'bg-purple-50 border-purple-100 text-purple-600', icon: ArrowUpRight };
      case 'Harvesting':
        return { bg: 'bg-emerald-50 border-emerald-100 text-emerald-600', icon: Sparkles };
      case 'Observation':
      default:
        return { bg: 'bg-gray-50 border-gray-100 text-gray-600', icon: Eye };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    const selectedHerb = herbs.find((h) => h.id === herbId);

    onAddLog({
      herbId: herbId || undefined,
      herbName: selectedHerb ? selectedHerb.name : undefined,
      type,
      notes: notes.trim(),
      intensity,
    });

    // Reset Form
    setHerbId('');
    setType('Observation');
    setIntensity('standard');
    setNotes('');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Editorial Header bar */}
      <div className="bg-white p-6 rounded-xl border border-[#c0c9c0] flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#215336] flex items-center gap-2">
            <ClipboardList className="w-5.5 h-5.5" /> Gardener's Field Book
          </h2>
          <p className="text-xs sm:text-sm text-[#414942] mt-1.5 max-w-xl leading-relaxed">
            A chronological timeline detailing all watering, propagation, pruning, and health observations made within your private herb nursery.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-[#215336] hover:bg-[#163623] text-white px-4 py-2 bg-[#215336] rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors self-start cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {isFormOpen ? 'Close Logger' : 'Log Daily Event'}
        </button>
      </div>

      {/* Manual Logger Drawer Form */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-xl border-2 border-[#215336] shadow-md animate-slideDown">
          <h3 className="text-sm font-bold text-[#215336] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4" /> Capture New Botanical Event
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Herb mapping */}
              <div>
                <label className="text-xs font-bold text-[#414942] block mb-1">Target Specimen</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#215336]"
                  value={herbId}
                  onChange={(e) => setHerbId(e.target.value)}
                >
                  <option value="">General Nursery / All Herbs</option>
                  {herbs.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.latin})
                    </option>
                  ))}
                </select>
              </div>

              {/* Log Event type */}
              <div>
                <label className="text-xs font-bold text-[#414942] block mb-1">Event Classification</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#215336]"
                  value={type}
                  onChange={(e) => setType(e.target.value as LogType)}
                >
                  <option value="Observation">Daily Observation</option>
                  <option value="Watering">Watering & Hydration</option>
                  <option value="Pruning">Pruning & Trimming</option>
                  <option value="Repotting">Peat & Repotting</option>
                  <option value="Harvesting">Harvesting Foliage</option>
                </select>
              </div>

              {/* Intensity level */}
              <div>
                <label className="text-xs font-bold text-[#414942] block mb-1">Scope / Intensity</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#215336]"
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value as any)}
                >
                  <option value="standard">Standard / Moderate</option>
                  <option value="light">Light / Minimal</option>
                  <option value="heavy">Heavy / Intense</option>
                </select>
              </div>
            </div>

            {/* Event annotation notes */}
            <div>
              <label className="text-xs font-bold text-[#414942] block mb-1">Annotated Botanical Notes *</label>
              <textarea
                className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg text-xs h-20 outline-none focus:ring-1 focus:ring-[#215336] resize-none"
                placeholder="Describe physiological symptoms, leaf growth rates, water quantities pre-applied, and soil odors."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-[#c0c9c0] rounded-lg text-xs font-bold hover:bg-[#fbfaf0] cursor-pointer"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#215336] hover:bg-[#163623] text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Log Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline Stream */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-[#c0c9c0] text-center">
            <p className="text-sm text-[#414942] italic">No daily observations logged yet.</p>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l border-[#c0c9c0] ml-3 sm:ml-4 space-y-6 py-2">
            {filteredLogs.map((log) => {
              const { bg, icon: LogIcon } = getLogIconColors(log.type);
              return (
                <div key={log.id} className="relative group animate-fadeIn" id={`log-item-${log.id}`}>
                  
                  {/* Bullet symbol */}
                  <span className={`absolute -left-10 sm:-left-12 top-1.5 p-1 rounded-full border ${bg} shadow-sm group-hover:scale-110 transition-transform`}>
                    <LogIcon className="w-4 h-4" />
                  </span>

                  {/* Log journal card */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#c0c9c0]/50 shadow-sm hover:border-[#4b6546] hover:shadow transition-all relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pb-2.5 border-b border-[#f0eee4] mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1b1c16] uppercase tracking-wide">
                          {log.type}
                        </span>
                        {log.herbName ? (
                          <span className="text-[10px] bg-[#cdebc4]/50 border border-[#c0c9c0]/40 text-[#1e5033] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <Leaf className="w-2.5 h-2.5" />
                            {log.herbName}
                          </span>
                        ) : (
                          <span className="text-[10px] bg-[#f0eee4] text-[#414942] px-2 py-0.5 rounded-full font-bold">
                            General Garden
                          </span>
                        )}
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-amber-50 text-amber-900 rounded border border-amber-200/50">
                          {log.intensity || 'standard'}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#414942]/70 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(log.timestamp).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#414942] leading-relaxed font-serif italic">
                      "{log.notes}"
                    </p>

                    {/* Delete entry */}
                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="absolute bottom-4 right-4 p-1 rounded hover:bg-[#ffdad6] text-[#414942]/40 hover:text-[#ba1a1a] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Purge observation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
