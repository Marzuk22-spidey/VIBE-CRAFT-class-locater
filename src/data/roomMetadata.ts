import { RoomMetadata } from '../types';
import { detectFloorFromVenue } from '../utils/floorDetector';

interface RawRoomConfig {
  venue: string;
  building: string;
  hasAC: boolean;
  capacity: number;
  type: 'Lecture Hall' | 'Classroom' | 'Seminar Hall' | 'Computer Lab';
  facilities: string[];
}

const RAW_ROOMS: RawRoomConfig[] = [
  // Ground Floor (000 series: 001, 002, 003) -> Starts with 0
  {
    venue: 'IST 001',
    building: 'Information Systems Tower (Block A)',
    hasAC: true,
    capacity: 60,
    type: 'Classroom',
    facilities: ['Air Conditioned', 'Projector', 'Power Outlets']
  },
  {
    venue: 'IST 002',
    building: 'Information Systems Tower (Block A)',
    hasAC: false,
    capacity: 50,
    type: 'Classroom',
    facilities: ['Ceiling Fans', 'Whiteboard', 'Dual Screen Projector']
  },
  {
    venue: 'IST 003',
    building: 'Information Systems Tower (Block A)',
    hasAC: true,
    capacity: 70,
    type: 'Lecture Hall',
    facilities: ['Air Conditioned', 'Smart Podium', 'Surround Sound']
  },

  // 1st Floor (100 series: 101, 102) -> Starts with 1
  {
    venue: 'IST 101',
    building: 'Information Systems Tower (Block A)',
    hasAC: true,
    capacity: 60,
    type: 'Classroom',
    facilities: ['Air Conditioned', 'Projector', 'Whiteboard', 'Power Outlets']
  },
  {
    venue: 'IST 102',
    building: 'Information Systems Tower (Block A)',
    hasAC: false,
    capacity: 45,
    type: 'Classroom',
    facilities: ['Ceiling Fans', 'Whiteboard', 'Dual Screen Projector']
  },

  // 2nd Floor (200 series: 201, 211) -> Starts with 2
  {
    venue: 'IST 201',
    building: 'Information Systems Tower (Block A)',
    hasAC: true,
    capacity: 60,
    type: 'Classroom',
    facilities: ['Air Conditioned', 'Smart Board', 'Microphone System']
  },
  {
    venue: 'IST 211',
    building: 'Information Systems Tower (Block A)',
    hasAC: true,
    capacity: 55,
    type: 'Classroom',
    facilities: ['Air Conditioned', 'Projector', 'Power Plugs on Desks']
  },

  // 3rd Floor (300 series: 301, 303) -> Starts with 3
  {
    venue: 'IST 301',
    building: 'Science & Computing Wing (Block B)',
    hasAC: true,
    capacity: 75,
    type: 'Lecture Hall',
    facilities: ['Air Conditioned', 'Interactive Display', 'Audio System', 'Tiered Seating']
  },
  {
    venue: 'IST 303',
    building: 'Science & Computing Wing (Block B)',
    hasAC: true,
    capacity: 60,
    type: 'Computer Lab',
    facilities: ['Air Conditioned', '60 Workstations', 'High-speed Ethernet', 'UPS Backup']
  },

  // 4th Floor (400 series: 401, 416) -> Starts with 4
  {
    venue: 'IST 401',
    building: 'Tech Wing (Block C)',
    hasAC: true,
    capacity: 80,
    type: 'Lecture Hall',
    facilities: ['Air Conditioned', 'Dual Projectors', 'Wireless Mic', 'Tiered Desks']
  },
  {
    venue: 'IST 416',
    building: 'Tech Wing (Block C)',
    hasAC: false,
    capacity: 50,
    type: 'Classroom',
    facilities: ['High-Power Fans', 'Whiteboard', 'AV System']
  },

  // 5th Floor (500 series: 501, 503) -> Starts with 5
  {
    venue: 'IST 501',
    building: 'Executive Wing (Block D)',
    hasAC: true,
    capacity: 120,
    type: 'Lecture Hall',
    facilities: ['Central AC', '4K Laser Projector', 'Dolby Audio', 'Charging Docks']
  },
  {
    venue: 'IST 503',
    building: 'Executive Wing (Block D)',
    hasAC: true,
    capacity: 60,
    type: 'Classroom',
    facilities: ['Central AC', 'Interactive Display', 'Ergonomic Seating', 'Surround Sound']
  },

  // 6th Floor (600 series: 601, 612) -> Starts with 6
  {
    venue: 'IST 601',
    building: 'Research & Innovation Tower (Block E)',
    hasAC: true,
    capacity: 90,
    type: 'Seminar Hall',
    facilities: ['Central AC', 'Dual LED Walls', 'Conference Audio', 'Stage Lighting']
  },
  {
    venue: 'IST 612',
    building: 'Research & Innovation Tower (Block E)',
    hasAC: true,
    capacity: 65,
    type: 'Classroom',
    facilities: ['Air Conditioned', 'Smart Podium', 'Ultra-HD Display', 'LAN Ports']
  },

  // Unnumbered / Non-conforming venue -> "Floor Unknown" without guessing
  {
    venue: 'Seminar Annex',
    building: 'Open Arts Complex (Block F)',
    hasAC: false,
    capacity: 40,
    type: 'Seminar Hall',
    facilities: ['Natural Ventilation', 'Moveable Desks', 'Acoustic Panels']
  }
];

// Automatically detect floor for every room using detectFloorFromVenue
export const INITIAL_ROOM_METADATA: RoomMetadata[] = RAW_ROOMS.map((raw) => {
  const detection = detectFloorFromVenue(raw.venue);
  return {
    id: `room-${detection.extractedRoomNumber.toLowerCase().replace(/\s+/g, '-')}`,
    roomNumber: detection.extractedRoomNumber, // e.g. "001", "101", "211", "301", "416", "503", "612"
    originalVenue: raw.venue, // e.g. "IST 001", "IST 101", "IST 503"
    building: raw.building,
    floor: detection.floor, // Auto-detected: "Ground Floor" (0xx), "1st Floor" (1xx), "2nd Floor" (2xx), etc.
    hasAC: raw.hasAC,
    capacity: raw.capacity,
    type: raw.type,
    facilities: raw.facilities,
    floorDetectionInfo: {
      patternMatched: detection.patternMatched,
      detectedFloor: detection.floor,
      explanation: detection.explanation
    }
  };
});
