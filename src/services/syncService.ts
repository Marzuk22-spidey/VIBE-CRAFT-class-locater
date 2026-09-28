import { ClassTimetable, RoomMetadata } from '../types';
import { INITIAL_ROOM_METADATA } from '../data/roomMetadata';
import { INITIAL_TIMETABLES } from '../data/timetableData';

const ROOM_STORAGE_KEY = 'vibecraft_rooms_v4';
const TIMETABLE_STORAGE_KEY = 'vibecraft_timetables_v4';

export interface SyncPayload {
  type: 'ROOM_METADATA_UPDATED' | 'TIMETABLE_UPDATED' | 'RESET_ALL';
  timestamp: number;
  moduleId: string;
  data?: unknown;
}

export class VibeCraftSyncEngine {
  private static instance: VibeCraftSyncEngine;
  private channel: BroadcastChannel | null = null;
  private listeners: ((payload: SyncPayload) => void)[] = [];

  private constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('vibecraft_class_locator_sync');
        this.channel.onmessage = (event) => {
          this.notifyListeners(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported in this context', e);
      }
    }
  }

  public static getInstance(): VibeCraftSyncEngine {
    if (!VibeCraftSyncEngine.instance) {
      VibeCraftSyncEngine.instance = new VibeCraftSyncEngine();
    }
    return VibeCraftSyncEngine.instance;
  }

  public subscribe(callback: (payload: SyncPayload) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notifyListeners(payload: SyncPayload) {
    this.listeners.forEach((cb) => {
      try {
        cb(payload);
      } catch (err) {
        console.error('Error in sync listener', err);
      }
    });
  }

  public broadcast(payload: SyncPayload) {
    if (this.channel) {
      this.channel.postMessage(payload);
    }
    this.notifyListeners(payload);
  }

  // Room Metadata operations
  public getRooms(): RoomMetadata[] {
    if (typeof window === 'undefined') return INITIAL_ROOM_METADATA;
    try {
      const stored = localStorage.getItem(ROOM_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load rooms from localStorage', e);
    }
    return INITIAL_ROOM_METADATA;
  }

  public saveRooms(rooms: RoomMetadata[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(rooms));
      this.broadcast({
        type: 'ROOM_METADATA_UPDATED',
        timestamp: Date.now(),
        moduleId: 'room-locator-r2',
        data: rooms
      });
    } catch (e) {
      console.error('Failed to save rooms to localStorage', e);
    }
  }

  public updateRoom(updatedRoom: RoomMetadata) {
    const current = this.getRooms();
    const index = current.findIndex((r) => r.id === updatedRoom.id);
    let newRooms: RoomMetadata[];
    if (index >= 0) {
      newRooms = [...current];
      newRooms[index] = updatedRoom;
    } else {
      newRooms = [...current, updatedRoom];
    }
    this.saveRooms(newRooms);
  }

  // Timetables operations
  public getTimetables(): ClassTimetable[] {
    if (typeof window === 'undefined') return INITIAL_TIMETABLES;
    try {
      const stored = localStorage.getItem(TIMETABLE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load timetables from localStorage', e);
    }
    return INITIAL_TIMETABLES;
  }

  public saveTimetables(timetables: ClassTimetable[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TIMETABLE_STORAGE_KEY, JSON.stringify(timetables));
      this.broadcast({
        type: 'TIMETABLE_UPDATED',
        timestamp: Date.now(),
        moduleId: 'room-locator-r2',
        data: timetables
      });
    } catch (e) {
      console.error('Failed to save timetables to localStorage', e);
    }
  }

  public resetToDefault() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ROOM_STORAGE_KEY);
    localStorage.removeItem(TIMETABLE_STORAGE_KEY);
    this.broadcast({
      type: 'RESET_ALL',
      timestamp: Date.now(),
      moduleId: 'room-locator-r2'
    });
  }

  // Export full schema for Round 2 hackathon integration
  public exportModuleData() {
    return {
      schemaVersion: '2.0.0',
      application: 'VIBECRAFT Free Class Locator',
      exportedAt: new Date().toISOString(),
      rooms: this.getRooms(),
      timetables: this.getTimetables()
    };
  }

  public importModuleData(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.rooms) && Array.isArray(data.timetables)) {
        this.saveRooms(data.rooms);
        this.saveTimetables(data.timetables);
        return true;
      }
    } catch (e) {
      console.error('Invalid import data format', e);
    }
    return false;
  }
}

export const syncEngine = VibeCraftSyncEngine.getInstance();
