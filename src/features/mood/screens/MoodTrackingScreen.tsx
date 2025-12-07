// screens/MoodTrackingScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import MoodOption from "../components/MoodOption";
import { moodData, MoodItem } from "../utils/moodData";
import { useNavigation } from "@react-navigation/native";

const MoodTrackingScreen = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const navigation = useNavigation();
  const currentMood: MoodItem | undefined = moodData.find((m) => m.id === selectedMood);

  return (
    <View style={styles.container}>
      {/* Selected Mood Display */}
      <View style={styles.selectedMoodContainer}>
        {currentMood ? (
          <>
            <Image
              source={currentMood.icon}
              style={[styles.selectedIcon]}
            />
            <Text style={styles.selectedLabel}>{currentMood.label}</Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>Chọn tâm trạng của bạn</Text>
        )}
      </View>

      {/* Arrow */}
      <Text style={styles.arrow}>▼</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Hôm nay bạn cảm thấy thế nào?</Text>

      {/* Mood Options Grid */}
      <View style={styles.moodContainer}>
        {moodData.map((mood) => (
          <MoodOption
            key={mood.id}
            label={mood.label}
            icon={mood.icon}
            selected={selectedMood === mood.id}
            onPress={() => setSelectedMood(mood.id)}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedMood &&  { opacity: 0.4 }]}
        disabled={!selectedMood}
        onPress={() => navigation.navigate("Activities") as any}
      >
        <Text style={[styles.nextText,selectedMood && { color: "#FFF" }]}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoodTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    alignItems: "center",
  },
  selectedMoodContainer: {
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIcon: {
    width: 160,
    height:110,
    borderRadius: 50,
  },
  selectedLabel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#AAA",
  },
  arrow: {
    fontSize: 18,
    marginTop: 10,
  },
  subtitle: {
    marginTop: 30,
    fontSize: 16,
    color: "#333",
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    width: "85%",
  },
  nextButton: {
    position: "absolute",
    bottom: 50,
    width: "70%",
    paddingVertical: 14,
    backgroundColor: "#454545",
    borderRadius: 30,
    alignItems: "center",
  },
  nextText: {
    fontSize: 17,
    color: "#444",
    fontWeight: "600",
  },
});
