import React from 'react';
import { FloorType, RoomAvailability } from '../types';
import { RoomCard } from './RoomCard';

interface FloorGridProps {
  roomsByFloor: Record<string, RoomAvailability[]>;
  sortedFloors: FloorType[];
  onSelectRoom: (availability: RoomAvailability) => void;
  requestedStartTime: string;
  requestedDurationMinutes: number;
}

export const FloorGrid: React.FC<FloorGridProps> = ({
  roomsByFloor,
  sortedFloors,
  onSelectRoom,
  requestedStartTime,
  requestedDurationMinutes
}) => {
  return (
    <div className="space-y-10 sm:space-y-12">
      {sortedFloors.map((floor) => {
        const rooms = roomsByFloor[floor] || [];
        if (rooms.length === 0) return null;

        const freeCount = rooms.filter((r) => r.isFreeForRequestedDuration).length;

        return (
          <section key={floor} className="space-y-4">
            {/* Clean, Spacious Floor Header */}
            <div className="flex items-center justify-between border-b border-[#1c2230] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {floor}
                </h2>
                <span className="text-xs sm:text-sm text-[#8b949e] font-mono">
                  ({freeCount} of {rooms.length} free)
                </span>
              </div>
            </div>

            {/* Spacious Rooms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {rooms.map((avail) => (
                <RoomCard
                  key={avail.room.id}
                  availability={avail}
                  requestedStartTime={requestedStartTime}
                  requestedDurationMinutes={requestedDurationMinutes}
                  onSelect={onSelectRoom}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
