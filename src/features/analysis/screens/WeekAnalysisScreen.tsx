import React, { useState, useMemo } from "react";
import { ScrollView, View } from "react-native";

import MoodSummaryCard from "../components/MoodSummaryCard";
import StreakCard from "../components/StreakCard";
import TrendCard from "../components/TrendCard";
import MoodChangeChart from "../components/MoodChangeChart";
import MoodActivityCard from "../components/MoodActivityCard";
import PeriodSelector from "../components/PeriodSelector";

import { analysisData } from "../utils/analysisData";
import { moodData } from "../utils/moodData";

interface LastMoodData {
  moodId: string;
  activities: { id: string; count: number; percent: number }[];
}

interface MoodActivityItem {
  moodId: string;
  label: string;
  activities: { id: string; count: number; percent: number }[];
}

function getMonday(date: Date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; 
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

const formatDate = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;

export default function WeekAnalysisScreen() {
  const data = analysisData;

  const [offset, setOffset] = useState(0); // offset = 0 => tuần này, 1 => tuần trước 1, ...

  // tính start/end của tuần dựa trên offset
  const { start, end } = useMemo(() => {
    const mondayThisWeek = getMonday(new Date());
    const s = new Date(mondayThisWeek);
    s.setDate(mondayThisWeek.getDate() - offset * 7);
    const e = new Date(s);
    e.setDate(s.getDate() + 6);
    return { start: s, end: e };
  }, [offset]);

  // label tuần
  const label = useMemo(() => {
    let l = `${formatDate(start)} - ${formatDate(end)}`;
    if (offset === 0) l = `Tuần này (${l})`;
    else if (offset === 1) l = `Tuần trước (${l})`;
    else l = `Tuần cách đây ${offset} tuần (${l})`;
    return l;
  }, [start, end, offset]);

  // dữ liệu mood luôn lấy lastMoods, thêm label
  const moodActivityData: MoodActivityItem[] = useMemo(() => {
    return (data.lastMoods ?? []).map((item) => {
      const mood = moodData.find((m) => m.id === item.moodId);
      return {
        moodId: item.moodId,
        label: mood?.label ?? item.moodId, // thêm label
        activities: item.activities,
      };
    });
  }, [data.lastMoods]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: 16 }}>
      <PeriodSelector
        label={label}
        onPrev={() => setOffset((v) => v + 1)}
        onNext={() => setOffset((v) => Math.max(0, v - 1))}
      />

      <View style={{ height: 16 }} />
      <StreakCard streak={data.streak} />
      <MoodChangeChart data={data.moodChange} />
      <MoodSummaryCard data={data} />
      <TrendCard trend={data.trend} />
      <MoodActivityCard data={moodActivityData} />
    </ScrollView>
  );
}
