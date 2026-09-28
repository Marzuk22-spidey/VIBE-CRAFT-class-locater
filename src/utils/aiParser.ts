import {
  AIQueryResult,
  ClassTimetable,
  DayOfWeek,
  FloorType,
  ParsedAIQuery,
  RoomAvailability,
  RoomMetadata
} from '../types';
import {
  calculateRoomAvailability,
  findClosestAlternatives,
  formatTimeAMPM,
  getCurrentTimeString,
  getDayOfWeekFromDate,
  getTodayDateString,
  isVenueMatch,
  minutesToTime,
  timeToMinutes
} from './availabilityEngine';
import { detectFloorFromVenue } from './floorDetector';

/**
 * Heuristic client-side NLP parser for natural language classroom queries.
 * Automatically detects floor from room numbers such as "IST 503", "IST 612", etc.
 */
export function parseQueryWithHeuristics(query: string): ParsedAIQuery {
  const lower = query.toLowerCase();

  // Automatic Floor Detection from room/venue or floor phrase
  let floor: FloorType | 'Any' = 'Any';

  // 1. First check if a venue like "IST 503", "IST 612", "Room 416", "211" is mentioned
  const venueMatch = query.match(/(?:IST|Room|Class|Lab)?\s*(\d{3,4})\b/i);
  if (venueMatch) {
    const detection = detectFloorFromVenue(venueMatch[0]);
    if (detection.patternMatched) {
      floor = detection.floor;
    }
  }

  // 2. Direct floor mention overrides or sets if not yet set
  if (lower.includes('ground') || lower.includes('gf') || lower.includes('floor 0') || lower.includes('0th floor')) {
    floor = 'Ground Floor';
  } else if (lower.includes('1st') || lower.includes('first floor') || lower.includes('floor 1')) {
    floor = '1st Floor';
  } else if (lower.includes('2nd') || lower.includes('second floor') || lower.includes('floor 2')) {
    floor = '2nd Floor';
  } else if (lower.includes('3rd') || lower.includes('third floor') || lower.includes('floor 3')) {
    floor = '3rd Floor';
  } else if (lower.includes('4th') || lower.includes('fourth floor') || lower.includes('floor 4')) {
    floor = '4th Floor';
  } else if (lower.includes('5th') || lower.includes('fifth floor') || lower.includes('floor 5')) {
    floor = '5th Floor';
  } else if (lower.includes('6th') || lower.includes('sixth floor') || lower.includes('floor 6')) {
    floor = '6th Floor';
  } else if (lower.includes('7th') || lower.includes('seventh floor') || lower.includes('floor 7')) {
    floor = '7th Floor';
  } else if (lower.includes('seminar annex') || lower.includes('workshop hall')) {
    floor = 'Floor Unknown';
  }

  // AC requirement
  let acRequired: boolean | null = null;
  if (lower.includes('non-ac') || lower.includes('non ac') || lower.includes('without ac') || lower.includes('no ac')) {
    acRequired = false;
  } else if (
    lower.includes(' ac ') ||
    lower.startsWith('ac ') ||
    lower.endsWith(' ac') ||
    lower.includes('ac room') ||
    lower.includes('air conditioned') ||
    lower.includes('air conditioning') ||
    lower.includes('air condition') ||
    lower.includes('with ac')
  ) {
    acRequired = true;
  }

  // Capacity extraction
  let minCapacity: number | null = null;
  const teamMatch = lower.match(/(?:team|group|for|capacity|seating|seats)\s*(?:of|for|at least|>=|:)?\s*(\d+)/);
  const peopleMatch = lower.match(/(\d+)\s*(?:people|persons|students|members|folks|pax|heads)/);
  if (teamMatch && teamMatch[1]) {
    minCapacity = parseInt(teamMatch[1], 10);
  } else if (peopleMatch && peopleMatch[1]) {
    minCapacity = parseInt(peopleMatch[1], 10);
  }

  // Duration extraction
  let durationMinutes = 60; // default 1 hour
  const hourMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:hours|hour|hrs|hr)/);
  const minMatch = lower.match(/(\d+)\s*(?:minutes|minute|mins|min)/);
  if (hourMatch && hourMatch[1]) {
    durationMinutes = Math.round(parseFloat(hourMatch[1]) * 60);
  } else if (minMatch && minMatch[1]) {
    durationMinutes = parseInt(minMatch[1], 10);
  } else if (lower.includes('half hour') || lower.includes('half an hour')) {
    durationMinutes = 30;
  }

  // Date / Day extraction
  let date = getTodayDateString();
  let day: DayOfWeek = getDayOfWeekFromDate(date);

  const daysList: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (const d of daysList) {
    if (lower.includes(d.toLowerCase())) {
      day = d;
      break;
    }
  }

  if (lower.includes('tomorrow')) {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    const y = tmrw.getFullYear();
    const m = (tmrw.getMonth() + 1).toString().padStart(2, '0');
    const dt = tmrw.getDate().toString().padStart(2, '0');
    date = `${y}-${m}-${dt}`;
    day = getDayOfWeekFromDate(date);
  }

  // Start Time extraction
  let startTime = '10:45'; // default college academic hour
  if (lower.includes('now') || lower.includes('currently') || lower.includes('right now') || lower.includes('immediate')) {
    startTime = getCurrentTimeString();
  } else {
    // Look for explicit times like "2 pm", "2:30 pm", "14:00", "at 10 am"
    const timeMatch = lower.match(/(?:at|from|starting at|start at|around)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
    if (timeMatch) {
      let h = parseInt(timeMatch[1], 10);
      const m = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
      const meridiem = timeMatch[3];
      if (meridiem === 'pm' && h < 12) h += 12;
      if (meridiem === 'am' && h === 12) h = 0;
      startTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }
  }

  // Summary builder
  const parts: string[] = [];
  if (floor !== 'Any') parts.push(floor);
  if (acRequired === true) parts.push('AC required');
  if (acRequired === false) parts.push('Non-AC');
  if (minCapacity) parts.push(`Min capacity: ${minCapacity}`);
  parts.push(`Duration: ${durationMinutes / 60} hr(s)`);
  parts.push(`Starting: ${formatTimeAMPM(startTime)}`);
  parts.push(`Day: ${day}`);

  return {
    rawQuery: query,
    floor,
    acRequired,
    minCapacity,
    durationMinutes,
    startTime,
    date,
    day,
    confidence: 0.95,
    summary: parts.join(' · ')
  };
}

/**
 * Main AI Room Finder logic:
 * 1. Understands requirements
 * 2. Checks room metadata
 * 3. Checks timetables
 * 4. Calculates availability
 * 5. Filters matching rooms & generates 'Why it matches'
 * 6. Returns actual matches or explains why + closest alternatives
 */
export async function executeAIRoomSearch(
  query: string,
  rooms: RoomMetadata[],
  timetables: ClassTimetable[]
): Promise<AIQueryResult> {
  let parsedQuery: ParsedAIQuery;

  // Try server-side LLM parser first if available
  try {
    const res = await fetch('/api/ai-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, currentTime: getCurrentTimeString(), todayDate: getTodayDateString() })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.parsed) {
        parsedQuery = {
          rawQuery: query,
          floor: data.parsed.floor || 'Any',
          acRequired: data.parsed.acRequired ?? null,
          minCapacity: data.parsed.minCapacity ?? null,
          durationMinutes: data.parsed.durationMinutes || 60,
          startTime: data.parsed.startTime || '10:45',
          date: data.parsed.date || getTodayDateString(),
          day: (data.parsed.day as DayOfWeek) || getDayOfWeekFromDate(data.parsed.date || getTodayDateString()),
          confidence: data.parsed.confidence || 0.98,
          summary: data.parsed.summary || ''
        };
      } else {
        parsedQuery = parseQueryWithHeuristics(query);
      }
    } else {
      parsedQuery = parseQueryWithHeuristics(query);
    }
  } catch {
    parsedQuery = parseQueryWithHeuristics(query);
  }

  // Calculate matching rooms deterministically
  const matchingRooms: RoomAvailability[] = [];
  const reqStartMin = timeToMinutes(parsedQuery.startTime);
  const reqEndMin = reqStartMin + parsedQuery.durationMinutes;
  const endTimeStr = minutesToTime(reqEndMin);

  for (const room of rooms) {
    // Check Floor requirement
    if (parsedQuery.floor !== 'Any' && room.floor !== parsedQuery.floor) {
      continue;
    }

    // Check AC requirement
    if (parsedQuery.acRequired === true && !room.hasAC) {
      continue;
    }
    if (parsedQuery.acRequired === false && room.hasAC) {
      continue;
    }

    // Check Capacity requirement
    if (parsedQuery.minCapacity !== null && room.capacity < parsedQuery.minCapacity) {
      continue;
    }

    // Check Availability for the full requested duration
    const availability = calculateRoomAvailability(
      room,
      timetables,
      parsedQuery.day,
      parsedQuery.startTime,
      parsedQuery.durationMinutes
    );

    if (availability.isFreeForRequestedDuration) {
      const floorExplanation = room.floorDetectionInfo?.patternMatched
        ? `Meets floor requirement (${room.floor} - auto-detected from ${room.roomNumber.charAt(0)}xx)`
        : `Meets floor requirement (${room.floor})`;

      const matchReasons: string[] = [
        `Available for the full requested duration (${formatTimeAMPM(parsedQuery.startTime)} to ${formatTimeAMPM(endTimeStr)})`,
        parsedQuery.floor !== 'Any'
          ? floorExplanation
          : `Located on ${room.floor} (auto-detected from room ${room.roomNumber})`,
        parsedQuery.minCapacity !== null
          ? `Meets capacity requirement (${room.capacity} seats >= ${parsedQuery.minCapacity} requested)`
          : `Spacious capacity of ${room.capacity} seats`,
        parsedQuery.acRequired !== null
          ? `Meets AC requirement (${room.hasAC ? 'Air Conditioned' : 'Non-AC as requested'})`
          : room.hasAC ? 'Equipped with Air Conditioning' : 'Standard ventilated room'
      ];

      matchingRooms.push({
        ...availability,
        matchReasons
      });
    }
  }

  // Sort matching rooms by capacity descending or room number
  matchingRooms.sort((a, b) => a.room.roomNumber.localeCompare(b.room.roomNumber, undefined, { numeric: true }));

  const hasExactMatches = matchingRooms.length > 0;
  let explanation = '';
  let closestAlternatives: { room: RoomAvailability; reasonForAlternative: string }[] = [];

  if (hasExactMatches) {
    explanation = `Found ${matchingRooms.length} room${matchingRooms.length > 1 ? 's' : ''} matching all your requirements (${parsedQuery.floor !== 'Any' ? parsedQuery.floor + ', ' : ''}${parsedQuery.acRequired !== null ? (parsedQuery.acRequired ? 'AC' : 'Non-AC') + ', ' : ''}${parsedQuery.minCapacity ? 'min ' + parsedQuery.minCapacity + ' seats, ' : ''}free from ${formatTimeAMPM(parsedQuery.startTime)} to ${formatTimeAMPM(endTimeStr)} on ${parsedQuery.day}).`;
  } else {
    // Clearly explain why no room matched
    const missingReasons: string[] = [];
    if (parsedQuery.floor !== 'Any') missingReasons.push(`on ${parsedQuery.floor}`);
    if (parsedQuery.acRequired === true) missingReasons.push('with AC');
    if (parsedQuery.acRequired === false) missingReasons.push('non-AC');
    if (parsedQuery.minCapacity) missingReasons.push(`for at least ${parsedQuery.minCapacity} people`);

    explanation = `No room matches all your requirements for the full ${parsedQuery.durationMinutes / 60}-hour period (${formatTimeAMPM(parsedQuery.startTime)} – ${formatTimeAMPM(endTimeStr)})${missingReasons.length > 0 ? ' ' + missingReasons.join(' ') : ''} on ${parsedQuery.day}. Classes are actively scheduled in conflicting slots.`;

    // Find closest alternatives
    closestAlternatives = findClosestAlternatives(
      rooms,
      timetables,
      parsedQuery.day,
      parsedQuery.startTime,
      parsedQuery.durationMinutes,
      parsedQuery.floor,
      parsedQuery.acRequired,
      parsedQuery.minCapacity
    );
  }

  return {
    parsedQuery,
    matchingRooms,
    hasExactMatches,
    explanation,
    closestAlternatives
  };
}
