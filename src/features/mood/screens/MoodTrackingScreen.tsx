// screens/MoodTrackingScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { moodData, MoodItem } from "../utils/moodData";
import { auth } from "../../../services/firebase/firebaseConfig";
import { getMoodLogByDate } from "../services/moodLogService";
import { getTodayKey } from "../../../utils/date";

const MoodTrackingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { mode } = (route.params || {}) as { mode?: "edit" };

  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "edit") return;

    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;

    const load = async () => {
      const todayKey = getTodayKey();
      const log = await getMoodLogByDate(uid, todayKey);
      if (log) {
        setSelectedMood(log.moodId);
      }
    };

    load();
  }, [mode]);

  const currentMood: MoodItem | undefined =
    moodData.find((m) => m.id === selectedMood);

  return (
    <View style={styles.container}>
      {/* Selected mood preview */}
      <View style={styles.selectedMoodContainer}>
        {currentMood ? (
          <>
            <Image source={currentMood.icon} style={styles.selectedIcon} />
            <Text style={styles.selectedLabel}>{currentMood.label}</Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>
            Chọn tâm trạng của bạn
          </Text>
        )}
      </View>

      <Text style={styles.subtitle}>Hôm nay bạn cảm thấy thế nào?</Text>

      {/* Mood options */}
      <View style={styles.moodContainer}>
        {moodData.map((mood) => {
          const isActive = selectedMood === mood.id;

          return (
            <TouchableOpacity
              key={mood.id}
              style={styles.moodItem}
              onPress={() => setSelectedMood(mood.id)}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && styles.iconWrapperActive,
                ]}
              >
                <Image source={mood.icon} style={styles.icon} />
              </View>

              <Text
                style={[
                  styles.moodText,
                  isActive && styles.activeMood,
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !selectedMood && { opacity: 0.4 }]}
        disabled={!selectedMood}
        onPress={() => {
          if (!currentMood) return;

          navigation.navigate("Activities", {
            moodId: currentMood.id,
            moodLabel: currentMood.label,
            mode,
          });
        }}
      >
        <Text style={styles.nextText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoodTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf2",
    paddingTop: 50,
    alignItems: "center",
  },

  selectedMoodContainer: {
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedIcon: {
    width: 160,
    height: 110,
    resizeMode: "contain",
  },

  selectedLabel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  placeholderText: {
    fontSize: 16,
    color: "#AAA",
  },

  subtitle: {
    marginTop: 30,
    fontSize: 16,
    color: "#333",
  },

  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    width: "85%",
  },

  moodItem: {
    width: "30%",
    alignItems: "center",
    marginVertical: 12,
  },

  iconWrapper: {
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  iconWrapperActive: {
    backgroundColor: "#fff",
  },

  icon: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },

  moodText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  activeMood: {
    color: "#145611",
    fontWeight: "700",
  },

  nextButton: {
    position: "absolute",
    bottom: 50,
    width: "70%",
    paddingVertical: 14,
    backgroundColor: "#454545",
    borderRadius: 30,
    alignItems: "center",
  },

  nextText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
});

