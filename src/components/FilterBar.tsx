import React from 'react';
import { 
  Calendar, 
  Clock, 
  Hourglass, 
  Layers, 
  Wind, 
  Users, 
  Filter, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { DayOfWeek, FloorType, SearchFilters } from '../types';
import { formatTimeAMPM, getDayOfWeekFromDate, getTodayDateString } from '../utils/availabilityEngine';

interface FilterBarProps {
  filters: SearchFilters;
  onChange: (updated: Partial<SearchFilters>) => void;
  onReset: () => void;
  onSetNow: () => void;
  availableFloors?: FloorType[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  onSetNow,
  availableFloors
}) => {
  const commonTimeSlots = [
    { label: '08:30 AM', value: '08:30' },
    { label: '09:30 AM', value: '09:30' },
    { label: '10:45 AM (P3)', value: '10:45' },
    { label: '11:45 AM (P4)', value: '11:45' },
    { label: '01:30 PM (P5)', value: '13:30' },
    { label: '02:30 PM (P6)', value: '14:30' },
    { label: '03:30 PM (P7)', value: '15:30' }
  ];

  const durationOptions = [
    { label: '30 mins', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '1.5 hrs', value: 90 },
    { label: '2 hours', value: 120 },
    { label: '3 hours', value: 180 },
    { label: '4 hours', value: 240 }
  ];

  const defaultFloors: FloorType[] = [
    '1st Floor',
    '2nd Floor',
    '3rd Floor',
    '4th Floor',
    '5th Floor',
    '6th Floor',
    'Ground Floor',
    'Floor Unknown'
  ];

  const floors: ('All' | FloorType)[] = ['All', ...(availableFloors && availableFloors.length > 0 ? availableFloors : defaultFloors)];

  const quickDays: { label: string; day: DayOfWeek }[] = [
    { label: 'Mon', day: 'Monday' },
    { label: 'Tue', day: 'Tuesday' },
    { label: 'Wed', day: 'Wednesday' },
    { label: 'Thu', day: 'Thursday' },
    { label: 'Fri', day: 'Friday' },
    { label: 'Sat', day: 'Saturday' }
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    const newDay = getDayOfWeekFromDate(newDate);
    onChange({ date: newDate, day: newDay, isNowActive: false });
  };

  const handleQuickDay = (day: DayOfWeek) => {
    onChange({ day, isNowActive: false });
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Top Row: Primary Criteria (Date, Start Time, Duration) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Date & Day Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Date & Schedule Day
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-medium">
              {filters.day}
            </span>
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.date}
              onChange={handleDateChange}
              className="bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs rounded-xl px-3 py-2 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
          </div>
          {/* Quick day buttons */}
          <div className="flex items-center gap-1 pt-0.5 overflow-x-auto">
            {quickDays.map((qd) => (
              <button
                key={qd.day}
                type="button"
                onClick={() => handleQuickDay(qd.day)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                  filters.day === qd.day
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {qd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Time */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Start Time
            </label>
            <span className="text-[11px] font-mono text-sky-400 font-medium">
              {formatTimeAMPM(filters.startTime)}
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="time"
              value={filters.startTime}
              onChange={(e) => onChange({ startTime: e.target.value, isNowActive: false })}
              className="bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs rounded-xl px-3 py-2 w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
            />
            <button
              onClick={onSetNow}
              type="button"
              className={`text-xs px-3 py-2 rounded-xl font-medium border transition-colors shrink-0 ${
                filters.isNowActive
                  ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-semibold'
                  : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-emerald-500/40'
              }`}
            >
              ⚡ Now
            </button>
          </div>

          {/* Quick period presets */}
          <div className="flex items-center gap-1 pt-0.5 overflow-x-auto">
            {commonTimeSlots.slice(0, 4).map((ts) => (
              <button
                key={ts.value}
                type="button"
                onClick={() => onChange({ startTime: ts.value, isNowActive: false })}
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono transition-colors whitespace-nowrap ${
                  filters.startTime === ts.value
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {ts.value}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 text-amber-400" />
              Duration Required
            </label>
            <span className="text-[11px] font-mono text-amber-400 font-medium">
              {filters.durationMinutes / 60} hrs ({filters.durationMinutes} min)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {durationOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ durationMinutes: opt.value })}
                className={`py-2 px-1 text-xs rounded-xl font-medium text-center transition-all border ${
                  filters.durationMinutes === opt.value
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-neutral-500">
            Room must be completely free for all {filters.durationMinutes} minutes.
          </p>
        </div>

      </div>

      {/* Bottom Row: Secondary Filters (Floor, AC, Capacity, Status, Reset) */}
      <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 items-center">
        
        {/* Floor Filter */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
            <Layers className="w-3 h-3 text-neutral-400" />
            Floor
          </span>
          <select
            value={filters.floor}
            onChange={(e) => onChange({ floor: e.target.value as 'All' | FloorType })}
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {floors.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* AC Option */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
            <Wind className="w-3 h-3 text-cyan-400" />
            AC Type
          </span>
          <select
            value={filters.acOption}
            onChange={(e) => onChange({ acOption: e.target.value as 'All' | 'AC' | 'Non-AC' })}
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Rooms</option>
            <option value="AC">AC Only (❄️)</option>
            <option value="Non-AC">Non-AC Only (💨)</option>
          </select>
        </div>

        {/* Min Capacity */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
            <Users className="w-3 h-3 text-purple-400" />
            Min Capacity
          </span>
          <select
            value={filters.minCapacity}
            onChange={(e) => onChange({ minCapacity: parseInt(e.target.value, 10) })}
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-purple-500"
          >
            <option value={0}>Any Size</option>
            <option value={40}>40+ Seats</option>
            <option value={60}>60+ Seats</option>
            <option value={80}>80+ Seats</option>
            <option value={100}>100+ Seats</option>
          </select>
        </div>

        {/* Room Status Filter */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
            <Filter className="w-3 h-3 text-emerald-400" />
            Show Status
          </span>
          <select
            value={filters.statusFilter}
            onChange={(e) => onChange({ statusFilter: e.target.value as 'All' | 'Free Only' | 'Occupied Only' })}
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All (Free & Occupied)</option>
            <option value="Free Only">Free Rooms Only</option>
            <option value="Occupied Only">Occupied Only</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
          <button
            onClick={onReset}
            type="button"
            className="w-full flex items-center justify-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs rounded-xl py-2 transition-colors font-medium"
            title="Reset filters to standard defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
};
