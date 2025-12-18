import TrendCard from "../components/TrendCard";
import MoodSummaryCard from "../components/MoodSummaryCard";
import StreakMonthChart from "../components/StreakMonthChart";
import { analysisData } from "../utils/analysisData";
import { ScrollView, View } from "react-native";
import PeriodSelector from "../components/PeriodSelector";
import { useState } from "react";
import MoodActivityCard from "../components/MoodActivityCard";
import { moodData } from "../utils/moodData";
import MonthMoodCalendar from "../components/MonthMoodCalendar";
import MoodWeekdayBarChart from "../components/MoodWeekdayBarChart";

export default function MonthAnalysisScreen() {
  const [monthIndex, setMonthIndex] = useState(11); // 0..11
  const [year, setYear] = useState(2025);
  const data = analysisData;

  const moodActivityData = data.lastMoods.map((item) => {
    const mood = moodData.find((m) => m.id === item.moodId);
    return {
      moodId: item.moodId,
      label: mood?.label ?? item.moodId,
      activities: item.activities,
    };
  });

  const handlePrev = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex((m) => m + 1);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PeriodSelector
        label={`Tháng ${monthIndex + 1}, ${year}`}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <View style={{ height: 16 }} />
      <StreakMonthChart streak={analysisData.streakMonth} month={monthIndex} year={year} />
      <MonthMoodCalendar
        month={monthIndex}
        year={year}
        moods={analysisData.moodByMonth}
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
