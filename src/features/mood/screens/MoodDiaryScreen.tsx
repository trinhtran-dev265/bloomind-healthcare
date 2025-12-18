import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const MoodDiaryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Mood Diary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 20,
  },
  closeText: {
    fontSize: 28,
    color: "#333",
  },
  title: {
    marginTop: 80,
    fontSize: 26,
    fontWeight: "700",
  },
});
