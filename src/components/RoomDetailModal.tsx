import React, { useState } from 'react';
import { X, Share2, Copy, Check, Calendar, Wind, Users, Clock } from 'lucide-react';
import { ClassTimetable, DayOfWeek, RoomAvailability } from '../types';
import { useLiveRoomCountdown } from '../hooks/useLiveRoomCountdown';
import { buildCallTheSquadMessage, buildWhatsAppShareUrl } from '../utils/countdownEngine';
import { formatTimeAMPM } from '../utils/availabilityEngine';

interface RoomDetailModalProps {
  availability: RoomAvailability | null;
  timetables: ClassTimetable[];
  day: DayOfWeek;
  onClose: () => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  availability,
  timetables,
  day,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const live = useLiveRoomCountdown(availability?.room || null, timetables, day);

  if (!availability || !live) return null;

  const { room } = availability;
  const isFree = live.status === 'FREE';
  const roomLabel = room.originalVenue || `Room ${room.roomNumber}`;
  const squadMessage = buildCallTheSquadMessage(room, live.freeUntilFormatted);

  const handleCallTheSquad = () => {
    const waUrl = buildWhatsAppShareUrl(squadMessage);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(squadMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-[#11151e] border border-[#222938] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1c2230] flex items-center justify-between bg-[#141924]">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black font-mono text-white">
              {roomLabel}
            </span>
            <span className="text-xs text-[#8b949e]">
              {room.floor}
            </span>
            {room.hasAC && (
              <span className="text-xs font-bold text-[#c7d2fe] bg-[#1a2030] border border-[#2d374e] px-2 py-0.5 rounded-lg flex items-center gap-1">
                <Wind className="w-3 h-3 text-sky-400" />
                AC
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8b949e] hover:text-white hover:bg-[#171b26] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* Status & Live Countdown Box */}
          <div className="p-5 rounded-2xl bg-[#0c0f16] border border-[#1e2434] space-y-3">
            <div className="flex items-center justify-between">
              {isFree ? (
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wider bg-white text-[#0b0d12] shadow-sm">
                  FREE
                </span>
              ) : (
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider bg-[#171b26] text-[#8b949e] border border-[#252c3c]">
                  OCCUPIED
                </span>
              )}
              <span className="text-xs font-mono text-[#8b949e] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {day}
              </span>
            </div>

            {/* Live Countdown Display */}
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8b949e] block">
                {live.countdownLabel}
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                  {live.formattedCountdown}
                </span>
                <span className="text-xs font-mono text-[#6e7787]">
                  (live)
                </span>
              </div>
            </div>

            {/* Class Details */}
            <div className="pt-3 border-t border-[#1a1f2c] text-xs space-y-2">
              {!isFree && live.currentSlot && (
                <div>
                  <span className="text-[#8b949e] block text-xs">Current Class:</span>
                  <p className="font-semibold text-white">
                    {live.currentSlot.subjectCode} · {live.currentSlot.subjectName}
                  </p>
                  <p className="text-[#717b8c]">
                    Section {live.currentSlot.classSection} · {live.currentSlot.instructor}
                  </p>
                </div>
              )}

              <div>
                <span className="text-[#8b949e] block text-xs">Next Scheduled Class:</span>
                <p className="font-semibold text-white">
                  {live.nextClassTitle}
                </p>
                {live.nextClassStartsAt && (
                  <p className="text-violet-300 font-medium mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-violet-400" />
                    <span>Starts at {live.nextClassStartsAt}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Call the Squad button (when FREE) */}
          {isFree && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCallTheSquad}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
                >
                  <Share2 className="w-5 h-5 text-white" />
                  <span>Call the Squad</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="p-3.5 rounded-xl bg-[#171b26] hover:bg-[#202636] border border-[#252c3c] text-[#c9d1d9] hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  title="Copy WhatsApp message"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#0c0f16] border border-[#1a1f2c] text-xs text-[#8b949e] flex items-center justify-between">
                <span className="truncate pr-2 font-mono text-[11px] text-[#c9d1d9]">
                  &quot;{squadMessage}&quot;
                </span>
                <span className="text-[10px] text-violet-400 font-semibold shrink-0 uppercase tracking-wider">
                  WhatsApp Preview
                </span>
              </div>
            </div>
          )}

          {/* Today's Schedule */}
          <div className="space-y-2.5">
            <span className="text-xs sm:text-sm font-semibold text-[#8b949e] block">
              Today&apos;s Class Schedule:
            </span>

            {live.daySlots.length === 0 ? (
              <p className="text-xs sm:text-sm text-[#5f687a] py-3 text-center bg-[#0c0f16] rounded-xl border border-[#1a1f2c]">
                No classes scheduled today. Free all day.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {live.daySlots.map((slot) => {
                  const isCurrent = live.currentSlot?.id === slot.id;
                  return (
                    <div
                      key={slot.id}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${
                        isCurrent
                          ? 'bg-[#151a26] border-violet-500/40 text-white'
                          : 'bg-[#0c0f16] border-[#1a1f2c] text-[#8b949e]'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-white block">
                          {slot.subjectCode} · {slot.subjectName}
                        </span>
                        <span className="text-xs text-[#717b8c] mt-0.5 block">
                          {slot.classSection} · {slot.instructor}
                        </span>
                      </div>

                      <span className="font-mono text-xs sm:text-sm text-[#c9d1d9] shrink-0 font-medium">
                        {formatTimeAMPM(slot.startTime)} – {formatTimeAMPM(slot.endTime)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0f16] border-t border-[#1c2230] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#171b26] hover:bg-[#202636] border border-[#252c3c] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
