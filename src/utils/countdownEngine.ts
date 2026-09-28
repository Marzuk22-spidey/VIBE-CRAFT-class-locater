import { ClassTimetable, DayOfWeek, RoomMetadata, TimetableSlot } from '../types';
import { formatTimeAMPM, isVenueMatch, timeToMinutes } from './availabilityEngine';

export interface RoomLiveCountdown {
  status: 'FREE' | 'OCCUPIED';
  currentSlot: TimetableSlot | null;
  nextSlot: TimetableSlot | null;
  countdownSeconds: number;
  formattedCountdown: string;
  countdownLabel: string;
  nextClassTitle: string;
  nextClassStartsAt: string | null;
  freeUntilFormatted: string;
  canCallSquad: boolean;
  daySlots: TimetableSlot[];
}

/**
 * Calculates second-by-second countdown for a room at a given exact second of the day.
 * @param room RoomMetadata
 * @param timetables ClassTimetable[]
 * @param day DayOfWeek
 * @param nowSec number of seconds since midnight (0 to 86399)
 */
export function calculateRoomLiveCountdown(
  room: RoomMetadata,
  timetables: ClassTimetable[],
  day: DayOfWeek,
  nowSec: number
): RoomLiveCountdown {
  // Collect all slots for this room on this day
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

  // Find currently active slot (if any)
  const currentSlot = daySlots.find((slot) => {
    const sStart = timeToMinutes(slot.startTime) * 60;
    const sEnd = timeToMinutes(slot.endTime) * 60;
    return nowSec >= sStart && nowSec < sEnd;
  }) || null;

  // Find next upcoming slot starting strictly after nowSec
  const nextSlot = daySlots.find((slot) => {
    const sStart = timeToMinutes(slot.startTime) * 60;
    return sStart > nowSec;
  }) || null;

  let status: 'FREE' | 'OCCUPIED' = 'FREE';
  let countdownSeconds = 0;
  let countdownLabel = 'Free for';
  let nextClassTitle = 'No upcoming class scheduled today';
  let nextClassStartsAt: string | null = null;
  let freeUntilFormatted = '5:30 PM';
  let canCallSquad = false;

  if (currentSlot) {
    // ROOM IS CURRENTLY OCCUPIED
    status = 'OCCUPIED';
    const classEndSec = timeToMinutes(currentSlot.endTime) * 60;
    countdownSeconds = Math.max(0, classEndSec - nowSec);
    countdownLabel = 'Current class ends in';
    freeUntilFormatted = formatTimeAMPM(currentSlot.endTime);
    canCallSquad = false;

    if (nextSlot) {
      nextClassTitle = `${nextSlot.subjectCode} · ${nextSlot.subjectName}`;
      nextClassStartsAt = formatTimeAMPM(nextSlot.startTime);
    } else {
      nextClassTitle = 'No further classes scheduled after this';
      nextClassStartsAt = null;
    }
  } else {
    // ROOM IS CURRENTLY FREE
    status = 'FREE';
    canCallSquad = true;

    if (nextSlot) {
      const nextStartSec = timeToMinutes(nextSlot.startTime) * 60;
      countdownSeconds = Math.max(0, nextStartSec - nowSec);
      countdownLabel = 'Free for';
      nextClassTitle = `${nextSlot.subjectCode} · ${nextSlot.subjectName}`;
      nextClassStartsAt = formatTimeAMPM(nextSlot.startTime);
      freeUntilFormatted = formatTimeAMPM(nextSlot.startTime);
    } else {
      // No more classes today. Campus operational closing at 17:30 (5:30 PM)
      const campusClosingSec = (17 * 60 + 30) * 60; // 63000
      if (nowSec < campusClosingSec) {
        countdownSeconds = campusClosingSec - nowSec;
        countdownLabel = 'Free until campus close';
        freeUntilFormatted = '5:30 PM';
      } else {
        countdownSeconds = 0;
        countdownLabel = 'Free for the rest of today';
        freeUntilFormatted = 'End of Day';
      }
      nextClassTitle = 'No more classes scheduled today';
      nextClassStartsAt = null;
    }
  }

  // Format countdown into HH:MM:SS
  const clamped = Math.max(0, countdownSeconds);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;
  const formattedCountdown = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return {
    status,
    currentSlot,
    nextSlot,
    countdownSeconds,
    formattedCountdown,
    countdownLabel,
    nextClassTitle,
    nextClassStartsAt,
    freeUntilFormatted,
    canCallSquad,
    daySlots
  };
}

/**
 * Builds the WhatsApp deep-link message for "Call the Squad"
 * Example: "📍 Heading to IST 503. It's free until 2:30 PM. Come fast!"
 */
export function buildCallTheSquadMessage(room: RoomMetadata, freeUntilFormatted: string): string {
  const roomLabel = room.originalVenue || `Room ${room.roomNumber}`;
  return `📍 Heading to ${roomLabel}. It's free until ${freeUntilFormatted}. Come fast!`;
}

/**
 * Returns WhatsApp share URL
 */
export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
