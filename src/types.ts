export type HerbCategory = 'Medicinal' | 'Culinary' | 'Aromatic';
export type HerbStatus = 'healthy' | 'thirst' | 'dormant';

export interface Herb {
  id: string;
  name: string;
  latin: string;
  category: HerbCategory;
  status: HerbStatus;
  lastWatered: string; // ISO date-string or readable text
  waterFrequencyDays: number; // e.g. 3 days, 5 days, etc.
  sunlight: string; // e.g. "Full Sun", "Bright Indirect", "Partial Shade"
  soilPreference: string; // e.g. "Sandy, well-draining"
  activeConstituents?: string[]; // e.g. ["Linalool", "Linalyl acetate"]
  uses?: string[]; // e.g. ["Anxiety relic", "Insomnia sleep support", "Calmative skin care"]
  description?: string;
  history?: string;
  temperatureRange?: string; // e.g. "15°C - 25°C"
  plantedDate?: string; // e.g. "2026-04-10"
}

export type LogType = 'Watering' | 'Pruning' | 'Repotting' | 'Harvesting' | 'Observation';

export interface GardenLog {
  id: string;
  herbId?: string; // empty if general general log
  herbName?: string; // optional, snapshot name
  type: LogType;
  timestamp: string; // ISO or human readable
  notes: string;
  intensity?: 'light' | 'moderate' | 'heavy' | 'standard'; // e.g. watering intensity, harvest yield
}

export interface LibraryItem {
  id: string;
  name: string;
  latin: string;
  category: HerbCategory;
  sunlight: string;
  waterFrequency: string;
  optimalSoil: string;
  constituents: string[];
  therapeuticActions: string[];
  description: string;
  contraindications?: string;
  bestCompanions?: string[];
  imageUrl?: string;
}
