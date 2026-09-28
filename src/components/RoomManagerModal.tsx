import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  Wind, 
  Users, 
  Building2, 
  Save, 
  Check, 
  Radio,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { FloorType, RoomMetadata } from '../types';
import { syncEngine } from '../services/syncService';
import { detectFloorFromVenue } from '../utils/floorDetector';

interface RoomManagerModalProps {
  rooms: RoomMetadata[];
  onRoomsUpdated: (rooms: RoomMetadata[]) => void;
  onClose: () => void;
}

export const RoomManagerModal: React.FC<RoomManagerModalProps> = ({
  rooms,
  onRoomsUpdated,
  onClose
}) => {
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<RoomMetadata>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRoomVenue, setNewRoomVenue] = useState<string>('');
  const [newRoomForm, setNewRoomForm] = useState<Partial<RoomMetadata>>({
    building: 'Information Systems Tower (Block A)',
    hasAC: true,
    capacity: 60,
    type: 'Classroom',
    facilities: ['Air Conditioned', 'Projector', 'Whiteboard']
  });
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Auto-detect floor from typed venue in new room form
  const newRoomDetection = detectFloorFromVenue(newRoomVenue);

  const handleStartEdit = (room: RoomMetadata) => {
    setEditingRoomId(room.id);
    setEditForm({ ...room, originalVenue: room.originalVenue || room.roomNumber });
  };

  const handleSaveEdit = () => {
    if (!editingRoomId || (!editForm.roomNumber && !editForm.originalVenue)) return;
    const venue = editForm.originalVenue || editForm.roomNumber || '';
    const detection = detectFloorFromVenue(venue);

    const updated = rooms.map((r) => {
      if (r.id === editingRoomId) {
        return {
          ...r,
          ...editForm,
          roomNumber: detection.extractedRoomNumber || editForm.roomNumber || venue,
          originalVenue: venue,
          floor: detection.floor, // Auto-detected from venue
          capacity: Number(editForm.capacity) || 40,
          floorDetectionInfo: {
            patternMatched: detection.patternMatched,
            detectedFloor: detection.floor,
            explanation: detection.explanation
          }
        } as RoomMetadata;
      }
      return r;
    });
    syncEngine.saveRooms(updated);
    onRoomsUpdated(updated);
    setEditingRoomId(null);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomVenue.trim()) return;

    const detection = detectFloorFromVenue(newRoomVenue.trim());

    const newRoom: RoomMetadata = {
      id: `room-${detection.extractedRoomNumber.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      roomNumber: detection.extractedRoomNumber, // extracted room number e.g. "503"
      originalVenue: newRoomVenue.trim(), // original venue e.g. "IST 503"
      building: newRoomForm.building || 'Main Academic Block',
      floor: detection.floor, // automatically detected from first digit!
      hasAC: Boolean(newRoomForm.hasAC),
      capacity: Number(newRoomForm.capacity) || 50,
      type: newRoomForm.type || 'Classroom',
      facilities: newRoomForm.facilities || ['Whiteboard'],
      floorDetectionInfo: {
        patternMatched: detection.patternMatched,
        detectedFloor: detection.floor,
        explanation: detection.explanation
      }
    };

    const updated = [...rooms, newRoom];
    syncEngine.saveRooms(updated);
    onRoomsUpdated(updated);
    setIsAddingNew(false);
    setNewRoomVenue('');
    setNewRoomForm({
      building: 'Information Systems Tower (Block A)',
      hasAC: true,
      capacity: 60,
      type: 'Classroom',
      facilities: ['Air Conditioned', 'Whiteboard']
    });
  };

  const handleDeleteRoom = (id: string) => {
    if (!confirm('Are you sure you want to remove this room?')) return;
    const updated = rooms.filter((r) => r.id !== id);
    syncEngine.saveRooms(updated);
    onRoomsUpdated(updated);
  };

  const handleExportJson = () => {
    const data = syncEngine.exportModuleData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibecraft-round2-schema-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice('Module schema JSON downloaded successfully!');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = syncEngine.importModuleData(content);
        if (success) {
          onRoomsUpdated(syncEngine.getRooms());
          setExportNotice('Data successfully imported and synchronized!');
          setTimeout(() => setExportNotice(null), 3000);
        } else {
          alert('Failed to parse schema. Ensure the file contains valid rooms array.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (!confirm('Reset all rooms and timetables to initial college dataset?')) return;
    syncEngine.resetToDefault();
    onRoomsUpdated(syncEngine.getRooms());
    setExportNotice('Reset to default college datasets completed!');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="sticky top-0 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 p-5 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Building2 className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-black text-white tracking-tight">
                Room Metadata &amp; Sync Architecture
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Edit room attributes, customize capacities and AC info, or export for hackathon module integration.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">

          {/* Sync & Inter-Module Actions */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-400">
                BroadcastChannel Sync: Active (vibecraft_class_locator_sync)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJson}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors font-medium"
                title="Export complete JSON schema"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Export Schema</span>
              </button>

              <label className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors font-medium cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-rose-400 border border-neutral-700 transition-colors font-medium"
                title="Reset to default college dataset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {exportNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-medium flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{exportNotice}</span>
            </div>
          )}

          {/* Add New Room Toggle */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Configured Classrooms ({rooms.length})
            </h3>
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingNew ? 'Cancel' : 'Add Room'}</span>
            </button>
          </div>

          {/* New Room Form */}
          {isAddingNew && (
            <form onSubmit={handleCreateRoom} className="bg-neutral-950 p-4 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Create Classroom Record (Auto-Floor Detection)
                </h4>
                <span className="text-[11px] text-neutral-400">
                  Floor is extracted from the 1st digit (e.g. IST 503 → 5th Floor)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Venue / Room Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IST 503, IST 612"
                    value={newRoomVenue}
                    onChange={(e) => setNewRoomVenue(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    Try &quot;IST 503&quot;, &quot;IST 612&quot;, or &quot;Seminar Annex&quot;
                  </span>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Floor (Auto-Detected)</label>
                  <div className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                    newRoomDetection.patternMatched
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : newRoomVenue.trim()
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                  }`}>
                    {newRoomDetection.patternMatched ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{newRoomDetection.floor}</span>
                      </>
                    ) : newRoomVenue.trim() ? (
                      <>
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Floor Unknown</span>
                      </>
                    ) : (
                      <span>Enter venue to detect</span>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    {newRoomDetection.patternMatched ? `First digit '${newRoomDetection.firstDigit}'` : 'Auto-assigned'}
                  </span>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Capacity</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={newRoomForm.capacity || 60}
                    onChange={(e) => setNewRoomForm({ ...newRoomForm, capacity: parseInt(e.target.value, 10) })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Climate</label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                      <input
                        type="radio"
                        name="newRoomAc"
                        checked={newRoomForm.hasAC === true}
                        onChange={() => setNewRoomForm({ ...newRoomForm, hasAC: true })}
                      />
                      <span>AC</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                      <input
                        type="radio"
                        name="newRoomAc"
                        checked={newRoomForm.hasAC === false}
                        onChange={() => setNewRoomForm({ ...newRoomForm, hasAC: false })}
                      />
                      <span>Non-AC</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  Save Classroom
                </button>
              </div>
            </form>
          )}

          {/* Rooms Table */}
          <div className="border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 uppercase font-mono text-[10px] tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="p-3">Room / Venue</th>
                    <th className="p-3">Auto-Detected Floor</th>
                    <th className="p-3">Building</th>
                    <th className="p-3">Climate</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {rooms.map((room) => {
                    const isEditing = editingRoomId === room.id;
                    const editDetection = detectFloorFromVenue(editForm.originalVenue || editForm.roomNumber || '');

                    if (isEditing) {
                      return (
                        <tr key={room.id} className="bg-emerald-950/20">
                          <td className="p-3 font-mono font-bold text-white">
                            <input
                              type="text"
                              value={editForm.originalVenue || editForm.roomNumber || ''}
                              onChange={(e) => setEditForm({ ...editForm, originalVenue: e.target.value, roomNumber: e.target.value })}
                              className="w-28 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-white font-mono"
                              placeholder="e.g. IST 503"
                            />
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                              editDetection.patternMatched ? 'text-emerald-400 bg-emerald-500/15' : 'text-amber-400 bg-amber-500/15'
                            }`}>
                              {editDetection.floor}
                            </span>
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={editForm.building || ''}
                              onChange={(e) => setEditForm({ ...editForm, building: e.target.value })}
                              className="w-36 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-white"
                            />
                          </td>
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => setEditForm({ ...editForm, hasAC: !editForm.hasAC })}
                              className={`px-2.5 py-1 rounded-lg border font-medium ${
                                editForm.hasAC
                                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                              }`}
                            >
                              {editForm.hasAC ? 'AC Room' : 'Non-AC'}
                            </button>
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={editForm.capacity || 40}
                              onChange={(e) => setEditForm({ ...editForm, capacity: parseInt(e.target.value, 10) })}
                              className="w-16 bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-white font-mono"
                            />
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={handleSaveEdit}
                                className="p-1.5 rounded-lg bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400"
                                title="Save changes"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingRoomId(null)}
                                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={room.id} className="hover:bg-neutral-800/40">
                        <td className="p-3 font-mono font-bold text-white">
                          <div>
                            <span>Room {room.roomNumber}</span>
                            {room.originalVenue && room.originalVenue !== room.roomNumber && (
                              <span className="block text-[10px] text-sky-400 font-normal">
                                {room.originalVenue}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 font-medium ${
                            room.floor === 'Floor Unknown' ? 'text-amber-400' : 'text-neutral-200'
                          }`}>
                            {room.floor === 'Floor Unknown' ? (
                              <HelpCircle className="w-3 h-3 text-amber-400" />
                            ) : (
                              <Sparkles className="w-3 h-3 text-emerald-400" />
                            )}
                            {room.floor}
                          </span>
                        </td>
                        <td className="p-3 text-neutral-400 truncate max-w-[140px]">{room.building}</td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium text-[11px] ${
                              room.hasAC
                                ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            }`}
                          >
                            <Wind className="w-3 h-3" />
                            {room.hasAC ? 'AC' : 'Non-AC'}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-neutral-300">
                          {room.capacity} seats
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleStartEdit(room)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                              title="Edit room"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRoom(room.id)}
                              className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-neutral-800"
                              title="Delete room"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-neutral-900 border-t border-neutral-800 p-4 flex items-center justify-between z-10">
          <span className="text-xs text-neutral-500">
            Changes persist across reloads and sync with connected tabs.
          </span>
          <button
            onClick={onClose}
            className="bg-neutral-100 hover:bg-white text-neutral-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
