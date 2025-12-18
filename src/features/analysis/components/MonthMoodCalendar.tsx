// MonthMoodCalendar.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MoodItemInMonth } from "../types/analysis.types";
import { moodData } from "../utils/moodData";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  month: number; 
  year: number;
  moods: MoodItemInMonth[]; 
}

export default function MonthMoodCalendar({ month, year, moods }: Props) {
  const navigation = useNavigation<any>();
  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startIndex = firstDay === 0 ? 6 : firstDay - 1;

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < startIndex; i++) calendarCells.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < calendarCells.length; i += 7) rows.push(calendarCells.slice(i, i + 7));

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = isCurrentMonth ? today.getDate() : -1;

  const openHistory = (day: number) => {
    const moodInfo = moods[day - 1] as MoodItemInMonth | undefined;
    navigation.navigate("MoodHistory", {
      date: new Date(year, month, day).toISOString(),
      moodInfo: moodInfo || null,
    });
  };

  const openTracking = (day: number) => {
    navigation.navigate("MoodTracking", {
      date: new Date(year, month, day).toISOString(),
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Feather name="calendar" size={18} color="#333" style={{ marginRight: 8 }} />
        <Text style={styles.title}>Xem theo tháng</Text>
      </View>

      <View style={styles.weekRow}>
        {weekDays.map((d) => (
          <Text key={d} style={styles.weekText}>
            {d}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((day, colIndex) => {
              // padding cell (outside current month)
              if (day === null) {
                return (
                  <View key={colIndex} style={styles.cell}>
                    <View style={[styles.circle, styles.emptyCircle]} />
                    <Text style={[styles.dayText, styles.inactiveDay]}>{""}</Text>
                  </View>
                );
              }

              const moodInfo = moods[day - 1];
              let moodIcon: any = null;
              if (moodInfo && moodInfo.moodId) {
                const mood = moodData.find((m) => m.id === moodInfo.moodId);
                if (mood) moodIcon = mood.icon;
              }

              const isToday = day === todayDate;

              // Case: day exists but moodId === null -> show plus and allow navigation to MoodTracking
              const isEmptyMood =
                moodInfo === undefined || (moodInfo && (moodInfo as any).moodId === null);

              // If mood exists (moodId not null) -> open history
              // If empty mood -> open tracking
              const handlePress = () => {
                if (isEmptyMood) openTracking(day);
                else openHistory(day);
              };

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.cell}
                  activeOpacity={0.7}
                  onPress={handlePress}
                >
                  <View style={[styles.circle, isToday ? styles.todayCircle : null]}>
                    {moodIcon ? (
                      <Image source={moodIcon} style={styles.moodIcon} />
                    ) : isEmptyMood ? (
                      <Feather name="plus" size={18} color="#9CA3AF" />
                    ) : null}
                  </View>
                  <Text style={[styles.dayText, isToday ? styles.dayTextToday : null]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingBottom: 30,
    paddingTop: 10,
    paddingHorizontal: 16,
    marginVertical:10,
  },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  title: { fontSize: 16, fontWeight: "600" },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6, paddingHorizontal: 6 },
  weekText: { width: "14.2857%", textAlign: "center", fontSize: 12, fontWeight: "600" },
  grid: { marginTop: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  cell: { width: "14.2857%", alignItems: "center" },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEF2F6",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCircle: { backgroundColor: "#F9FAFB", borderColor: "#F3F4F6" },
  todayCircle: { borderColor: "#868686ff", borderWidth: 1 },
  moodIcon: { width: 40, height: 40, resizeMode: "contain" },
  dayText: { marginTop: 6, fontSize: 12, color: "#374151" },
  dayTextToday: { fontWeight: "600", color: "#111827" },
  inactiveDay: { color: "transparent" },
});
