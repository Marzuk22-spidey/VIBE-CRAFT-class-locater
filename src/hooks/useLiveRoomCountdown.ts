import { useEffect, useState } from 'react';
import { ClassTimetable, DayOfWeek, RoomMetadata } from '../types';
import { calculateRoomLiveCountdown, RoomLiveCountdown } from '../utils/countdownEngine';
import { getDayOfWeekFromDate, getTodayDateString } from '../utils/availabilityEngine';

export function useLiveRoomCountdown(
  room: RoomMetadata | null,
  timetables: ClassTimetable[],
  customDay?: DayOfWeek
): RoomLiveCountdown | null {
  const getSecondsNow = () => {
    const d = new Date();
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
  };

  const getEffectiveDay = (): DayOfWeek => {
    if (customDay) return customDay;
    return getDayOfWeekFromDate(getTodayDateString());
  };

  const [liveData, setLiveData] = useState<RoomLiveCountdown | null>(() => {
    if (!room) return null;
    return calculateRoomLiveCountdown(room, timetables, getEffectiveDay(), getSecondsNow());
  });

  useEffect(() => {
    if (!room) {
      setLiveData(null);
      return;
    }

    // Initial evaluation
    const day = getEffectiveDay();
    setLiveData(calculateRoomLiveCountdown(room, timetables, day, getSecondsNow()));

    // Update every second without page refresh
    const interval = setInterval(() => {
      const nowSec = getSecondsNow();
      const currentDay = getEffectiveDay();
      const updated = calculateRoomLiveCountdown(room, timetables, currentDay, nowSec);
      setLiveData(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [room?.id, timetables, customDay]);

  return liveData;
}
