import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const JournalCard = ({ day, month, title, content, image }: any) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("JournalDetail")}
    >
      {/* Date row */}
      <View style={styles.dateRow}>
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.monthText}>{month}</Text>
        <Ionicons name="leaf-outline" size={18} color="#6E6E6E" />
      </View>

      {/* Title + content */}
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardContent}>{content}</Text>

      {/* Thumbnail */}
      {image && (
        <Image source={image} style={styles.thumb} />
      )}
    </TouchableOpacity>
  );
};

export default JournalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 18,
    padding: 18,
    borderRadius: 20,
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
    width: "100%",
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 10,
  },
});
