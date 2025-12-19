import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
const isWeb = Platform.OS === 'web';

const JournalHomeScreen = () => {
  const navigation: any = useNavigation();

  const [year, setYear] = useState(2025);

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

        {/* LIST ITEMS */}
        {renderJournalCard(
          navigation,
          "15",
          "November",
          "The first day of the trip",
          "Today we visited many unique places and many interesting things..."
        )}

        {renderJournalCard(
          navigation,
          "11",
          "November",
          "Chill day",
          "Relaxing with friends and discovering new foods..."
        )}

        {renderJournalCard(
          navigation,
          "5",
          "November",
          "Today we visited many unique places and many interesting things...",
          ""
        )}

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
  day: any,
  month: any,
  title: any,
  content: any
) =>
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("JournalDetail")}
  >
    <View style={styles.dateRow}>
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.monthText}>{month}</Text>

      {/* đổi icon leaf → microphone */}
      <MaterialCommunityIcons
        name="microphone-outline"
        size={18}
        color="#6E6E6E"
      />
    </View>

    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardContent}>{content}</Text>

    <Image
      source={require("../assets/image.png")}
      style={styles.thumb}
    />
  </TouchableOpacity>;


// -------------------------------
// Styles
// -------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F0" },

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
    width: isWeb ? '50%' : '100%',
    height: 240,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 16,
  },

  yearRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },

  yearText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 18,
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },

  dayText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E2E2E",
  },

  monthText: {
    fontSize: 13,
    marginLeft: 4,
    color: "#6E6E6E",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    color: "#3A3A3A",
  },

  cardContent: {
    fontSize: 14,
    color: "#6A6A6A",
    marginVertical: 10,
    lineHeight: 20,
  },

  thumb: {
    width: 100,
    height: 100,
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
