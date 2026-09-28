export type FloorType =
  | 'Ground Floor'
  | '1st Floor'
  | '2nd Floor'
  | '3rd Floor'
  | '4th Floor'
  | '5th Floor'
  | '6th Floor'
  | '7th Floor'
  | 'Floor Unknown'
  | string;

export interface RoomMetadata {
  id: string;
  roomNumber: string; // e.g. "503", "IST 503"
  originalVenue?: string; // e.g. "IST 503", preserved verbatim from timetable
  building: string;
  floor: FloorType;
  hasAC: boolean;
  capacity: number;
  type: 'Lecture Hall' | 'Classroom' | 'Seminar Hall' | 'Computer Lab';
  facilities: string[];
  floorDetectionInfo?: {
    patternMatched: boolean;
    detectedFloor: FloorType;
    explanation: string;
  };
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface TimetableSlot {
  id: string;
  day: DayOfWeek;
  startTime: string; // HH:mm format, e.g. "09:30"
  endTime: string;   // HH:mm format, e.g. "10:30"
  subjectCode: string;
  subjectName: string;
  instructor: string;
  roomNumber: string;
  classSection: string; // e.g. "CS-A", "AI-DS"
}

export interface ClassTimetable {
  id: string;
  classSection: string; // e.g. "CS-A (Computer Science Yr 3)"
  department: string;
  semester: string;
  totalStudents: number;
  slots: TimetableSlot[];
}

export type RoomStatus = 'FREE' | 'OCCUPIED' | 'AVAILABLE_SOON';

export interface RoomAvailability {
  room: RoomMetadata;
  status: RoomStatus;
  isFreeForRequestedDuration: boolean;
  freeUntil?: string; // e.g. "14:30" or "End of Day"
  freeFrom?: string;  // e.g. "11:00"
  availableDurationMinutes: number;
  currentOrNextSlot?: TimetableSlot;
  conflictingSlots: TimetableSlot[];
  daySlots: TimetableSlot[];
  reason?: string;
  matchReasons?: string[];
}

export interface SearchFilters {
  date: string; // YYYY-MM-DD
  day: DayOfWeek;
  startTime: string; // HH:mm
  durationMinutes: number; // e.g. 120 for 2 hours
  floor: 'All' | FloorType;
  acOption: 'All' | 'AC' | 'Non-AC';
  minCapacity: number;
  statusFilter: 'All' | 'Free Only' | 'Occupied Only';
  isNowActive?: boolean;
}

export interface ParsedAIQuery {
  rawQuery: string;
  floor: FloorType | 'Any';
  acRequired: boolean | null;
  minCapacity: number | null;
  durationMinutes: number;
  startTime: string;
  date: string;
  day: DayOfWeek;
  confidence: number;
  summary: string;
}

export interface AIQueryResult {
  parsedQuery: ParsedAIQuery;
  matchingRooms: RoomAvailability[];
  hasExactMatches: boolean;
  explanation: string;
  closestAlternatives: {
    room: RoomAvailability;
    reasonForAlternative: string;
  }[];
}
