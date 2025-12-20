// utils/activities.ts
export interface ActivityItem {
  id: string;
  label: string;
  icon: string; // dùng cho Ionicons / Feather / Lucide
}

// Default activities
export const ACTIVITIES: ActivityItem[] = [
  { id: "work", label: "Công việc", icon: "briefcase" },
  { id: "study", label: "Học tập", icon: "book" },

  { id: "social", label: "Mạng xã hội", icon: "globe" },
  { id: "exercise", label: "Tập thể dục", icon: "activity" },

  { id: "sleep", label: "Ngủ", icon: "moon" },
  { id: "deadline", label: "Deadline", icon: "alert-circle" },

  { id: "game", label: "Game", icon: "monitor" },
  { id: "party", label: "Tiệc", icon: "sun" },

  { id: "cooking", label: "Nấu ăn", icon: "coffee" },
  { id: "movie", label: "Xem phim", icon: "film" },

  { id: "music", label: "Nghe nhạc", icon: "music" },
  { id: "meditation", label: "Thiền", icon: "wind" },

  { id: "travel", label: "Du lịch", icon: "map" },
];
