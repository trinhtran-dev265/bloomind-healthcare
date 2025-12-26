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

import { RootStackParamList , NoParamRoute} from "../../../app/navigation/types";
import MoodTodayCard from "../components/MoodTodayCard";
import { HomeHeader } from "../components/HomeHeader";
import { HomeActions } from "../components/HomeActions";
import { useHomeUser } from "../hooks/useHomeUser";
import { useTodayMood } from "../hooks/useTodayMood";
import { homeStyles as styles } from "../styles/home";
import { HOME_ASSETS } from "../../../types/contants/homeAssets";
import RecommendationCard from "../../recommender/components/RecommendationCard";
import { generateRecommendations } from "../../recommender/services/recommender";
import { RecommendationAction } from "../../recommender/types/recommendation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const userInfo = useHomeUser();
  const todayMood = useTodayMood();

  const [recommendations, setRecommendations] =
    useState<RecommendationAction[]>([]);

  /* mascot animation */
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

const onRecommend = () => {
  if (!todayMood) return;

  navigation.navigate("Recommendation", {
    todayMood: {
      date: new Date().toISOString().slice(0, 10),
      moodId: todayMood.id,          // 🔥 QUAN TRỌNG
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
          <HomeHeader userInfo={userInfo} />

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

          <HomeActions onNavigate={handleNavigate} />

          <View style={styles.mascotContainer}>
            <Animated.View
              pointerEvents="none"
              style={{ transform: [{ translateY: floatAnim }] }}
            >
              <Animated.Image
                source={HOME_ASSETS.mascot}
                style={{
                  width: width * 0.8,
                  height: width * 0.8,
                  resizeMode: "contain",
                }}
              />
            </Animated.View>
          </View>

          {/* {recommendations.length > 0 && (
            <View style={{ padding: 16 }}>
              {recommendations.map((item) => (
                <RecommendationCard key={item.id} action={item} />
              ))}
            </View>
          )} */}
        </View>
      </ScrollView>

      {/* Bottom nav */}
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
