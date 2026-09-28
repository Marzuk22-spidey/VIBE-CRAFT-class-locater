import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { FloorType, SearchFilters } from '../types';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onFilterChange: (updated: Partial<SearchFilters>) => void;
  availableFloors: FloorType[];
  onAISearch: (query: string) => void;
  isSearching: boolean;
  activeAIExplanation?: string;
  onClearAI: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFilterChange,
  availableFloors,
  onAISearch,
  isSearching,
  activeAIExplanation,
  onClearAI
}) => {
  const [queryInput, setQueryInput] = useState('');

  const durations = [
    { label: '30 min', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '2 hours', value: 120 },
    { label: '3 hours', value: 180 }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    onAISearch(queryInput.trim());
  };

  const handleClear = () => {
    setQueryInput('');
    onClearAI();
  };

  return (
    <div className="space-y-5">
      {/* Large Prominent AI Search Box */}
      <form onSubmit={handleSearchSubmit}>
        <div className="relative flex items-center bg-[#12161f] border border-[#232938] hover:border-[#30384c] focus-within:border-violet-500 rounded-2xl p-2 sm:p-2.5 transition-all shadow-sm">
          <div className="pl-3 sm:pl-4 text-[#6e7787] flex items-center">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="What kind of room do you need? (e.g. I need a room on the 5th floor for 2 hours)"
            className="w-full bg-transparent px-3 sm:px-4 h-12 sm:h-14 text-base sm:text-lg text-white placeholder:text-[#525b6a] focus:outline-none"
          />

          {queryInput && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-[#6e7787] hover:text-white mr-1 rounded-lg transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            disabled={!queryInput.trim() || isSearching}
            className="px-5 sm:px-7 h-12 sm:h-14 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm sm:text-base shrink-0 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </form>

      {/* AI Explanation feedback if active */}
      {activeAIExplanation && (
        <div className="flex items-center justify-between text-sm px-4 py-3 rounded-xl bg-[#141923] border border-violet-500/30 text-[#d0d7de] animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5 truncate pr-3">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shrink-0"></span>
            <span className="truncate font-medium">{activeAIExplanation}</span>
          </div>
          <button
            onClick={onClearAI}
            className="text-xs font-semibold text-violet-300 hover:text-violet-200 underline shrink-0 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Minimal Useful Filters: Floor, Time, Duration */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#11151e] border border-[#1e2433]">
        
        {/* Floor filter */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="floor-select" className="text-xs sm:text-sm font-semibold text-[#8b949e]">
            Floor:
          </label>
          <select
            id="floor-select"
            value={filters.floor}
            onChange={(e) => onFilterChange({ floor: e.target.value as 'All' | FloorType })}
            className="bg-[#171b26] border border-[#252c3c] text-white rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="All">All Floors</option>
            {availableFloors.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Time input */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="time-select" className="text-xs sm:text-sm font-semibold text-[#8b949e]">
            Time:
          </label>
          <input
            id="time-select"
            type="time"
            value={filters.startTime}
            onChange={(e) => onFilterChange({ startTime: e.target.value, isNowActive: false })}
            className="bg-[#171b26] border border-[#252c3c] text-white rounded-xl px-3.5 py-2 font-mono text-xs sm:text-sm font-semibold focus:outline-none focus:border-violet-500 cursor-pointer"
          />
        </div>

        {/* Duration toggle buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-[#8b949e] mr-1 hidden sm:inline">
            Duration:
          </span>
          <div className="flex items-center gap-1.5">
            {durations.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => onFilterChange({ durationMinutes: d.value })}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filters.durationMinutes === d.value
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-[#171b26] text-[#8b949e] hover:text-white border border-[#252c3c] hover:border-[#353f54]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
