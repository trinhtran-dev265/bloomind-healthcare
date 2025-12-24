import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Platform,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../app/navigation/types";
import MoodTodayCard from "../components/MoodTodayCard";
import { HomeHeader } from "../components/HomeHeader";
import { HomeActions } from "../components/HomeActions";
import { useHomeUser } from "../hooks/useHomeUser";
import { useTodayMood } from "../hooks/useTodayMood";
import { homeStyles as styles } from "../styles/home";
import { HOME_ASSETS } from "../../../types/contants/homeAssets";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  /* ---------------- hooks (đã tách) ---------------- */
  const userInfo = useHomeUser();
  const todayMood = useTodayMood();

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

  /* ---------------- mascot sizing ---------------- */
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

  const bottomInset = Platform.OS === "ios" ? 34 : 12;

  /* ---------------- render ---------------- */
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <HomeHeader userInfo={userInfo} />

          {/* Mood card */}
          <MoodTodayCard
            todayMood={todayMood}
            onPressEmpty={() => navigation.navigate("MoodTracking")}
            onEdit={() =>
              navigation.navigate("MoodTracking", { mode: "edit" })
            }
          />

          {/* Actions */}
          <HomeActions onNavigate={navigation.navigate} />

          {/* Mascot */}
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
        </View>
      </ScrollView>

      {/* ---------------- Bottom Navigation ---------------- */}
      <View style={[styles.bottomNavWrap, { paddingBottom: bottomInset }]}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="home-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Analysis")}
          >
            <Ionicons name="pie-chart-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>

          <View style={{ width: 76 }} />

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Journal")}
          >
            <Ionicons name="book-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>
        </View>

        {/* FAB */}
        <View style={[styles.fabContainer, { left: width / 2 - 28 }]}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate("Chatbot")}
            activeOpacity={0.9}
          >
            <Feather name="message-circle" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
