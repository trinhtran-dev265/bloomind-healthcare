// screens/MoodTrackingSavedScreen.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import RoundedButton from "../components/RoundedButton";
import { COLORS } from "../utils/theme";
import { Images } from "../utils/images";
import { useNavigation } from "@react-navigation/native";

const MoodTrackingSavedScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Avatar */}
      <Image
        source={Images.avatars.done}
        style={styles.avatar}
      />

      {/* Bot Name */}
      <Text style={styles.name}>Bloomie</Text>

      {/* Message */}
      <Text style={styles.message}>
        I’m really sorry to hear that you had such a disheartening experience.
        Feeling ignored and invisible, especially among people you considered
        friends, must have been truly painful. You deserve friends who care about
        your opinions, value your presence, and make you feel included. You are
        worthy of being seen, heard, and loved.
      </Text>

      {/* Chat Button */}
      <RoundedButton
        title="Trò chuyện với Bloomie"
        color={COLORS.primary}
        onPress={() => navigation.navigate("Chatbot" as never)}
      />

      {/* Home Button */}
      <RoundedButton
        title="Home"
        color={COLORS.secondary}
        onPress={() => navigation.navigate("Home" as never)}
      />

      {/* Saved Status */}
      <View style={styles.savedBox}>
        <Text style={styles.savedText}>Tâm trạng hôm nay đã được lưu</Text>
      </View>
    </View>
  );
};

export default MoodTrackingSavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#FFFFFF",
  },

  avatar: {
    width: 130,
    height: 120,
    marginBottom: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },

  message: {
    textAlign: "center",
    color: "#555",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },

  savedBox: {
    position: "absolute",
    bottom: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: COLORS.pink,
    borderRadius: 25,
  },

  savedText: {
    color: "#333",
    fontWeight: "600",
  },
});
