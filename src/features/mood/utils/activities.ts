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
  { id: "party", label: "Tiệc", icon: "sunny" },

  { id: "cooking", label: "Nấu ăn", icon: "restaurant" },
  { id: "movie", label: "Xem phim", icon: "film" },

  { id: "music", label: "Nghe nhạc", icon: "headset" },
  { id: "meditation", label: "Thiền", icon: "leaf" },

  { id: "travel", label: "Du lịch", icon: "map" },
];
