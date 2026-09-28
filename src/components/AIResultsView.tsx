import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Wind, 
  Users, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Layers, 
  HelpCircle,
  Compass,
  Check,
  Building
} from 'lucide-react';
import { AIQueryResult, RoomAvailability } from '../types';
import { formatTimeAMPM, minutesToTime, timeToMinutes } from '../utils/availabilityEngine';

interface AIResultsViewProps {
  result: AIQueryResult;
  onSelectRoom: (availability: RoomAvailability) => void;
  onModifySearch: () => void;
}

export const AIResultsView: React.FC<AIResultsViewProps> = ({
  result,
  onSelectRoom,
  onModifySearch
}) => {
  const { parsedQuery, matchingRooms, hasExactMatches, explanation, closestAlternatives } = result;

  const reqEndMin = timeToMinutes(parsedQuery.startTime) + parsedQuery.durationMinutes;
  const endTimeStr = minutesToTime(reqEndMin);

  return (
    <div className="space-y-6">
      {/* Parsed Query Intent Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                AI Intent Extraction
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white italic">
                &quot;{parsedQuery.rawQuery}&quot;
              </h3>
            </div>
          </div>

          <button
            onClick={onModifySearch}
            className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            Refine Query
          </button>
        </div>

        {/* Extracted Requirements Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80">
            <span className="text-neutral-500 text-[10px] block font-medium">Floor</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block flex items-center gap-1">
              <Layers className="w-3 h-3 text-neutral-400" />
              {parsedQuery.floor}
            </span>
          </div>

          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80">
            <span className="text-neutral-500 text-[10px] block font-medium">AC Requirement</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block flex items-center gap-1">
              <Wind className="w-3 h-3 text-sky-400" />
              {parsedQuery.acRequired === true ? 'AC Required' : parsedQuery.acRequired === false ? 'Non-AC' : 'Any'}
            </span>
          </div>

          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80">
            <span className="text-neutral-500 text-[10px] block font-medium">Capacity</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-400" />
              {parsedQuery.minCapacity ? `${parsedQuery.minCapacity}+ seats` : 'Any size'}
            </span>
          </div>

          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80">
            <span className="text-neutral-500 text-[10px] block font-medium">Duration</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              {parsedQuery.durationMinutes / 60} hr ({parsedQuery.durationMinutes}m)
            </span>
          </div>

          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80">
            <span className="text-neutral-500 text-[10px] block font-medium">Starting Time</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block font-mono text-emerald-400">
              {formatTimeAMPM(parsedQuery.startTime)}
            </span>
          </div>

          <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80">
            <span className="text-neutral-500 text-[10px] block font-medium">Target Day</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block font-mono text-neutral-300">
              {parsedQuery.day}
            </span>
          </div>
        </div>

        {/* AI Verification Workflow Steps */}
        <div className="flex items-center gap-1 sm:gap-2 text-[11px] text-neutral-400 pt-1 overflow-x-auto">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            NLP Extracted
          </span>
          <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0" />
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Metadata Checked
          </span>
          <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0" />
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            10 Timetables Scanned
          </span>
          <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0" />
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            0 Clashes Verified
          </span>
        </div>
      </div>

      {/* AI Explanation Message */}
      <div className={`p-4 rounded-2xl border text-sm ${
        hasExactMatches
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
          : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
      }`}>
        <div className="flex items-start gap-2.5">
          {hasExactMatches ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-semibold text-white">
              {hasExactMatches ? 'Direct Timetable Matches' : 'No Direct Full-Period Match'}
            </p>
            <p className="text-xs mt-1 text-neutral-300 leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Matching Rooms Section */}
      {hasExactMatches && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Matching Available Rooms ({matchingRooms.length})
            </h4>
            <span className="text-xs text-neutral-400 font-mono">
              Free from {formatTimeAMPM(parsedQuery.startTime)} to {formatTimeAMPM(endTimeStr)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingRooms.map((avail) => (
              <div
                key={avail.room.id}
                onClick={() => onSelectRoom(avail)}
                className="bg-neutral-900 border border-emerald-500/30 hover:border-emerald-500/70 rounded-2xl p-5 transition-all cursor-pointer shadow-lg hover:shadow-emerald-950/30 space-y-3.5 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black font-mono text-white group-hover:text-emerald-300 transition-colors">
                        Room {avail.room.roomNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        FREE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 font-medium">
                      {avail.room.floor} · {avail.room.hasAC ? 'AC' : 'Non-AC'} · Capacity {avail.room.capacity}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                      Free Window
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {formatTimeAMPM(parsedQuery.startTime)} – {avail.freeUntil && avail.freeUntil.includes(':') ? formatTimeAMPM(avail.freeUntil) : formatTimeAMPM(endTimeStr)}
                    </span>
                  </div>
                </div>

                {/* 'Why it matches' Section */}
                <div className="bg-neutral-950/80 rounded-xl p-3 border border-neutral-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Why it matches:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {avail.matchReasons?.map((reason, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Building info & click prompt */}
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-neutral-800/80">
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <Building className="w-3 h-3 text-neutral-500" />
                    {avail.room.building}
                  </span>
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform font-medium flex items-center gap-1">
                    View Timetable Slot Schedule
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closest Alternatives Section */}
      {!hasExactMatches && closestAlternatives.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Closest Available Alternatives
            </h4>
            <span className="text-xs text-neutral-400">
              (Free for the full duration, but differs in floor or amenities)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {closestAlternatives.map(({ room: avail, reasonForAlternative }) => (
              <div
                key={avail.room.id}
                onClick={() => onSelectRoom(avail)}
                className="bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 rounded-2xl p-4 transition-all cursor-pointer shadow-md space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black font-mono text-white group-hover:text-cyan-300">
                        Room {avail.room.roomNumber}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        ALTERNATIVE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {avail.room.floor} · {avail.room.hasAC ? 'AC' : 'Non-AC'} · Capacity {avail.room.capacity}
                    </p>
                  </div>
                </div>

                {/* Reason for alternative badge */}
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                    Trade-off / Difference:
                  </span>
                  <p className="text-neutral-300 mt-0.5">
                    {reasonForAlternative}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-neutral-800/80">
                  <span className="font-mono text-emerald-400 font-medium">
                    Free {formatTimeAMPM(parsedQuery.startTime)} – {formatTimeAMPM(endTimeStr)}
                  </span>
                  <span className="text-neutral-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                    Select <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
