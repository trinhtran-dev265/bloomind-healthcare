export interface Mood {
  id: string;
  emoji: string;
  label: string;
}

export interface MoodEntry {
  id: string;
  moodId: string;
  date: string; // ISO string, e.g., "2023-10-01"
  note?: string; // Optional note
}

export const MOODS: Mood[] = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' },
  { id: 'excited', emoji: '🤩', label: 'Excited' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
];