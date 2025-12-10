// MoodHistoryScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { moodData } from "../utils/moodData";
import { ACTIVITIES } from "../utils/activities";

type Params = {
  MoodHistory: {
    date: string; 
    moodInfo: {
      moodId: string;
      activities?: string[];
      note?: string;
    } | null;
  };
};

export default function MoodHistoryScreen() {
  const route = useRoute<RouteProp<Params, "MoodHistory">>();
  const navigation = useNavigation();
  const { date, moodInfo } = route.params;
  const d = new Date(date);

  const mood = moodInfo ? moodData.find((m) => m.id === moodInfo.moodId) : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Feather name="chevron-left" size={22} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Lịch sử - {d.toLocaleDateString()}</Text>
      </View>

      <View style={styles.card}>
        {/* Mood summary */}
        <View style={styles.moodRow}>
          <View style={[styles.moodCircle, { backgroundColor: mood?.color || "#F3F4F6" }]}>
            {mood?.icon ? <Image source={mood.icon} style={styles.moodBigIcon} /> : <Feather name="smile" size={28} />}
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.moodLabel}>{mood?.label || "Chưa chọn"}</Text>
            <Text style={styles.moodNoteDate}>{d.toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Activities */}
        <View style={{ marginTop: 18 }}>
          <Text style={styles.sectionTitle}>Hoạt động</Text>
          <View style={styles.activitiesRow}>
            {moodInfo?.activities && moodInfo.activities.length > 0 ? (
              moodInfo.activities.map((actId) => {
                const act = ACTIVITIES.find((a) => a.id === actId);
                return (
                  <View key={actId} style={[styles.activityChip, { backgroundColor: act?.color || "#EEE" }]}>
                    <Feather name={(act && act.icon) as any || "circle"} size={14} style={{ marginRight: 8 }} />
                    <Text style={styles.activityLabel}>{act?.label || actId}</Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>Không có hoạt động</Text>
            )}
          </View>
        </View>

        {/* Note */}
        <View style={{ marginTop: 18 }}>
          <Text style={styles.sectionTitle}>Ghi chú</Text>
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>{moodInfo?.note || "Không có ghi chú"}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  headerTitle: { marginLeft: 12, fontSize: 16, fontWeight: "600" },

  card: { backgroundColor: "#FAFAFB", padding: 16, borderRadius: 12 },

  moodRow: { flexDirection: "row", alignItems: "center" },
  moodCircle: { width: 64, height: 64, borderRadius: 32, justifyContent: "center", alignItems: "center" },
  moodBigIcon: { width: 80, height: 80, resizeMode: "contain" },
  moodLabel: { fontSize: 18, fontWeight: "700" },
  moodNoteDate: { color: "#6B7280", marginTop: 6 },

  sectionTitle: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 8 },

  activitiesRow: { flexDirection: "row", flexWrap: "wrap" },
  activityChip: { flexDirection: "row", alignItems: "center", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, marginRight: 8, marginBottom: 8 },
  activityLabel: { fontSize: 13 },
  emptyText: { color: "#9CA3AF" },

  noteBox: { backgroundColor: "#FFF", padding: 12, borderRadius: 8, minHeight: 64 },
  noteText: { color: "#374151" },
});
