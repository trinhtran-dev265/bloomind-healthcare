import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { formatTime, getTitleAndPreview, MONTHS } from "../services/journal.helpers";
import { getJournalsByYear } from "../services/journal.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const JournalHomeScreen = () => {
  const navigation: any = useNavigation();

  const [year, setYear] = useState(2025);
  const [journals, setJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userReady, setUserReady] = useState(false);


  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserReady(true);
      }
    });

    return unsub;
  }, []);

  useFocusEffect(
  useCallback(() => {
    if (!userReady) return;

    loadJournals();
  }, [year, userReady])
);


  const loadJournals = async () => {
    try {
      setLoading(true);
      console.log("Loading journals for year:", year);

      const data = await getJournalsByYear(year);
      console.log("JOURNALS:", data);

      setJournals(data);
    } catch (e) {
      console.log("Load journals error", e);
    } finally {
      setLoading(false);
    }
  };


  return (
        <View style={styles.container}>
      {/* Header */}

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Banner Image */}
        <Image
          source={require("../assets/banner.png")}
          style={styles.banner}
        />

        {/* Năm + Prev/Next */}
        <View style={styles.yearRow}>
          <TouchableOpacity onPress={() => setYear(year - 1)}>
            <Ionicons name="chevron-back" size={24} color="#555" />
          </TouchableOpacity>

          <Text style={styles.yearText}>{year}</Text>

          <TouchableOpacity onPress={() => setYear(year + 1)}>
            <Ionicons name="chevron-forward" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {journals.map((j) => {
          const { title, preview } = getTitleAndPreview(j.blocks);

          return renderJournalCard(
            navigation,
            j.id,
            j.date,
            j.day,
            MONTHS[j.month - 1],
            title,
            preview
          );
        })}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("JournalCreate")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default JournalHomeScreen;


// -------------------------------
// Journal Card Component
// -------------------------------
const renderJournalCard = (
  navigation: any,
  journalId: string,
  date: any,
  day: number,
  month: string,
  title: string,
  content: string
) =>
  <TouchableOpacity
    key={journalId}
    style={styles.card}
    onPress={() =>
      navigation.navigate("JournalDetail", { journalId })
    }
  >
    <View style={styles.dateRow}>
      <Text style={styles.monthText}>
        {formatTime(date)}
      </Text>
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.monthText}>{month}</Text>

      {/* voice icon – giữ nguyên mock */}
      <MaterialCommunityIcons
        name="microphone-outline"
        size={18}
        color="#6E6E6E"
      />
    </View>

    {/* TITLE */}
    <Text style={styles.cardTitle} numberOfLines={1}>
      {title}
    </Text>

    {/* CONTENT */}
    <Text style={styles.cardContent} numberOfLines={2}>
      {content}
    </Text>

    {/* THUMBNAIL – luôn hiển thị */}
    <Image
      source={require("../assets/image.png")}
      style={styles.thumb}
    />
  </TouchableOpacity>;



// -------------------------------
// Styles
// -------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffbf2",
  },

  container: { flex: 1, backgroundColor: "#fffbf2" },

  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "#FAF8F0",
  },

  headerTitle: { fontSize: 18, fontWeight: "600", color: "#373737" },

  banner: {
    width: Platform.OS === "web" ? "70%" : "100%",
    height: Platform.OS === "web" ? 280 : 180,
    resizeMode: "cover",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: Platform.OS === "web" ? 16 : 0,
  },

  yearRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    gap: 20,
  },

  yearText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 18,
    padding: 16,
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    elevation: 3,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 2,
  },

  dayText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E2E2E",
  },

  monthText: {
    fontSize: 13,
    marginLeft: 2,
    color: "#6E6E6E",
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    color: "#3A3A3A",
  },

  cardContent: {
    fontSize: 13,
    color: "#6A6A6A",
    marginTop: 4,
    lineHeight: 20,
  },

  thumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 10,
  },

  fab: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    backgroundColor: "#A7C97E",
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
