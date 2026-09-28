import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { formatTimeAMPM, getCurrentTimeString } from '../utils/availabilityEngine';

interface HeaderProps {
  onSetNow: () => void;
  isNowActive: boolean;
  selectedDate: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSetNow,
  isNowActive,
  selectedDate
}) => {
  const [liveTime, setLiveTime] = useState<string>(getCurrentTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(getCurrentTimeString());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const dateFormatted = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="border-b border-[#1a1f2c] bg-[#0c0e14] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm shrink-0">
            V
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-lg sm:text-xl">
                VIBECRAFT
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-md border border-violet-500/30 hidden sm:inline">
                Classroom Locator
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Live Time & "Now" Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right hidden md:block">
            <span className="text-xs text-[#8b949e] block font-medium">
              {dateFormatted}
            </span>
            <span className="text-sm font-mono font-bold text-[#e6edf3]">
              {formatTimeAMPM(liveTime)}
            </span>
          </div>

          <button
            onClick={onSetNow}
            type="button"
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              isNowActive
                ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                : 'bg-[#151922] text-[#c9d1d9] border-[#222938] hover:text-white hover:border-[#30394d] hover:bg-[#1a202c]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Now</span>
          </button>
        </div>

      </div>
    </header>
  );
};
