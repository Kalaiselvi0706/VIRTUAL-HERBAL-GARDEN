import { useState } from 'react';
import { BookOpen, Search, Compass, ShieldAlert, Sparkles, Sprout, Plus, Check } from 'lucide-react';
import { LibraryItem, HerbCategory } from '../types';
import { LIBRARY_DATABASE } from '../data';
import { getCategoryStyles } from './HerbCard';

interface LibraryTabProps {
  searchTerm: string;
  onPropagate: (item: LibraryItem) => void;
  propagatedIds: string[];
}

export default function LibraryTab({ searchTerm, onPropagate, propagatedIds }: LibraryTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | HerbCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: ('All' | HerbCategory)[] = ['All', 'Medicinal', 'Culinary', 'Aromatic'];

  const filteredItems = LIBRARY_DATABASE.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.therapeuticActions.some((act) => act.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.constituents.some((con) => con.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Editorial Header */}
      <div className="bg-white p-6 rounded-xl border border-[#c0c9c0]/60 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#215336] flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Botanical Encyclopedia
          </h2>
          <p className="text-xs sm:text-sm text-[#414942] mt-1.5 max-w-xl leading-relaxed">
            Expand your horticultural knowledge. Study therapeutic actions and environmental tolerances, or propagate verified specimens directly into your active garden.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-[#f5f4ea] px-3 py-1.5 rounded-lg border border-[#c0c9c0]/40 shrink-0 self-start">
          <Sparkles className="w-3.5 h-3.5 text-[#713b00]" />
          <span>Curated Profiles: {LIBRARY_DATABASE.length}</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#215336] text-white border-[#215336] shadow-sm'
                : 'bg-white text-[#414942] border-[#c0c9c0]/50 hover:bg-[#eae8df]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#c0c9c0] p-6">
          <p className="text-[#414942] text-sm italic">No botanical specimens match your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            const hasBeenPropagated = propagatedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border transition-all flex flex-col p-5 shadow-sm hover:shadow-md ${
                  isExpanded ? 'border-[#215336] ring-1 ring-[#cdebc4]' : 'border-[#c0c9c0]/65 hover:border-[#4b6546]'
                }`}
              >
                {/* Header line */}
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-sans font-bold text-base text-[#1b1c16]">{item.name}</h3>
                    <p className="italic text-[#414942] text-[13px] mt-0.5">{item.latin}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] rounded-full uppercase font-bold tracking-wider border shrink-0 ${getCategoryStyles(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                {/* Primary excerpt */}
                <p className="text-xs text-[#414942] line-clamp-3 leading-relaxed mt-2">
                  {item.description}
                </p>

                {/* Core quick ecology stats */}
                <div className="grid grid-cols-2 gap-2 my-4 bg-[#fbfaf0] p-3 rounded-lg border border-[#f0eee4] text-[11px] text-[#414942]">
                  <div className="truncate">
                    <span className="font-bold text-[#215336] block">SUNLIGHT:</span>
                    <span className="font-medium">{item.sunlight}</span>
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-[#215336] block">WATER:</span>
                    <span className="font-medium">{item.waterFrequency}</span>
                  </div>
                </div>

                {/* Expanded botanical profile details drawer */}
                {isExpanded && (
                  <div className="mt-2 pt-4 border-t border-[#f0eee4] space-y-4 text-xs transition-all animate-fadeIn">
                    
                    {/* Active Constituents */}
                    <div>
                      <span className="font-bold text-[#414942] block uppercase tracking-wider text-[9px]">Therapeutic Actions & Profile</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.therapeuticActions.map((action, idx) => (
                          <span key={idx} className="bg-[#cdebc4]/40 text-[#1e5033] px-2 py-0.5 rounded text-[10px] font-semibold font-mono">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Chemical components */}
                    <div>
                      <span className="font-bold text-[#414942] block uppercase tracking-wider text-[9px]">Active Phytochemicals</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.constituents.map((chem, idx) => (
                          <span key={idx} className="bg-amber-50 text-amber-900 border border-amber-200/50 px-2 py-0.5 rounded text-[10px] font-semibold font-mono">
                            {chem}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Companions */}
                    {item.bestCompanions && item.bestCompanions.length > 0 && (
                      <div>
                        <span className="font-bold text-[#414942] block uppercase tracking-wider text-[9px]">Optimal Botanical Companions</span>
                        <p className="text-[#1b1c16] font-medium mt-1">
                          {item.bestCompanions.join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Safety alert caution */}
                    {item.contraindications && (
                      <div className="p-2.5 bg-red-50 rounded border border-red-100 flex items-start gap-2 text-[11px] text-red-900">
                        <ShieldAlert className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Horticultural Safety Warning</span>
                          <p className="italic text-red-800/90 mt-0.5">{item.contraindications}</p>
                        </div>
                      </div>
                    )}

                    {/* Soil */}
                    <div className="text-[11px] text-[#414942]">
                      <span className="font-bold block uppercase tracking-wider text-[9px]">Soil Preference</span>
                      <p className="mt-0.5 italic">{item.optimalSoil}</p>
                    </div>

                  </div>
                )}

                {/* Card CTA row */}
                <div className="mt-auto pt-4 flex gap-2 border-t border-[#f0eee4]/60">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="flex-1 py-1.5 border border-[#c0c9c0] text-[#414942] rounded-lg text-xs font-semibold hover:bg-[#eae8df]/40 cursor-pointer self-stretch text-center"
                  >
                    {isExpanded ? 'Less Specs' : 'Full Manual'}
                  </button>
                  <button
                    onClick={() => onPropagate(item)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                      hasBeenPropagated
                        ? 'bg-[#cdebc4]/40 text-[#1e5033] cursor-not-allowed'
                        : 'bg-[#215336] hover:bg-[#163623] text-white shadow-sm'
                    }`}
                    disabled={hasBeenPropagated}
                  >
                    {hasBeenPropagated ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Propagated
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        Propagate
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
