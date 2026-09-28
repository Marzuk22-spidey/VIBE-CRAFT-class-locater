import React, { useState } from 'react';
import { Sparkles, Search, ArrowRight, CornerDownLeft, Loader2, X } from 'lucide-react';

interface AISearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  activeQuery: string;
}

export const AISearchBar: React.FC<AISearchBarProps> = ({
  onSearch,
  isLoading,
  activeQuery
}) => {
  const [inputVal, setInputVal] = useState(activeQuery || '');

  const samplePrompts = [
    'I need an AC room on 5th floor (like IST 503) for my team of 4 for the next 2 hours.',
    'Is venue IST 612 free for the next 1 hour?',
    'Find an AC room on 2nd floor (IST 211) from 1:30 PM for 2 hours',
    'Classroom on 4th floor (IST 416) with capacity of 40+'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onSearch(inputVal.trim());
  };

  const handlePromptClick = (prompt: string) => {
    setInputVal(prompt);
    onSearch(prompt);
  };

  const handleClear = () => {
    setInputVal('');
  };

  return (
    <div className="w-full space-y-3">
      {/* Prominent Search Bar */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 group-focus-within:opacity-100 group-focus-within:from-emerald-500/50 group-focus-within:to-sky-500/50"></div>
        
        <div className="relative flex items-center bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl p-2 sm:p-2.5 transition-all">
          <div className="pl-2 pr-2 text-emerald-400 flex items-center">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-emerald-400" />
            )}
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask AI: 'I need an AC room on the ground floor for my team of 4 for the next 2 hours...'"
            className="w-full bg-transparent text-neutral-100 placeholder:text-neutral-500 text-sm sm:text-base focus:outline-none px-2 py-1.5 font-normal"
          />

          {inputVal && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-neutral-500 hover:text-neutral-300 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-neutral-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all shrink-0 ml-1 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <span className="hidden sm:inline">Find Room</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Example Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-neutral-500 text-[11px] font-medium shrink-0 flex items-center gap-1">
          <span>Try:</span>
        </span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePromptClick(p)}
            className="shrink-0 text-[11px] px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors text-left"
          >
            &quot;{p.length > 55 ? p.substring(0, 55) + '...' : p}&quot;
          </button>
        ))}
      </div>
    </div>
  );
};
