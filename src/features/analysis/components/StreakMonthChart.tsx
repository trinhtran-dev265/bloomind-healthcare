import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StreakMonthData } from "../types/analysis.types";
import { Feather } from "@expo/vector-icons";

interface Props {
  streak: StreakMonthData;
  month?: number;
  year?: number;
}

export default function StreakMonthChart({ streak, month, year }: Props) {
  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const today = new Date();
  const useYear = typeof year === "number" ? year : today.getFullYear();
  const useMonth = typeof month === "number" ? month : today.getMonth();

  // số ngày của tháng được cung cấp
  const daysInMonth = new Date(useYear, useMonth + 1, 0).getDate();

  // đảm bảo streak.days có đúng length daysInMonth (pad false nếu cần)
  const daysArr: boolean[] = Array.from({ length: daysInMonth }, (_, i) => {
    return streak.days && i < streak.days.length ? Boolean(streak.days[i]) : false;
  });

  // Tính ngày đầu của tháng và startIndex (Mon=0..Sun=6)
  const firstDay = new Date(useYear, useMonth, 1).getDay(); // 0 = Sun
  const startIndex = firstDay === 0 ? 6 : firstDay - 1;

  // Build calendar cells with null padding head/tail so columns align with weekday labels
  const calendarCells: ({ day: number; active: boolean } | null)[] = [];

  for (let i = 0; i < startIndex; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d, active: daysArr[d - 1] });
  }
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  // chunk into rows
  const rows: ({ day: number; active: boolean } | null)[][] = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    rows.push(calendarCells.slice(i, i + 7));
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Feather name="zap" size={18} color="#333" style={{ marginRight: 6 }} />
          <Text style={styles.title}>Chuỗi ngày liên tiếp</Text>
        </View>
      </View>

      {/* Top stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: "#E7F6ED" }]}>
          <Feather name="clock" size={16} color="#4CAF50" />
          <Text style={styles.statLabel}>Hiện tại</Text>
          <Text style={styles.statValue}>{streak.current}</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: "#FFEAEA" }]}>
          <Feather name="award" size={16} color="#F44336" />
          <Text style={styles.statLabel}>Dài nhất</Text>
          <Text style={styles.statValue}>{streak.longest}</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: "#FFF7E1" }]}>
          <Feather name="check-circle" size={16} color="#FFC107" />
          <Text style={styles.statLabel}>Số lần ghi</Text>
          <Text style={styles.statValue}>{streak.totalEntries}</Text>
        </View>
      </View>


      {/* weekdays labels */}
      <View style={styles.weekRow}>
        {weekDays.map((d) => (
          <Text key={d} style={styles.weekText}>
            {d}
          </Text>
        ))}
      </View>

      {/* grid */}
      <View style={styles.gridWrapper}>
        {rows.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((cell, colIdx) => {
              if (!cell) {
                // now render empty as a column-aligned wrapper with a small inner square
                return (
                  <View key={colIdx} style={styles.cellWrapper}>
                    <View style={styles.emptyInner} />
                  </View>
                );
              }

              const cellDate = new Date(useYear, useMonth, cell.day);
              const isToday = cellDate.toDateString() === new Date().toDateString();

              return (
                <View key={colIdx} style={styles.cellWrapper}>
                  <View
                    style={[
                      styles.cell,
                      cell.active && styles.cellActive,
                      isToday && styles.todayOutline,
                    ]}
                  >
                    {cell.active && (
                      <Feather name="award" size={12} color="#fff" style={styles.iconCentered} />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* bottom */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomTitle}>{daysInMonth} ngày trong tháng</Text>
        <Text style={styles.bottomCount}>{streak.totalEntries} mục nhập</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginVertical: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "600" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    width: "32%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statLabel: { fontSize: 12, color: "#666", textAlign: "center", marginTop:4 },
  statValue: { fontSize: 16, fontWeight: "600", marginTop: 4, textAlign: "center", },

  weekRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  weekText: {
    fontSize: 12,
    width: "14.2857%",
    textAlign: "center",
    color: "#777",
  },

  gridWrapper: {
    marginTop: 12,
    paddingHorizontal: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  cellWrapper: {
    width: "14.2857%",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyInner: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#f7f9fa",
  },

  cell: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#fff4df",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  cellActive: {
    backgroundColor: "#ffc677",
  },

  todayOutline: {
    borderWidth: 1.5,
    borderColor: "#8f8f8f",
  },

  iconCentered: {
    position: "absolute",
  },

  bottomRow: {
    backgroundColor: "#F7F7F7",
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
  },
  bottomTitle: { fontSize: 12, color: "#666" },
  bottomCount: { marginTop: 4, fontWeight: "600", fontSize: 14 },
});
