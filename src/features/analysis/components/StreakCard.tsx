import { View, Text, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { StreakData } from "../types/analysis.types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  streak: StreakData; // thêm totalEntries cho ô thứ 3
}

export default function StreakCard({ streak }: Props) {
  const navigation = useNavigation();

  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Feather name="zap" size={18} color="#333" />
        <Text style={styles.title}>Chuỗi ngày liên tiếp</Text>
      </View>

      {/* Top stats: 3 ô */}
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

      {/* Weekdays grid */}
      <View style={styles.weekRow}>
        {weekDays.map((day, idx) => {
          const isActive = streak.days[idx];

          return (
            <Pressable
              key={idx}
              style={styles.cellWrapper}
              onPress={() => {
                if (!isActive) {
                  navigation.navigate("MoodTracking");
                }
              }}
            >
              <View
                style={[
                  styles.cell,
                  isActive ? styles.cellActive : styles.cellInactive,
                ]}
              >
                {isActive ? (
                  <Feather name="check-circle" size={16} color="#fff" />
                ) : (
                  <Feather name="plus" size={16} color="#999" />
                )}
              </View>
              <Text style={styles.dayText}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "600", marginLeft: 8 },
  
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statBox: {
    width: "32%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statLabel: { fontSize: 12, color: "#666", marginTop: 4,textAlign: "center", },
  statValue: { fontSize: 16, fontWeight: "700", marginTop: 2,textAlign: "center", },

  weekRow: { flexDirection: "row", justifyContent: "center",  },
  cellWrapper: { alignItems: "center", flex: 1, marginVertical: 10 },
  cell: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  cellActive: { backgroundColor: "#aaf6d1ff" },
  cellInactive: {
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#dad8d8ff",
  },
  dayText: { fontSize: 12, textAlign: "center" },
});
