import React from 'react';
import { RoomAvailability } from '../types';
import { formatTimeAMPM, minutesToTime, timeToMinutes } from '../utils/availabilityEngine';

interface RoomCardProps {
  availability: RoomAvailability;
  requestedStartTime: string;
  requestedDurationMinutes: number;
  onSelect: (availability: RoomAvailability) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  availability,
  requestedStartTime,
  requestedDurationMinutes,
  onSelect
}) => {
  const { room, isFreeForRequestedDuration, freeUntil, currentOrNextSlot } = availability;

  const reqEndMin = timeToMinutes(requestedStartTime) + requestedDurationMinutes;
  const reqEndTime = minutesToTime(reqEndMin);

  return (
    <div
      onClick={() => onSelect(availability)}
      className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[160px] ${
        isFreeForRequestedDuration
          ? 'bg-[#121620] hover:bg-[#161b27] border-[#22293a] hover:border-[#343e57] shadow-sm'
          : 'bg-[#0f1219] border-[#1b202d] opacity-60 hover:opacity-90'
      }`}
    >
      {/* Top: Room Number & Large Status Indicator */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight block">
            Room {room.roomNumber}
          </span>
          <span className="text-xs sm:text-sm text-[#8b949e] mt-1 block font-medium">
            {room.floor}
          </span>
        </div>

        {/* Clear FREE / OCCUPIED status */}
        {isFreeForRequestedDuration ? (
          <span className="text-xs font-black tracking-wider px-3.5 py-1.5 rounded-xl bg-white text-[#0b0d12] shadow-sm">
            FREE
          </span>
        ) : (
          <span className="text-xs font-bold tracking-wider px-3.5 py-1.5 rounded-xl bg-[#171b26] text-[#717b8c] border border-[#252c3c]">
            OCCUPIED
          </span>
        )}
      </div>

      {/* Bottom: Free duration & AC / Capacity only if data exists */}
      <div className="pt-3.5 border-t border-[#1d2331] flex items-center justify-between text-xs sm:text-sm gap-2">
        <div className="truncate">
          {isFreeForRequestedDuration ? (
            <span className="font-mono text-[#c9d1d9]">
              Free until <strong className="text-white font-bold">{freeUntil ? (freeUntil.includes(':') ? formatTimeAMPM(freeUntil) : freeUntil) : formatTimeAMPM(reqEndTime)}</strong>
            </span>
          ) : (
            <span className="font-mono text-[#717b8c] truncate block">
              {currentOrNextSlot ? `${currentOrNextSlot.subjectCode} (${formatTimeAMPM(currentOrNextSlot.startTime)})` : 'Class in session'}
            </span>
          )}
        </div>

        {/* Right side: AC and Capacity tags */}
        <div className="flex items-center gap-2 shrink-0">
          {room.hasAC && (
            <span className="text-xs font-bold text-[#c7d2fe] bg-[#1a2030] border border-[#2d374e] px-2 py-0.5 rounded-lg">
              AC
            </span>
          )}
          {room.capacity > 0 && (
            <span className="text-xs font-mono text-[#8b949e]">
              {room.capacity} seats
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
