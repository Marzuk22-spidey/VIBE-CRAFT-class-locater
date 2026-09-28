import { FloorType } from '../types';

export interface FloorDetectionResult {
  originalVenue: string;
  extractedRoomNumber: string;
  floor: FloorType;
  firstDigit: string | null;
  patternMatched: boolean;
  explanation: string;
}

/**
 * Maps a single digit character to its corresponding floor name.
 * 1 -> 1st Floor
 * 2 -> 2nd Floor
 * 3 -> 3rd Floor
 * 4 -> 4th Floor
 * 5 -> 5th Floor
 * 6 -> 6th Floor
 * ...
 * 0 -> Ground Floor
 */
export function digitToFloor(digit: string): FloorType | 'Floor Unknown' {
  switch (digit) {
    case '0':
      return 'Ground Floor';
    case '1':
      return '1st Floor';
    case '2':
      return '2nd Floor';
    case '3':
      return '3rd Floor';
    case '4':
      return '4th Floor';
    case '5':
      return '5th Floor';
    case '6':
      return '6th Floor';
    case '7':
      return '7th Floor';
    case '8':
      return '8th Floor';
    case '9':
      return '9th Floor';
    default:
      return 'Floor Unknown';
  }
}

/**
 * Extracts room number and detects floor from a timetable venue name.
 * Examples:
 *   "IST 503" -> extractedRoomNumber: "503", floor: "5th Floor"
 *   "IST 612" -> extractedRoomNumber: "612", floor: "6th Floor"
 *   "IST 211" -> extractedRoomNumber: "211", floor: "2nd Floor"
 *   "IST 416" -> extractedRoomNumber: "416", floor: "4th Floor"
 *   "Room 304" -> extractedRoomNumber: "304", floor: "3rd Floor"
 *   "Seminar Hall A" -> extractedRoomNumber: "Seminar Hall A", floor: "Floor Unknown"
 */
export function detectFloorFromVenue(venueName: string): FloorDetectionResult {
  if (!venueName || typeof venueName !== 'string') {
    return {
      originalVenue: '',
      extractedRoomNumber: '',
      floor: 'Floor Unknown',
      firstDigit: null,
      patternMatched: false,
      explanation: 'No venue provided.'
    };
  }

  const trimmed = venueName.trim();

  // Look for a numeric room pattern (e.g. "IST 503", "Room 612", "503", "B-211", "IST416")
  // Captures 3 or 4 digits, or digits following prefix like IST/Room/Lab/Block
  const roomPattern = /(?:[A-Za-z\s\-_]*?)(\d{2,4})\b/;
  const match = trimmed.match(roomPattern);

  if (match && match[1]) {
    const digits = match[1];
    const firstDigit = digits.charAt(0);
    const floor = digitToFloor(firstDigit);

    if (floor !== 'Floor Unknown') {
      return {
        originalVenue: trimmed,
        extractedRoomNumber: digits,
        floor,
        firstDigit,
        patternMatched: true,
        explanation: `${trimmed} → Room ${digits} → ${floor} (from first digit '${firstDigit}')`
      };
    }
  }

  // Venue does not follow standard numbering pattern (e.g. "Seminar Hall A", "Workshop", "Auditorium")
  // Do NOT guess floor; mark as "Floor Unknown" as requested.
  return {
    originalVenue: trimmed,
    extractedRoomNumber: trimmed,
    floor: 'Floor Unknown',
    firstDigit: null,
    patternMatched: false,
    explanation: `${trimmed} does not follow room numbering pattern → Floor Unknown`
  };
}

/**
 * Canonical floor sort comparator:
 * Ground Floor -> 1st Floor -> 2nd Floor -> ... -> Floor Unknown
 */
export function compareFloors(a: FloorType, b: FloorType): number {
  if (a === b) return 0;
  if (a === 'Floor Unknown') return 1;
  if (b === 'Floor Unknown') return -1;
  if (a === 'Ground Floor') return -1;
  if (b === 'Ground Floor') return 1;

  const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
  const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
  return numA - numB;
}
