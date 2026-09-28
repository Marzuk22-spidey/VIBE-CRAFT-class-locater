import React, { useState } from 'react';
import { ClassTimetable, DayOfWeek, TimetableSlot } from '../types';
import { 
  CalendarDays, 
  Search, 
  User, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { formatTimeAMPM } from '../utils/availabilityEngine';

interface TimetableExplorerProps {
  timetables: ClassTimetable[];
  onSelectRoomFromTimetable: (roomNumber: string) => void;
}

export const TimetableExplorer: React.FC<TimetableExplorerProps> = ({
  timetables,
  onSelectRoomFromTimetable
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(timetables[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentClass = timetables.find((t) => t.id === selectedClassId) || timetables[0];

  // Filter slots for the active class on the selected day
  const filteredSlots = currentClass.slots
    .filter((s) => s.day === selectedDay)
    .filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.subjectCode.toLowerCase().includes(q) ||
        s.subjectName.toLowerCase().includes(q) ||
        s.instructor.toLowerCase().includes(q) ||
        s.roomNumber.toLowerCase().includes(q)
      );
    });

  // Calculate unique rooms used by this class today
  const roomsUsedToday = Array.from(new Set(currentClass.slots.filter(s => s.day === selectedDay).map(s => s.roomNumber)));

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <CalendarDays className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-black text-white tracking-tight">
              Academic Timetable Source of Truth
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Inspect all 10 official academic cohort schedules. Room availability is strictly derived from these exact time slots and room allocations.
          </p>
        </div>

        {/* Search inside timetables */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subject, faculty, room..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>
      </div>

      {/* Cohort Selector Tabs (10 Classes) */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
          Select Academic Class / Batch (10 Total):
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
          {timetables.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedClassId(t.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedClassId === t.id
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {t.classSection.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Class Meta Card & Day Selector */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-white">
              {currentClass.classSection}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {currentClass.department} · {currentClass.semester} · {currentClass.totalStudents} Registered Students
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-neutral-500 mr-1">Rooms today:</span>
            {roomsUsedToday.map((r) => (
              <button
                key={r}
                onClick={() => onSelectRoomFromTimetable(r)}
                className="px-2 py-0.5 rounded-md bg-neutral-800 hover:bg-sky-500/20 text-sky-400 border border-neutral-700 hover:border-sky-500/40 font-mono transition-colors"
                title={`Check Room ${r} availability`}
              >
                Room {r}
              </button>
            ))}
          </div>
        </div>

        {/* Days Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedDay === d
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                  : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-bold text-white uppercase tracking-wider">
            Scheduled Periods for {selectedDay} ({filteredSlots.length} Slots)
          </span>
          <span>Click any room to view full availability</span>
        </div>

        {filteredSlots.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900/40 rounded-2xl border border-neutral-800 text-xs text-neutral-400">
            No academic sessions found for this day or search filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 transition-all space-y-3 shadow-md group"
              >
                {/* Time & Room */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {formatTimeAMPM(slot.startTime)} – {formatTimeAMPM(slot.endTime)}
                  </span>

                  <button
                    onClick={() => onSelectRoomFromTimetable(slot.roomNumber)}
                    className="flex items-center gap-1 text-xs font-mono font-bold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 px-2.5 py-1 rounded-lg border border-sky-500/30 transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Room {slot.roomNumber}</span>
                  </button>
                </div>

                {/* Course Details */}
                <div>
                  <span className="text-[10px] font-bold font-mono text-neutral-500 uppercase tracking-wider">
                    {slot.subjectCode}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-snug mt-0.5">
                    {slot.subjectName}
                  </h4>
                </div>

                {/* Instructor */}
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="truncate">{slot.instructor}</span>
                  </span>

                  <button
                    onClick={() => onSelectRoomFromTimetable(slot.roomNumber)}
                    className="text-neutral-500 group-hover:text-emerald-400 transition-colors shrink-0"
                    title="Inspect room in floor locator"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
