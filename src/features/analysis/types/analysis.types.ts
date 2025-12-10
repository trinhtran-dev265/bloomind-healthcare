// ../types/analysis.types.ts

import { ImageSourcePropType } from "react-native";

/** Mood Item */
export interface MoodItem {
  id: string;
  label: string;
  icon: ImageSourcePropType;
}

/** Summary part */
export interface MoodCountItem {
  mood: string;   // "happy", "sad"...
  count: number;
  percent: number;
}

export interface MoodSummaryData {
  totalEntries: number;
  moodCounts: MoodCountItem[];
}

/** Streak */
export interface StreakData {
  current: number;
  longest: number;
  totalEntries: number;
  days: boolean[]; // length 7
}

/** Trend */
export interface TrendData {
  positiveDays: number;
  negativeDays: number;
}

/** Mood Change (chart) */
export interface MoodChangeData {
  values: number[];
  average: number;
  stableRate: number;
}


export interface LastMoodData {
  moodId: string; 
  activities: {
    id: string;
    count: number;
    percent: number;
  }[];
}

export interface StreakMonthData {
  current: number;
  longest: number;
  totalEntries: number;
  days: boolean[];  // length = số ngày trong tháng (28–31)
}
export interface MoodItemInMonth {
  day: number;          // 1..31
  moodId: string | null; // happy | sad | … | null nếu không có
}
export interface StreakYearData {
  current: number;       // chuỗi ngày hiện tại trong năm
  longest: number;       // chuỗi dài nhất trong năm
  totalEntries: number;  // tổng số mục nhập trong năm
  days: boolean[];       // length = 365 hoặc 366
}

/** Main analysis structure */
export interface AnalysisData {
  totalEntries: number;
  moodCounts: MoodCountItem[];
  streak: StreakData;
  trend: TrendData;
  moodChange: MoodChangeData;
 lastMoods: LastMoodData[];
 streakMonth: StreakMonthData;
 moodByMonth: MoodItemInMonth[];
streakYear?: StreakYearData;
}
