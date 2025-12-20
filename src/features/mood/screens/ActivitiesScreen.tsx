// screens/ActivitiesScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ACTIVITIES, ActivityItem } from "../utils/activities";
import ActivityTag from "../components/ActivityTag";
import AddActivityModal from "../components/AddActivityModal";
import { fetchActivities, addActivityToFirebase } from "../services/activityService";
import { auth } from "../../../services/firebase/firebaseConfig";
import { saveMoodLog } from "../services/moodLogService";
import { DETAIL_MOODS } from "../utils/detailMoods";
import { getMoodLogByDate } from "../services/moodLogService";
import { getTodayKey } from "../../../utils/date";

const ActivitiesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [activities, setActivities] = useState<ActivityItem[]>(ACTIVITIES);
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [detailMoods, setDetailMoods] = useState<string[]>([]);

  const { moodId, moodLabel } = (route.params || {}) as {
    moodId?: string;
    moodLabel?: string;
  };

  const toggleDetailMood = (item: string) => {
    setDetailMoods((prev) => {
      if (prev.includes(item)) {
        return prev.filter((x) => x !== item);
      }
      if (prev.length >= 3) return prev;
      return [...prev, item];
    });
  };

  // useEffect(() => {
  //   if (!auth.currentUser) return;

  //   fetchActivities(auth.currentUser.uid).then(setActivities);
  // }, []);

  useEffect(() => {
    const loadExistingLog = async () => {
      if (!auth.currentUser) return;

      const todayKey = getTodayKey();
      const log = await getMoodLogByDate(auth.currentUser.uid, todayKey);

      if (!log) return;

      // Prefill data
      setDetailMoods(log.detailMoods || []);
      setSelected(log.activities || []);
      setNotes(log.note || "");
    };

    loadExistingLog();
  }, []);


  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddActivity = async (newItem: ActivityItem) => {
    if (!auth.currentUser) return;

    await addActivityToFirebase(auth.currentUser.uid, newItem);
    setActivities((prev) => [...prev, newItem]);
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    if (!moodId || !moodLabel) {
      Alert.alert("Thiếu thông tin", "Vui lòng chọn tâm trạng");
      return;
    }

    // if (selected.length === 0) {
    //   Alert.alert("Chưa chọn hoạt động", "Bạn đã làm gì hôm nay?");
    //   return;
    // }

    await saveMoodLog(auth.currentUser.uid, {
      moodId,
      moodLabel,
      detailMoods,
      activities: selected,
      note: notes,
    });

    navigation.navigate("MoodTrackingSaved");
  };

  return (
    <View style={styles.container}>

      {/* DETAIL MOOD SECTION */}
      <View style={styles.detailMoodSection}>
        <Text style={styles.detailQuestion}>
          Cảm xúc nào mô tả rõ nhất hôm nay của bạn?
        </Text>
        <Text style={styles.detailHint}>Chọn tối đa 3</Text>

        <View style={styles.detailTags}>
          {(DETAIL_MOODS[moodId ?? ""] || []).map((item) => {
            const active = detailMoods.includes(item);
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.detailTag,
                  active && styles.detailTagActive,
                ]}
                onPress={() => toggleDetailMood(item)}
              >
                <Text
                  style={[
                    styles.detailTagText,
                    active && styles.detailTagTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>


      <Text style={styles.title}>Hôm nay bạn đã làm gì?</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.grid}>
          {activities.map((item) => (
            <ActivityTag
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              onPress={() => toggleSelect(item.id)}
            />
          ))}

          <TouchableOpacity
            style={styles.newTag}
            onPress={() => setShowModal(true)}
          >
            <Text style={{ fontSize: 18 }}>＋ Thêm</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Bạn đang cảm thấy thế nào..."
          value={notes}
          onChangeText={setNotes}
          style={styles.input}
          multiline
        />
      </ScrollView>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Lưu</Text>
      </TouchableOpacity>

      <AddActivityModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddActivity}
      />
    </View>
  );
};

export default ActivitiesScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#fffbf2",
  },
  detailMoodSection: {
    marginBottom: 24,
  },

  detailQuestion: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },

  detailHint: {
    fontSize: 14,
    color: "#888",
    marginBottom: 14,
  },

  detailTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  detailTag: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#fff",
    margin: 6,
  },

  detailTagActive: {
    backgroundColor: "#ffe1ecff",
  },

  detailTagText: {
    fontSize: 18,
    color: "#555",
  },

  detailTagTextActive: {
    color: "#000",
    fontWeight: "500",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  newTag: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    borderWidth: 2,
    borderColor: "#a8a8a8ff",
    paddingHorizontal: 20
  },

  input: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    padding: 15,
    marginTop: 30,
    minHeight: 90,
    textAlignVertical: "top",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#acacacff"
  },

  saveBtn: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#444",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
