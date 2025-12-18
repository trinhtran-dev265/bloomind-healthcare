import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import JournalToolbar from "../components/JournalToolbar";
import { useBlurOnLeave } from "../hooks/useBlurOnLeave";

const JournalCreateScreen = () => {
  useBlurOnLeave();
  const navigation: any = useNavigation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  // Format lại giống UI: "15 Thg 11 2025"
  const day = selectedDate.getDate();
  const monthYear = selectedDate.toLocaleString("vi-VN", {
    month: "short",
    year: "numeric",
  });

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Date */}
          <TouchableOpacity style={styles.dateRow} onPress={showDatePicker}>
            <Text style={styles.dateNumber}>{day}</Text>

            {/* Text month-year */}
            <Text style={styles.dateText}>{monthYear}</Text>

            {/* ICON nằm sau text */}
            <Feather
              name="chevron-down"
              size={18}
              color="#4A4A4A"
              style={styles.dateIcon}
            />
          </TouchableOpacity>

          {/* Title */}
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#8E8E93"
          />

          {/* Content */}
          <TextInput
            style={styles.contentInput}
            placeholder="Write ...."
            value={content}
            onChangeText={setContent}
            placeholderTextColor="#8E8E93"
            multiline
          />
        </View>

        <JournalToolbar />

        {/* Calendar Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={selectedDate}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalCreateScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#FBFBFA" },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#C3E8A9",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveText: { fontSize: 16, fontWeight: "600", color: "#1C1C1E" },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },

  /* DATE */
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateNumber: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 6,
    color: "#4A4A4A",
  },
  dateText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#4A4A4A",
    marginRight: 6,
  },
  dateIcon: {
    marginLeft: 2,
  },

  /* TITLE */
  titleInput: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 12,
    padding: 0,
  },

  /* CONTENT */
  contentInput: {
    flex: 1,
    fontSize: 18,
    color: "#1C1C1E",
    padding: 0,
    lineHeight: 28,
    textAlignVertical: "top",
  },
});
