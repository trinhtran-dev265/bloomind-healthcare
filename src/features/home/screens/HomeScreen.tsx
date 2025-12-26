// app/screens/HomeScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  Platform,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, NoParamRoute } from "../../../app/navigation/types";
import MoodTodayCard from "../components/MoodTodayCard";
import { HomeHeader } from "../components/HomeHeader";
import { HomeActions } from "../components/HomeActions";
import { useHomeUser } from "../hooks/useHomeUser";
import { useTodayMood } from "../hooks/useTodayMood";
import { homeStyles as styles } from "../styles/home";
import { HOME_ASSETS } from "../../../types/contants/homeAssets";
import RecommendationCard from "../../recommender/components/RecommendationCard";
import { RecommendationAction } from "../../recommender/types/recommendation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  /* ---------------- hooks ---------------- */
  const userInfo = useHomeUser();
  const todayMood = useTodayMood();

  const [recommendations, setRecommendations] =
    useState<RecommendationAction[]>([]);

  /* ---------------- mascot animation ---------------- */
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  /* ================= BIG MASCOT (TAKEN FROM OLD FILE) ================= */

  const HEADER_EST = 80;
  const ACTIONS_EST = 110;
  const BOTTOM_NAV_EST = isWeb ? 110 : 90;
  const EXTRA_SPACING = 20;
  const MOOD_CARD_EST = 150;

  const availableHeightForMascot = Math.max(
    0,
    height -
      (HEADER_EST +
        MOOD_CARD_EST +
        ACTIONS_EST +
        BOTTOM_NAV_EST +
        EXTRA_SPACING)
  );

  const webMax = 700;
  const byWidth = Math.round(width * 0.85);
  const byAvailable = Math.round(
    Math.max(availableHeightForMascot * 0.98, 320)
  );

  const mascotMaxHeight = Math.min(
    byWidth,
    byAvailable,
    isWeb ? webMax : Infinity
  );

  const mascotWidth = Math.round(mascotMaxHeight * 0.98);

  const mascotLift = isWeb
    ? Math.round(mascotMaxHeight * 0.08)
    : Math.round(mascotMaxHeight * 0.12);

  const offsetMultiplierWeb = 0.06;
  const offsetMultiplierMobile = 0.02;

  const rawOffset = Math.round(
    width * (isWeb ? offsetMultiplierWeb : offsetMultiplierMobile)
  );
  const maxOffset = Math.round(width * 0.18);
  const mascotOffsetX = Math.min(rawOffset, maxOffset);

  /* ================= END BIG MASCOT ================= */

  const onRecommend = () => {
    if (!todayMood) return;

    navigation.navigate("Recommendation", {
      todayMood: {
        date: new Date().toISOString().slice(0, 10),
        moodId: todayMood.id,
        moodLabel: todayMood.label,
        detailMoods: todayMood.detailMoods || [],
        note: "",
        activities: [],
      },
    });
  };

  const handleNavigate = (route: NoParamRoute) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header */}
          <HomeHeader userInfo={userInfo} />

          {/* Mood card */}
          <MoodTodayCard
            todayMood={todayMood}
            onPressEmpty={() =>
              navigation.navigate("MoodTracking", { mode: "create" })
            }
            onEdit={() =>
              navigation.navigate("MoodTracking", { mode: "edit" })
            }
            onRecommend={onRecommend}
          />

          {/* Actions */}
          <HomeActions onNavigate={handleNavigate} />

          {/* ================= BIG MASCOT RENDER ================= */}
          <View style={styles.mascotContainer}>
            <Animated.View
              pointerEvents="none"
              style={{
                transform: [
                  { translateX: mascotOffsetX },
                  { translateY: floatAnim },
                  { translateY: -mascotLift },
                ],
                alignItems: "center",
              }}
            >
              <Animated.Image
                source={HOME_ASSETS.mascot}
                style={{
                  width: mascotWidth,
                  height: mascotMaxHeight,
                  resizeMode: "contain",
                }}
              />
            </Animated.View>
          </View>
          {/* ====================================================== */}

          {/* Optional recommendations (giữ comment như file mới) */}
          {/* {recommendations.length > 0 && (
            <View style={{ padding: 16 }}>
              {recommendations.map((item) => (
                <RecommendationCard key={item.id} action={item} />
              ))}
            </View>
          )} */}
        </View>
      </ScrollView>

      {/* ---------------- Bottom nav ---------------- */}
      <View style={styles.bottomNavWrap}>
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home-outline" size={22} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Analysis")}>
            <Ionicons name="pie-chart-outline" size={22} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Journal")}>
            <Ionicons name="book-outline" size={22} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-outline" size={22} />
          </TouchableOpacity>
        </View>

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <Feather name="message-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
