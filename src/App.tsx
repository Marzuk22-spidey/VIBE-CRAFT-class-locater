import React, { useMemo, useState } from 'react';
import { 
  FloorType, 
  RoomAvailability, 
  RoomMetadata, 
  SearchFilters 
} from './types';
import { Header } from './components/Header';
import { SearchAndFilters } from './components/SearchAndFilters';
import { FloorGrid } from './components/FloorGrid';
import { RoomDetailModal } from './components/RoomDetailModal';
import { syncEngine } from './services/syncService';
import { 
  evaluateAllRooms, 
  getCurrentTimeString, 
  getDayOfWeekFromDate, 
  getTodayDateString 
} from './utils/availabilityEngine';
import { executeAIRoomSearch } from './utils/aiParser';

export default function App() {
  const [rooms] = useState<RoomMetadata[]>(() => syncEngine.getRooms());
  const [timetables] = useState(() => syncEngine.getTimetables());

  // Search filters
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const today = getTodayDateString();
    return {
      date: today,
      day: getDayOfWeekFromDate(today),
      startTime: getCurrentTimeString(),
      durationMinutes: 60,
      floor: 'All',
      acOption: 'All',
      minCapacity: 0,
      statusFilter: 'All',
      isNowActive: true
    };
  });

  // AI search state
  const [isSearching, setIsSearching] = useState(false);
  const [activeAIExplanation, setActiveAIExplanation] = useState<string | undefined>();

  // Selected room detail modal
  const [selectedRoom, setSelectedRoom] = useState<RoomAvailability | null>(null);

  // Set to current time ("Right Now")
  const handleSetNow = () => {
    const today = getTodayDateString();
    setFilters((prev) => ({
      ...prev,
      date: today,
      day: getDayOfWeekFromDate(today),
      startTime: getCurrentTimeString(),
      isNowActive: true
    }));
  };

  // AI natural language search handler
  const handleAISearch = async (queryText: string) => {
    setIsSearching(true);
    try {
      const result = await executeAIRoomSearch(queryText, rooms, timetables);
      const { parsedQuery } = result;

      setFilters((prev) => ({
        ...prev,
        floor: parsedQuery.floor === 'Any' ? 'All' : parsedQuery.floor,
        startTime: parsedQuery.startTime,
        durationMinutes: parsedQuery.durationMinutes,
        acOption: parsedQuery.acRequired === true ? 'AC' : parsedQuery.acRequired === false ? 'Non-AC' : 'All',
        date: parsedQuery.date,
        day: parsedQuery.day,
        isNowActive: false
      }));

      setActiveAIExplanation(result.explanation);
    } catch (e) {
      console.error('AI search failed', e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearAI = () => {
    setActiveAIExplanation(undefined);
    setFilters((prev) => ({
      ...prev,
      floor: 'All',
      acOption: 'All'
    }));
  };

  // Evaluated floor grid data
  const evaluation = useMemo(() => {
    return evaluateAllRooms(rooms, timetables, filters);
  }, [rooms, timetables, filters]);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#f0f2f5] flex flex-col font-sans selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* 1. Header with Current Date/Time and "Now" button */}
      <Header
        onSetNow={handleSetNow}
        isNowActive={Boolean(filters.isNowActive)}
        selectedDate={filters.date}
      />

      {/* Main Spacious Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 flex-1">
        
        {/* 2. Large Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Find a Free Classroom
          </h1>
          <p className="text-sm sm:text-base text-[#8b949e]">
            Real-time classroom availability verified against official academic timetables.
          </p>
        </div>

        {/* 3 & 4. Large Prominent AI Search Bar + Minimal Useful Filters */}
        <SearchAndFilters
          filters={filters}
          onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
          availableFloors={evaluation.sortedFloors}
          onAISearch={handleAISearch}
          isSearching={isSearching}
          activeAIExplanation={activeAIExplanation}
          onClearAI={handleClearAI}
        />

        {/* 5, 6, 7. Available Rooms Grouped Clearly by Floor */}
        <FloorGrid
          roomsByFloor={evaluation.byFloor}
          sortedFloors={evaluation.sortedFloors}
          onSelectRoom={(avail) => setSelectedRoom(avail)}
          requestedStartTime={filters.startTime}
          requestedDurationMinutes={filters.durationMinutes}
        />

      </main>

      {/* Clean Room Detail Schedule Modal */}
      {selectedRoom && (
        <RoomDetailModal
          availability={selectedRoom}
          timetables={timetables}
          day={filters.day}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      {/* Subtle Footer */}
      <footer className="border-t border-[#161a24] py-8 text-center text-xs text-[#525b6a]">
        <p>VIBECRAFT · Academic Timetable Availability Engine</p>
      </footer>

    </div>
  );
}
