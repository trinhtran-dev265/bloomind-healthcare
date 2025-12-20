import React, { useState, useLayoutEffect } from "react";
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

  const handleSave = () => {
    // TODO: save journal to firestore
    navigation.goBack();
  };

  /* ================= HEADER ================= */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fffbf2" },

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 4 }}
        >
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveButton}
        >
          <Text style={styles.saveText}>Lưu</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content, selectedDate]);

  /* ================= DATE ================= */
  const day = selectedDate.getDate();
  const monthYear = selectedDate.toLocaleString("vi-VN", {
    month: "short",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* BODY */}
        <View style={styles.body}>
          {/* DATE ROW */}
          <TouchableOpacity
            style={styles.dateRow}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.dateNumber}>{day}</Text>
            <Text style={styles.dateText}>{monthYear}</Text>
            <Feather
              name="chevron-down"
              size={18}
              color="#4A4A4A"
              style={styles.dateIcon}
            />
          </TouchableOpacity>

          {/* TITLE */}
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#8E8E93"
          />

          {/* CONTENT */}
          <TextInput
            style={styles.contentInput}
            placeholder="Write ...."
            value={content}
            onChangeText={setContent}
            placeholderTextColor="#8E8E93"
            multiline
          />
        </View>

        {/* TOOLBAR */}
        <JournalToolbar />

        {/* DATE PICKER */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={selectedDate}
          onConfirm={(date) => {
            setSelectedDate(date);
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalCreateScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffbf2",
  },
  container: {
    flex: 1,
    backgroundColor: "#fffbf2",
  },

  headerSaveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  saveButton: {
    backgroundColor: "#C3E8A9",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveText: { fontSize: 16, fontWeight: "600", color: "#1C1C1E" },
  /* DATE */
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dateNumber: {
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 6,
    color: "#4A4A4A",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#4A4A4A",
    marginRight: 6,
  },
  dateIcon: {
    marginLeft: 2,
  },

  /* TITLE */
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
    padding: 0,
  },

  /* CONTENT */
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
    padding: 0,
    lineHeight: 28,
    textAlignVertical: "top",
  },
});
