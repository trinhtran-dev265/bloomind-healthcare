// ../utils/analysisData.ts
import { AnalysisData } from "../types/analysis.types";

export const analysisData: AnalysisData = {
  totalEntries: 5,

  moodCounts: [
    { mood: "happy", count: 1, percent: 20 },
    { mood: "neutral", count: 1, percent: 20 },
    { mood: "peaceful", count: 1, percent: 20 },
    { mood: "sad", count: 1, percent: 20 },
    { mood: "anxious", count: 1, percent: 20 },
  ],

  streak: {
    current: 3,
    longest: 5,
    totalEntries: 5,
    days: [true, true, false, true, true, true, false],
  },

  trend: {
    positiveDays: 2,
    negativeDays: 2,
  },

  moodChange: {
    values: [2, 3, 0, 1, 4, 5, 0],
    average: 3,
    stableRate: 56
  },


  lastMoods: [
    {
      moodId: "happy",
      activities: [
        { id: "sleep", count: 2, percent: 67 },
        { id: "game", count: 1, percent: 33 },
      ],
    },
    {
      moodId: "sad",
      activities: [
        { id: "deadline", count: 1, percent: 50 },
        { id: "movie", count: 1, percent: 50 },
      ],
    },
  ],

  streakMonth: {
    current: 7,
    longest: 15,
    totalEntries: 8,
    days: [
      true, true, true, true, true,
      true, true, false, true, false,
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false, false, 
    ], 
  },

moodByMonth: [
  { day: 1, moodId: "neutral" },
  { day: 2, moodId: "neutral" },
  { day: 3, moodId: "sad" },
  { day: 4, moodId: "anxious" },
  { day: 5, moodId: "anxious" },
  { day: 6, moodId: "happy" },
  { day: 7, moodId: "peaceful" },
  { day: 8, moodId: null },
  { day: 9, moodId: "neutral" },
  { day: 10, moodId: null },
  { day: 11, moodId: null },
  { day: 12, moodId: null },
  { day: 13, moodId: null },
  { day: 14, moodId: null },
  { day: 15, moodId: null },
  { day: 16, moodId: null },
  { day: 17, moodId: null },
  { day: 18, moodId: null },
  { day: 19, moodId: null },
  { day: 20, moodId: null },
  { day: 21, moodId: null },
  { day: 22, moodId: null },
  { day: 23, moodId: null },
  { day: 24, moodId: null },
  { day: 25, moodId: null },
  { day: 26, moodId: null },
  { day: 27, moodId: null },
  { day: 28, moodId: null },
  { day: 29, moodId: null },
  { day: 30, moodId: null },
],

streakYear: {  
    current: 12,       
    longest: 45,       
    totalEntries: 150,
    days: Array(365).fill(false).map((_, i) => i % 5 !== 0) // ví dụ: mỗi 5 ngày false, còn lại true
  },

};
