import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { moodData } from "../utils/moodData";
import { Feather } from "@expo/vector-icons";

interface Props {
  data: { values: number[]; average: number; stableRate: number };
}

export default function MoodChangeChart({ data }: Props) {
  const totalWidth = Dimensions.get("window").width - 40;

  // base chart height (visual area excluding top/bottom padding)
  const height = 200;

  // vertical padding to avoid clipping dots
  const padTop = 12;
  const padBottom = 12;
  const svgHeight = height + padTop + padBottom; // real SVG height
  const innerHeight = height; // mapping range (0..height) then offset by padTop

  // layout
  const leftIconsWidth = 30;
  const paddingX = 6;
  const rightExtra = 12;

  const chartWidth = totalWidth - leftIconsWidth - paddingX * 2 - rightExtra;

  // values provided by user (max 7) — align to the end of the 7-day week
  const rawValues = data.values ?? [];
  const values = rawValues.slice(-7); // keep at most last 7 entries
  const providedCount = values.length;

  // full week labels always shown
  const allLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const FULL = 7;

  // start index in the full-week where provided values begin
  const startIndex = Math.max(0, FULL - providedCount);
  const lastDataIndex = startIndex + providedCount - 1; // index in 0..6 of last provided (today)

  // compute x step for 7 columns (we keep spacing for full week)
  const stepX = chartWidth / (FULL - 1);

  // mapping from full-week index -> value or 0 (no data)
  const fullWeekValues = new Array(FULL).fill(0);
  for (let i = 0; i < providedCount; i++) {
    fullWeekValues[startIndex + i] = values[i];
  }

  // convert mood (1..5) to y; clamp; if 0 (no data) shouldn't be called
  // returns y coordinate inside SVG (includes padTop offset)
  const getMoodY = (moodValue: number) => {
    const v = Math.max(1, Math.min(5, moodValue));
    const step = innerHeight / 4; // 4 intervals
    // top of inner area corresponds to mood 5
    const yInner = innerHeight - (v - 1) * step;
    return padTop + yInner;
  };

  // build path connecting non-zero values across fullWeek positions
  const buildSmoothPath = (vals: number[]) => {
    if (!vals || vals.length === 0) return "";
    let d = "";
    let lastNonZeroIndex: number | null = null;
    for (let i = 0; i < vals.length; i++) {
      const m = vals[i];
      if (m === 0) continue;
      const x = paddingX + i * stepX;
      const y = getMoodY(m);
      if (lastNonZeroIndex === null) {
        d += `M ${x},${y}`;
        lastNonZeroIndex = i;
      } else {
        const prevIdx = lastNonZeroIndex;
        const prevX = paddingX + prevIdx * stepX;
        const prevY = getMoodY(vals[prevIdx]);
        const midX = (prevX + x) / 2;
        d += ` C ${midX},${prevY} ${midX},${y} ${x},${y}`;
        lastNonZeroIndex = i;
      }
    }
    return d;
  };

  const path = buildSmoothPath(fullWeekValues);

  // state: selected column index (full-week 0..6). null = no selection (show today)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // helper: compute date for a full-week index, assuming index 6 is today's date
  const dateForIndex = (index: number) => {
    const today = new Date();
    const offsetDays = 6 - index;
    const d = new Date(today);
    d.setDate(today.getDate() - offsetDays);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}`;
  };

  // mood info to show in the box: if selected -> that index, else -> lastDataIndex (today)
  const displayIndex = selectedIndex ?? lastDataIndex;
  const displayValue = fullWeekValues[displayIndex] ?? 0;
  const displayMood = moodData.find((m) => m.value === displayValue) ?? null;

  // today's column x
  const xToday = paddingX + lastDataIndex * stepX;
  const xSelected = selectedIndex !== null ? paddingX + selectedIndex * stepX : null;

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        
        <View style={styles.headerRow}>
          <Feather name="trending-up" size={18} />
          <Text style={styles.title}>Thay đổi tâm trạng</Text>
        </View>
        {/* Tag box (shows selected day when tapped, otherwise shows today) */}
        <View style={styles.currentMoodBox}>
          {displayMood?.icon ? (
            <Image source={displayMood.icon} style={{ width: 28, height: 28, marginBottom: 4 }} />
          ) : (
            <View style={{ width: 28, height: 28, marginBottom: 4 }} />
          )}
          <Text style={styles.moodTitle}>
            {displayMood ? displayMood.label : "Chưa có dữ liệu"}
          </Text>
          <Text style={styles.moodDate}>Ngày {dateForIndex(displayIndex)}</Text>
        </View>
      </View>

      {/* ICONS + CHART */}
      <View style={styles.row}>
        {/* LEFT MOOD ICONS */}
        <View style={{ width: leftIconsWidth, height: svgHeight, position: "relative" }}>
          {moodData.map((m, i) => {
            const iconSize = 28;
            // align icons using getMoodY and offset for padTop
            const top = getMoodY(m.value) - iconSize / 2;
            return (
              <Image
                key={i}
                source={m.icon}
                style={[
                  styles.icon,
                  {
                    position: "absolute",
                    left: 0,
                    top,
                    width: iconSize,
                    height: iconSize,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* SVG CHART */}
        <View>
          <Svg width={totalWidth - leftIconsWidth} height={svgHeight}>
            {/* horizontal grid */}
            {[1, 2, 3, 4, 5].map((level) => {
              const y = getMoodY(level);
              const x1 = paddingX;
              const x2 = paddingX + chartWidth;
              return <Line key={level} x1={x1} x2={x2} y1={y} y2={y} stroke="#E0E0E0" strokeWidth={1} />;
            })}

            {/* vertical line: if selected -> at selected, else at today */}
            {selectedIndex !== null ? (
              <Line
                x1={xSelected!}
                x2={xSelected!}
                y1={padTop}
                y2={padTop + innerHeight}
                stroke="#7A6FF0"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ) : (
              <Line
                x1={xToday}
                x2={xToday}
                y1={padTop}
                y2={padTop + innerHeight}
                stroke="#D1D5DB"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            )}

            {/* path */}
            <Path d={path} stroke="#7A6FF0" strokeWidth={2} fill="none" />

            {/* dots for positions that have data */}
            {fullWeekValues.map((m, fullIdx) => {
              if (m === 0) return null; // no data -> no dot
              const mood = moodData.find((md) => md.value === m);
              if (!mood) return null;
              const x = paddingX + fullIdx * stepX;
              const y = getMoodY(m);
              const isSelected = selectedIndex === fullIdx;
              const r = isSelected ? 9 : 7;
              return (
                <Circle
                  key={fullIdx}
                  cx={x}
                  cy={y}
                  r={r}
                  fill={mood.color}
                  stroke="#fff"
                  strokeWidth={3}
                  onPress={() => {
                    setSelectedIndex((prev) => (prev === fullIdx ? null : fullIdx));
                  }}
                />
              );
            })}
          </Svg>
        </View>
      </View>

      {/* X labels: show all 7 labels; those without data are dimmed; today (lastDataIndex) bold */}
      <View style={[styles.xLabelsRow, { paddingLeft: paddingX + leftIconsWidth, paddingRight: paddingX + rightExtra }]}>
        {allLabels.map((lb, i) => {
          const hasData = i >= startIndex;
          const isTodayLabel = i === lastDataIndex;
          return (
            <Text
              key={i}
              style={[
                styles.xLabel,
                !hasData ? { color: "#d1d5db" } : {},
                isTodayLabel ? { fontWeight: "700", color: "#0c3d36" } : {},
              ]}
            >
              {lb}
            </Text>
          );
        })}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerBox}>
          <Text style={styles.footerLabel}>Trung bình</Text>
          <Text style={styles.footerValue}>{data.average}/5</Text>
        </View>

        <View style={{ width: 10 }} />

        <View style={styles.footerBox}>
          <Text style={styles.footerLabel}>Ổn định</Text>
          <Text style={styles.footerValue}>{data.stableRate}%</Text>
        </View>
      </View>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 18,
    marginVertical: 10,
  },
    headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  currentMoodBox: {
    alignItems: "flex-end",
  },
  moodTitle: {
    fontSize: 14,
    color: "#0c3d36",
  },
  moodDate: {
    fontSize: 13,
    color: "#9ca3af",
  },
  row: {
    flexDirection: "row",
    marginTop: 14,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  xLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  xLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  footer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  footerBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 12,
  },
  footerLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  footerValue: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: "700",
    color: "#7A6FF0",
  },
});
