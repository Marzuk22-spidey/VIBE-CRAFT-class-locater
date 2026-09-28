import { ClassTimetable, DayOfWeek, FloorType, RoomAvailability, RoomMetadata, RoomStatus, SearchFilters, TimetableSlot } from '../types';
import { compareFloors, detectFloorFromVenue } from './floorDetector';

export function isVenueMatch(slotVenue: string, room: RoomMetadata): boolean {
  if (!slotVenue) return false;
  const s = slotVenue.trim().toLowerCase();
  const r = room.roomNumber.trim().toLowerCase();
  const o = (room.originalVenue || '').trim().toLowerCase();

  if (s === r || s === o) return true;

  // Match by extracted room number (e.g. "IST 503" matches room "503")
  const detection = detectFloorFromVenue(slotVenue);
  if (detection.patternMatched && (detection.extractedRoomNumber === r || detection.extractedRoomNumber === o)) {
    return true;
  }
  return false;
}

export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':');
  const hours = parseInt(parts[0] || '0', 10);
  const minutes = parseInt(parts[1] || '0', 10);
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const norm = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(norm / 60);
  const minutes = norm % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function formatTimeAMPM(timeStr: string): string {
  if (!timeStr) return '';
  const [hoursStr, minutesStr] = timeStr.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr ? minutesStr.padStart(2, '0') : '00';
  if (isNaN(hours)) return timeStr;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  return `${hours}:${minutes} ${ampm}`;
}

export function getDayOfWeekFromDate(dateStr: string): DayOfWeek {
  if (!dateStr) return 'Monday';
  const dateObj = new Date(dateStr + 'T00:00:00');
  const dayIndex = dateObj.getDay();
  const days: DayOfWeek[] = ['Saturday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // standard JS: 0=Sun, 1=Mon, ..., 6=Sat
  // if Sunday, map to Monday for typical academic week simulation
  if (dayIndex === 0) return 'Monday';
  const standardDays: DayOfWeek[] = [
    'Monday', // fallback
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  return standardDays[dayIndex] || 'Monday';
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentTimeString(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = (Math.floor(now.getMinutes() / 5) * 5).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Calculates availability of a single room for a requested day, start time and duration.
 */
export function calculateRoomAvailability(
  room: RoomMetadata,
  timetables: ClassTimetable[],
  day: DayOfWeek,
  startTime: string,
  durationMinutes: number
): RoomAvailability {
  const reqStartMin = timeToMinutes(startTime);
  const reqEndMin = reqStartMin + durationMinutes;

  // Collect all slots for this room on this day across all timetables
  const daySlots: TimetableSlot[] = [];
  for (const tt of timetables) {
    for (const slot of tt.slots) {
      if (isVenueMatch(slot.roomNumber, room) && slot.day === day) {
        daySlots.push(slot);
      }
    }
  }

  // Sort slots by start time
  daySlots.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  // Find conflicts within the requested window [reqStartMin, reqEndMin]
  const conflictingSlots = daySlots.filter((slot) => {
    const sStart = timeToMinutes(slot.startTime);
    const sEnd = timeToMinutes(slot.endTime);
    return sStart < reqEndMin && sEnd > reqStartMin;
  });

  const isFreeForRequestedDuration = conflictingSlots.length === 0;

  // Check currently active slot at reqStartMin
  const activeAtStart = daySlots.find((slot) => {
    const sStart = timeToMinutes(slot.startTime);
    const sEnd = timeToMinutes(slot.endTime);
    return reqStartMin >= sStart && reqStartMin < sEnd;
  });

  // Check if room becomes available soon (e.g., current class ends in <= 30 mins)
  let status: RoomStatus = 'FREE';
  if (!isFreeForRequestedDuration) {
    if (activeAtStart) {
      const activeEnd = timeToMinutes(activeAtStart.endTime);
      if (activeEnd - reqStartMin <= 30 && activeEnd > reqStartMin) {
        status = 'AVAILABLE_SOON';
      } else {
        status = 'OCCUPIED';
      }
    } else {
      // Room was free at start, but a class starts before the requested duration completes
      status = 'OCCUPIED';
    }
  }

  // Calculate free time ranges
  let freeUntil: string | undefined;
  let freeFrom: string | undefined;
  let availableDurationMinutes = 0;

  if (isFreeForRequestedDuration) {
    // Find the next slot that starts on or after reqStartMin
    const nextSlot = daySlots.find((s) => timeToMinutes(s.startTime) >= reqStartMin);
    if (nextSlot) {
      freeUntil = nextSlot.startTime;
      availableDurationMinutes = timeToMinutes(nextSlot.startTime) - reqStartMin;
    } else {
      freeUntil = '17:30'; // College day end
      availableDurationMinutes = Math.max(durationMinutes, 17 * 60 + 30 - reqStartMin);
    }
    freeFrom = startTime;
  } else {
    if (activeAtStart) {
      freeFrom = activeAtStart.endTime;
    }
  }

  return {
    room,
    status,
    isFreeForRequestedDuration,
    freeUntil,
    freeFrom,
    availableDurationMinutes,
    currentOrNextSlot: activeAtStart || conflictingSlots[0] || daySlots.find(s => timeToMinutes(s.startTime) > reqStartMin),
    conflictingSlots,
    daySlots
  };
}

/**
 * Evaluates all rooms against search filters and organizes by floor.
 */
export function evaluateAllRooms(
  rooms: RoomMetadata[],
  timetables: ClassTimetable[],
  filters: SearchFilters
): {
  byFloor: Record<string, RoomAvailability[]>;
  sortedFloors: FloorType[];
  totalRooms: number;
  totalFree: number;
  totalOccupied: number;
  totalAvailableSoon: number;
} {
  const result: Record<string, RoomAvailability[]> = {};

  // Initialize all floors currently present in rooms dataset
  for (const r of rooms) {
    if (!result[r.floor]) {
      result[r.floor] = [];
    }
  }

  let totalFree = 0;
  let totalOccupied = 0;
  let totalAvailableSoon = 0;

  for (const room of rooms) {
    // Filter out if floor filter does not match
    if (filters.floor !== 'All' && room.floor !== filters.floor) {
      continue;
    }

    // Filter AC
    if (filters.acOption === 'AC' && !room.hasAC) {
      continue;
    }
    if (filters.acOption === 'Non-AC' && room.hasAC) {
      continue;
    }

    // Filter Capacity
    if (filters.minCapacity > 0 && room.capacity < filters.minCapacity) {
      continue;
    }

    const availability = calculateRoomAvailability(
      room,
      timetables,
      filters.day,
      filters.startTime,
      filters.durationMinutes
    );

    // Filter status if requested
    if (filters.statusFilter === 'Free Only' && !availability.isFreeForRequestedDuration) {
      continue;
    }
    if (filters.statusFilter === 'Occupied Only' && availability.isFreeForRequestedDuration) {
      continue;
    }

    if (availability.status === 'FREE') {
      totalFree++;
    } else if (availability.status === 'AVAILABLE_SOON') {
      totalAvailableSoon++;
    } else {
      totalOccupied++;
    }

    if (!result[room.floor]) {
      result[room.floor] = [];
    }
    result[room.floor].push(availability);
  }

  // Sort rooms within each floor: FREE first, then AVAILABLE_SOON, then OCCUPIED, then room number
  const floorKeys = Object.keys(result) as FloorType[];
  for (const f of floorKeys) {
    result[f].sort((a, b) => {
      if (a.isFreeForRequestedDuration && !b.isFreeForRequestedDuration) return -1;
      if (!a.isFreeForRequestedDuration && b.isFreeForRequestedDuration) return 1;
      return a.room.roomNumber.localeCompare(b.room.roomNumber, undefined, { numeric: true });
    });
  }

  const sortedFloors = floorKeys.sort((a, b) => compareFloors(a, b));
  const totalRooms = Object.values(result).reduce((acc, list) => acc + list.length, 0);

  return {
    byFloor: result,
    sortedFloors,
    totalRooms,
    totalFree,
    totalOccupied,
    totalAvailableSoon
  };
}

/**
 * Finds closest alternatives when no room matches all requirements.
 */
export function findClosestAlternatives(
  rooms: RoomMetadata[],
  timetables: ClassTimetable[],
  targetDay: DayOfWeek,
  startTime: string,
  durationMinutes: number,
  targetFloor?: FloorType | 'Any',
  targetAC?: boolean | null,
  minCapacity?: number | null
): { room: RoomAvailability; reasonForAlternative: string }[] {
  const alternatives: { room: RoomAvailability; reasonForAlternative: string }[] = [];

  for (const room of rooms) {
    const avail = calculateRoomAvailability(room, timetables, targetDay, startTime, durationMinutes);
    if (!avail.isFreeForRequestedDuration) continue;

    const reasons: string[] = [];
    if (targetFloor && targetFloor !== 'Any' && room.floor !== targetFloor) {
      reasons.push(`On ${room.floor} instead of ${targetFloor}`);
    }
    if (targetAC !== null && targetAC !== undefined && room.hasAC !== targetAC) {
      reasons.push(room.hasAC ? 'Has AC (requested non-AC)' : 'Non-AC (requested AC)');
    }
    if (minCapacity && room.capacity < minCapacity) {
      reasons.push(`Capacity is ${room.capacity} (requested ${minCapacity})`);
    }

    if (reasons.length > 0) {
      alternatives.push({
        room: avail,
        reasonForAlternative: reasons.join(' · ')
      });
    }
  }

  // Pick top 3 best alternatives
  return alternatives.slice(0, 3);
}
