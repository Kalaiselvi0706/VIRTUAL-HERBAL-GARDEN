import { MouseEvent } from 'react';
import { Sprout } from 'lucide-react';
import { Herb, HerbStatus } from '../types';

interface HerbCardProps {
  key?: string;
  herb: Herb;
  onClick: () => void;
  onWaterClick: (e: any, id: string) => void;
}

export const statusMap = {
  healthy: { dot: 'bg-emerald-500', text: 'Healthy', textColor: 'text-emerald-700' },
  thirst: { dot: 'bg-amber-500', text: 'Needs Water', textColor: 'text-amber-700' },
  dormant: { dot: 'bg-slate-400', text: 'Dormant', textColor: 'text-slate-500' },
};

export const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'Medicinal':
      return 'bg-emerald-50/80 text-emerald-800 border-emerald-200';
    case 'Culinary':
      return 'bg-amber-50/80 text-amber-800 border-amber-200';
    case 'Aromatic':
      return 'bg-indigo-50/80 text-indigo-800 border-indigo-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function formatWateredTime(isoString: string): string {
  if (isoString === 'Just now') return 'Watered Just now';
  if (!isoString) return 'Watered -';
  const lastDate = new Date(isoString);
  if (isNaN(lastDate.getTime())) {
    return `Watered ${isoString}`;
  }
  
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      return 'Watered Just now';
    }
    return `Watered ${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffDays === 1) {
    return 'Watered 1 day ago';
  }
  return `Watered ${diffDays} days ago`;
}

export default function HerbCard({ herb, onClick, onWaterClick }: HerbCardProps) {
  const status = statusMap[herb.status] || statusMap.healthy;

  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-xl border border-[#c0c9c0]/60 cursor-pointer flex gap-5 hover:border-[#215336] hover:bg-[#ffffff] transition-all duration-200 group relative shadow-sm hover:shadow"
      id={`herb-card-${herb.id}`}
    >
      {/* Botanical left icon box */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#cdebc4]/60 flex-shrink-0 rounded-lg flex items-center justify-center text-[#215336] group-hover:scale-105 transition-transform">
        <Sprout className="w-8 h-8 font-light" />
      </div>

      {/* Text column */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <div className="truncate">
            <h3 className="font-sans font-bold text-base sm:text-[18px] leading-tight text-[#1b1c16] group-hover:text-[#215336] transition-colors truncate">
              {herb.name}
            </h3>
            <p className="italic text-[#414942] text-[13px] truncate mt-0.5">
              {herb.latin}
            </p>
          </div>
          
          <span 
            className={`px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full uppercase font-bold tracking-wider border shrink-0 ${getCategoryStyles(herb.category)}`}
          >
            {herb.category}
          </span>
        </div>

        {/* Info footer */}
        <div className="mt-4 flex items-end justify-between gap-1">
          <div className="flex items-center gap-1.5 bg-[#f0eee4]/30 px-2 py-1 rounded">
            <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
            <span className="text-[11px] font-medium text-[#414942]">
              {status.text}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[#414942]/70 italic leading-none mb-1">
              {formatWateredTime(herb.lastWatered)}
            </span>
            {herb.status === 'thirst' && (
              <button
                onClick={(e) => onWaterClick(e, herb.id)}
                className="text-[11px] font-medium text-white bg-[#215336] hover:bg-[#163623] px-2 py-0.5 rounded cursor-pointer leading-tight transition-colors active:scale-95"
              >
                Water
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
