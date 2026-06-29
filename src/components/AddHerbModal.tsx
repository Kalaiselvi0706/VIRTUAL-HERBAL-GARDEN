import React, { useState } from 'react';
import { X, Sprout, ShieldAlert, Sun, Droplet } from 'lucide-react';
import { Herb, HerbCategory, HerbStatus } from '../types';

interface AddHerbModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newHerb: Omit<Herb, 'id' | 'lastWatered'>) => void;
}

export default function AddHerbModal({ isOpen, onClose, onSave }: AddHerbModalProps) {
  const [name, setName] = useState('');
  const [latin, setLatin] = useState('');
  const [category, setCategory] = useState<HerbCategory>('Medicinal');
  const [status, setStatus] = useState<HerbStatus>('healthy');
  const [sunlight, setSunlight] = useState('Full Sun');
  const [waterFrequency, setWaterFrequency] = useState(5);
  const [soil, setSoil] = useState('Well-drained garden soil');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !latin.trim()) return;

    onSave({
      name: name.trim(),
      latin: latin.trim(),
      category,
      status,
      waterFrequencyDays: Number(waterFrequency),
      sunlight,
      soilPreference: soil.trim() || 'Well-draining rich soil',
      description: description.trim() || `${name} is an elegant garden specimen that thrives under customized organic care.`,
      activeConstituents: category === 'Medicinal' ? ['Volatile oils', 'Flavonoids'] : ['Organic compounds'],
      uses: category === 'Medicinal' ? ['General vitality support'] : ['Culinary enhancement'],
    });

    // Reset Form
    setName('');
    setLatin('');
    setCategory('Medicinal');
    setStatus('healthy');
    setSunlight('Full Sun');
    setWaterFrequency(5);
    setSoil('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dim overlay */}
      <div 
        className="absolute inset-0 bg-[#1b1c16]/40 backdrop-blur-[4px] transition-opacity"
        onClick={onClose}
      />

      {/* Main card box */}
      <div className="bg-white w-full max-w-md p-6 rounded-xl border border-[#c0c9c0] relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center mb-6 border-b border-[#f0eee4] pb-3">
          <div className="flex items-center gap-2 text-[#215336]">
            <Sprout className="w-5 h-5" />
            <h2 className="text-lg font-bold font-sans">Add New Herb Specimen</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-[#414942] hover:bg-[#eae8df] hover:text-[#1b1c16] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Herb Name */}
          <div>
            <label className="text-xs font-bold text-[#414942] block mb-1 uppercase tracking-wider">
              Herb Specimen Name *
            </label>
            <input
              className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-sm transition-all"
              placeholder="e.g. Lavender, Sweet Basil"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
          </div>

          {/* Latin / Scientific Name */}
          <div>
            <label className="text-xs font-bold text-[#414942] block mb-1 uppercase tracking-wider">
              Latin / Botanical Name *
            </label>
            <input
              className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-sm italic transition-all"
              placeholder="e.g. Lavandula angustifolia"
              value={latin}
              onChange={(e) => setLatin(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category selection */}
            <div>
              <label className="text-xs font-bold text-[#414942] block mb-1 uppercase tracking-wider">
                Category
              </label>
              <select
                className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value as HerbCategory)}
              >
                <option value="Medicinal">Medicinal</option>
                <option value="Culinary">Culinary</option>
                <option value="Aromatic">Aromatic</option>
              </select>
            </div>

            {/* Status selection */}
            <div>
              <label className="text-xs font-bold text-[#414942] block mb-1 uppercase tracking-wider">
                Health Status
              </label>
              <select
                className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value as HerbStatus)}
              >
                <option value="healthy">Healthy</option>
                <option value="thirst">Thirsty</option>
                <option value="dormant">Dormant</option>
              </select>
            </div>
          </div>

          {/* Additional details */}
          <div className="border-t border-[#f0eee4]/80 pt-4 space-y-4">
            <h3 className="text-xs font-bold text-[#215336] uppercase tracking-wide flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5" /> Watering & Environment Setup
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Sunlight Preference */}
              <div>
                <label className="text-[11px] font-medium text-[#414942] block mb-1">
                  Sunlight Requirement
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-xs"
                  value={sunlight}
                  onChange={(e) => setSunlight(e.target.value)}
                >
                  <option value="Full Sun">Full Sun</option>
                  <option value="Partial Shade">Partial Shade</option>
                  <option value="Bright Indirect">Bright Indirect</option>
                  <option value="Deep Shade">Deep Shade</option>
                </select>
              </div>

              {/* Water Frequency */}
              <div>
                <label className="text-[11px] font-medium text-[#414942] block mb-1">
                  Water Frequency (Days)
                </label>
                <input
                  className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-xs"
                  type="number"
                  min="1"
                  max="30"
                  value={waterFrequency}
                  onChange={(e) => setWaterFrequency(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Soil preference */}
            <div>
              <label className="text-[11px] font-medium text-[#414942] block mb-1">
                Soil Preference
              </label>
              <input
                className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-xs"
                placeholder="e.g. Gritty, well-draining moist sand"
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                type="text"
              />
            </div>

            {/* Custom Description */}
            <div>
              <label className="text-[11px] font-medium text-[#414942] block mb-1">
                Field Observation Notes
              </label>
              <textarea
                className="w-full px-3 py-2 bg-white border border-[#c0c9c0] rounded-lg focus:ring-1 focus:ring-[#215336] focus:border-[#215336] outline-none text-xs h-16 resize-none"
                placeholder="Describe leaf structure, odor, planting state, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-[#f0eee4] mt-6">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 py-2 border border-[#c0c9c0] text-[#414942] hover:bg-[#eae8df]/50 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-[#215336] hover:bg-[#163623] text-white rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm"
            >
              Save Specimen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
