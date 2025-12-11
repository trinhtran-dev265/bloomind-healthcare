import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../app/navigation/types";
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  // floating animation for mascot
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  // ----------------------------
  // responsive mascot sizing + offset to the right
  // ----------------------------
  const HEADER_EST = 80;
  const ACTIONS_EST = 110;
  const BOTTOM_NAV_EST = isWeb ? 110 : 90;
  const EXTRA_SPACING = 20;

  const availableHeightForMascot = Math.max(0, height - (HEADER_EST + ACTIONS_EST + BOTTOM_NAV_EST + EXTRA_SPACING));

  const webMax = 700;
  const byWidth = Math.round(width * 0.85);
  const byAvailable = Math.round(Math.max(availableHeightForMascot * 0.98, 320));
  const mascotMaxHeight = Math.min(byWidth, byAvailable, isWeb ? webMax : Infinity);
  const mascotWidth = Math.round(mascotMaxHeight * 0.98);

  // Mascot lift: move it up slightly
  const mascotLift = isWeb ? Math.round(mascotMaxHeight * 0.08) : Math.round(mascotMaxHeight * 0.12);

  // NEW: offset mascot to the right to balance composition
  // tweak these multipliers to increase/decrease shift
  const offsetMultiplierWeb = 0.06;   // ~6% of width on web
  const offsetMultiplierMobile = 0.02; // ~2% of width on mobile
  const rawOffset = Math.round(width * (isWeb ? offsetMultiplierWeb : offsetMultiplierMobile));

  // limit offset so mascot never goes off-screen: max 18% of width
  const maxOffset = Math.round(width * 0.18);
  const mascotOffsetX = Math.min(rawOffset, maxOffset);

  const bottomInset = Platform.OS === "ios" ? 34 : 12;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top header */}
        <View style={styles.headerRow}>
          <View style={styles.leftHeader}>
            <Image
              source={require("../../../../assets/images/avatar.png")}
              style={styles.avatar}
            />
            <View style={styles.greetingWrap}>
              <Text style={styles.dateText}>Thur, 13 Feb 2025</Text>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>Hey Trinh!</Text>
                <Text style={styles.xpText}> 200/1000 EXP</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // optional action
            }}
            style={styles.fireBtn}
          >
            <Feather name="zap" size={18} color="#6AA84F" />
          </TouchableOpacity>
        </View>

        {/* three action circles */}
        <View style={styles.topActions}>
          <ActionCircle
            label="Journal"
            img={require("../../../../assets/images/journal.png")}
            onPress={() => navigation.navigate("Journal")}
            actionWidth={Math.floor((width - 40) / 3)}
          />
          <ActionCircle
            label="Mood tracking"
            img={require("../../../../assets/images/moodtracking.png")}
            onPress={() => navigation.navigate("MoodTracking")}
            actionWidth={Math.floor((width - 40) / 3)}
          />
          <ActionCircle
            label="Chatbot"
            img={require("../../../../assets/images/chatbot.png")}
            onPress={() => navigation.navigate("Chatbot")}
            actionWidth={Math.floor((width - 40) / 3)}
          />
        </View>

        {/* Big mascot */}
        <View style={[styles.mascotContainer, { marginBottom: 72 + bottomInset }]}>
          <Animated.View
            style={{
              // translateX first (static offset), then translateY for float and lift
              transform: [
                { translateX: mascotOffsetX },
                { translateY: floatAnim },
                { translateY: -mascotLift },
              ],
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../../assets/images/mascot.png")}
              style={{
                width: mascotWidth,
                height: mascotMaxHeight,
                resizeMode: "contain",
              }}
            />
          </Animated.View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNavWrap, { paddingBottom: bottomInset }]}>
        <View style={[styles.bottomNav]}>
          <TouchableOpacity style={styles.navItem} onPress={() => { /* Home */ }}>
            <Ionicons name="home-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => { /* Rewards */ }}>
            <Ionicons name="trophy-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>

          {/* Placeholder for center FAB space */}
          <View style={{ width: 76 }} />

          <TouchableOpacity style={styles.navItem} onPress={() => { /* Analytics */ }}>
            <Ionicons name="time-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-outline" size={22} color="#6b6b6b" />
          </TouchableOpacity>
        </View>

        {/* Floating center FAB */}
        <View style={[styles.fabContainer, { left: width / 2 - 28 }]}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => {
              // primary action
              navigation.navigate("Journal");
            }}
            activeOpacity={0.9}
          >
            <Feather name="plus" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

type ActionCircleProps = {
  label: string;
  img: any;
  onPress?: () => void;
  actionWidth?: number;
};

const ActionCircle: React.FC<ActionCircleProps> = ({ label, img, onPress, actionWidth }) => {
  const itemWidth = actionWidth ?? "30%";
  return (
    <TouchableOpacity
      style={[styles.actionItem, { width: itemWidth }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.actionCircle}>
        <Image source={img} style={styles.actionImage} resizeMode="contain" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const BG = "#FFFBF2";
const ACCENT = "#6AA84F";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 28 : 12,
    alignItems: "center",
  },

  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  leftHeader: { flexDirection: "row", alignItems: "center" },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 0,
    backgroundColor: "#E6F4E9",
  },
  greetingWrap: {
    marginLeft: 12,
  },
  dateText: {
    color: "#7E7E7E",
    fontSize: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E5F2E",
  },
  xpText: {
    fontSize: 12,
    color: "#A0A0A0",
  },

  fireBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(140,200,120,0.12)",
  },

  topActions: {
    marginTop: 14,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    alignItems: "center",
  },
  actionItem: {
    alignItems: "center",
  },
  actionCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionImage: {
    width: 52,
    height: 52,
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 13,
    color: "#5D5D5D",
    textAlign: "center",
  },

  mascotContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  bottomNavWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 8,
    alignItems: "center",
  },
  bottomNav: {
    width: "92%",
    maxWidth: 980,
    height: 64,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },
  navItem: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  fabContainer: {
    position: "absolute",
    top: -28, // half of FAB size to overlap
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },
});

export default HomeScreen;
