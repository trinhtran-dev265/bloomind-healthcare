import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../../services/firebase/AuthContext";
import RecommendationCard from "../components/RecommendationCard";

import { MoodLog } from "../types/mood";
import { RecommendationAction } from "../types/recommendation";
import { fetchTodayMoodLog } from "../services/moodLogsService";
import { analyzeMood } from "../services/moodAnalysis";
import { generateRecommendations } from "../services/recommender";

import {
  fetchRecommendationStatus,
  toggleRecommendationDone,
} from "../services/recommendationStatusService";

import { RootStackParamList } from "../../../app/navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Recommendation"
>;

/* ✅ LOCAL DATE (VN) */
function getTodayKeyLocal() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function RecommendationScreen({ navigation, route }: Props) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [todayMood, setTodayMood] = useState<MoodLog | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [actions, setActions] = useState<RecommendationAction[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const todayKey = getTodayKeyLocal();

  /* ================= HEADER ================= */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Gợi ý hôm nay",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
        >
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  /* ========== LOAD MOOD ========== */
  useEffect(() => {
    if (route.params?.todayMood) {
      setTodayMood(route.params.todayMood);
      setLoading(false);
      return;
    }

    const fetchMood = async () => {
      if (!user) {
        console.log("No user, skipping mood fetch");
        setLoading(false);
        return;
      }

      try {
        const log = await fetchTodayMoodLog(user.uid);
        setTodayMood(log);
        console.log("Mood fetched:", log);
      } catch (err) {
        console.error("🔥 Fetch mood failed:", err);
        setTodayMood(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMood();
  }, [route.params, user]);

  /* ========== ANALYSIS ========= */
  useEffect(() => {
    if (loading) {
      setAnalysis("Đang tải dữ liệu tâm trạng hôm nay ⏳");
      return;
    }

    if (!todayMood) {
      setAnalysis("Bạn chưa có dữ liệu tâm trạng hôm nay 🌱");
      return;
    }

    const fetchAnalysis = async () => {
      setAnalysis("Đang phân tích tâm trạng hôm nay ⏳");
      const insight = analyzeMood(todayMood); // MoodInsight
      setAnalysis(insight.summary)
    };

    fetchAnalysis();
  }, [todayMood, loading]);
  /* ========== GENERATE RECOMMENDATIONS (ASYNC) ========= */
  useEffect(() => {
    if (!todayMood) {
      setActions([]);
      return;
    }

    const fetchActions = async () => {
      try {
        const result = await generateRecommendations(todayMood);
        setActions(result);
      } catch (err) {
        console.error("🔥 Generate recommendations failed:", err);
        setActions([]);
      }
    };

    fetchActions();
  }, [todayMood]);

  /* ========== LOAD DONE STATUS (CHỈ 1 LẦN) ========= */
  useEffect(() => {
    if (!user || hasInteracted) return;

    const loadStatus = async () => {
      try {
        const res = await fetchRecommendationStatus(user.uid, todayKey);
        setDoneIds(res.doneIds);
        console.log("DoneIds loaded:", res.doneIds);
      } catch (e) {
        console.error("🔥 Load recommendation status failed", e);
      }
    };

    loadStatus();
  }, [user, todayKey, hasInteracted]);

  /* ========== TOGGLE DONE (OPTIMISTIC UI) ========= */
  const handleToggle = async (action: RecommendationAction) => {
    if (!user) return;

    setHasInteracted(true);

    const alreadyDone = doneIds.includes(action.id);
    const expValue = action.exp ?? 0;

    setDoneIds(prev =>
      alreadyDone ? prev.filter(id => id !== action.id) : [...prev, action.id]
    );

    try {
      await toggleRecommendationDone(
        user.uid,
        todayKey,
        action.id,
        expValue,
        alreadyDone
      );
    } catch (e) {
      console.error("🔥 Toggle recommendation failed:", e);
      setDoneIds(prev =>
        alreadyDone ? [...prev, action.id] : prev.filter(id => id !== action.id)
      );
    }
  };

  /* ================= RENDER ================= */
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.analysis}>{analysis}</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" />
      ) : !todayMood ? (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={styles.empty}>
            Hãy ghi lại tâm trạng để nhận gợi ý nhé 💛
          </Text>
          <Button
            title="Ghi mood"
            onPress={() =>
              navigation.navigate("MoodTracking", { mode: "create" })
            }
          />
        </View>
      ) : actions.length === 0 ? (
        <Text style={styles.empty}>Chưa có gợi ý phù hợp 😌</Text>
      ) : (
        actions.map(item => (
          <RecommendationCard
            key={item.id}
            action={item}
            done={doneIds.includes(item.id)}
            onToggle={() => handleToggle(item)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  analysis: {
    fontSize: 15,
    color: "#555",
    marginBottom: 16,
  },
  empty: {
    marginTop: 24,
    color: "#999",
    textAlign: "center",
  },
});
