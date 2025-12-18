import MoodSummaryCard from "../components/MoodSummaryCard";
import TrendCard from "../components/TrendCard";
import { analysisData } from "../utils/analysisData";
import { ScrollView, View } from "react-native";
import PeriodSelector from "../components/PeriodSelector";
import { useState } from "react";
import { moodData } from "../utils/moodData";
import MoodActivityCard from "../components/MoodActivityCard";
import MoodWeekdayBarChart from "../components/MoodWeekdayBarChart";
import MoodYearMiniMonths, { MoodByDay } from "../components/MoodYearMiniMonths";

export default function YearAnalysisScreen() {
  const [year, setYear] = useState(2025); // year thực tế
  const [monthIndex, setMonthIndex] = useState(11);
  const data = analysisData;

  const moodActivityData = data.lastMoods.map((item) => {
    const mood = moodData.find((m) => m.id === item.moodId);
    return {
      moodId: item.moodId,
      label: mood?.label ?? item.moodId,
      activities: item.activities,
    };
  });

  const moodByYear: MoodByDay[][] = Array.from({ length: 12 }, (_, i) => {
    if (i === 11) {
      return (analysisData as any).moodByMonth as MoodByDay[];
    }
    return [];
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PeriodSelector
        label={`Năm ${year}`}
        onPrev={() => setYear((y) => y - 1)}
        onNext={() => setYear((y) => y + 1)}
      />

      <View style={{ height: 16 }} />
      <MoodYearMiniMonths
        year={year}
        moodByYear={moodByYear}
        streak={data.streakYear} 
        onPressMonth={(m) => console.log("open month", m)}
      />
      <MoodSummaryCard data={data} />
      <TrendCard trend={data.trend} />
      <MoodWeekdayBarChart
        month={monthIndex}
        year={year}
        moodByMonth={analysisData.moodByMonth}
        onPressBar={(weekdayIndex, avg) => {
          console.log("Pressed weekday", weekdayIndex, avg);
        }}
      />
      <MoodActivityCard data={moodActivityData} />
    </ScrollView>
  );
}
