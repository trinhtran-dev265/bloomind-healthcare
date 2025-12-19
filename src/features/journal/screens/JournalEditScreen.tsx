import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import JournalToolbar from "../components/JournalToolbar";
import { useBlurOnLeave } from "../hooks/useBlurOnLeave";

export const JournalEditScreen = () => {
  useBlurOnLeave();
  const navigation = useNavigation();

  // ----- Load nội dung từ DetailScreen -----
  const [date] = useState("15 Nov 2025");
  const [title, setTitle] = useState("The first day of the trip");
  const [content, setContent] = useState(
    "Today we visited many unique places and many interesting things...\n\n[IMAGE]: image.png\n[AUDIO]: audio-record-01.m4a"
  );

  const handleSave = () => {
  // Blur trên web
  if (Platform.OS === 'web') {
    (document.activeElement as HTMLElement)?.blur();
  } else {
    // Chỉ gọi trên mobile
    const focusedInput = TextInput.State.currentlyFocusedInput();
    if (focusedInput) {
      TextInput.State.blurTextInput(focusedInput);
    }
  }
  
  Keyboard.dismiss();
  navigation.goBack();
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>{date}</Text>

        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.textInput}
          multiline
          value={content}
          onChangeText={setContent}
        />
      </ScrollView>

      {/* Toolbar */}
      <JournalToolbar/>
    </View>
  );
};

export default JournalEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf7ef",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#C3E8A9",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveText: { fontSize: 16, fontWeight: "600", color: "#1C1C1E" },
  date: {
    fontSize: 16,
    color: "#7a7a7a",
    marginBottom: 12,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    color: "#1C1C1E",
  },
  textInput: {
    fontSize: 16,
    color: "#444",
    minHeight: 250,
    textAlignVertical: "top",
    lineHeight: 24,
    marginBottom: 40,
  },
});
