// components/JournalToolbar.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  Text,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

const JournalToolbar = ({
  onInsertImage,
  onInsertAudio,
  onFormat,
  onBullet,
  onAddIcon,
}: any) => {
  const [recording, setRecording] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);

  // -------------------------------
  // IMAGE PICKER
  // -------------------------------
  const handleImage = async () => {
    Alert.alert("Thêm ảnh", "Bạn muốn chọn hay chụp ảnh?", [
      {
        text: "Chọn ảnh",
        onPress: async () => {
          let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
          });
          if (!result.canceled) onInsertImage(result.assets[0].uri);
        },
      },
      {
        text: "Chụp ảnh",
        onPress: async () => {
          let result: any = await ImagePicker.launchCameraAsync({
            quality: 0.8,
          });
          if (!result.canceled) onInsertImage(result.assets[0].uri);
        },
      },
      { text: "Hủy", style: "cancel" },
    ]);
  };

  // -------------------------------
  // RECORD AUDIO
  // -------------------------------
  const handleRecord = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      onInsertAudio(uri);
      Alert.alert("Đã lưu ghi âm!");
      return;
    }

    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Cần quyền microphone");
        return;
      }

      const newRec = new Audio.Recording();
      await newRec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRec.startAsync();

      setRecording(newRec);
    } catch (e) {
      console.log(e);
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <>
      {/* ---------- TEXT EDITOR PANEL ---------- */}
      {showEditor && (
        <View style={styles.editorPanel}>
          <Text style={styles.editorTitle}>Chỉnh sửa chữ</Text>

          {/* COLORS */}
          <View style={styles.row}>
            {["#000", "#E74C3C", "#F1C40F", "#2ECC71", "#9B59B6", "#E67E22"].map(
              (c, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => onFormat("color", c)}
                  style={[styles.colorDot, { backgroundColor: c }]}
                />
              )
            )}
          </View>

          {/* FONT FAMILY */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("font", "sans")}
            >
              <Text>Sans</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("font", "serif")}
            >
              <Text>Serif</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("font", "mono")}
            >
              <Text>Mono</Text>
            </TouchableOpacity>
          </View>

          {/* FONT SIZE */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("size", "small")}
            >
              <Text>Nhỏ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("size", "normal")}
            >
              <Text>Thường</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("size", "large")}
            >
              <Text>Lớn</Text>
            </TouchableOpacity>
          </View>

          {/* STYLE */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("style", "bold")}
            >
              <Text>Đậm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("style", "italic")}
            >
              <Text>Nghiêng</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onFormat("style", "underline")}
            >
              <Text>Gạch chân</Text>
            </TouchableOpacity>
          </View>

          {/* ADD EMOJI / ICON */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onAddIcon("❤️")}
            >
              <Text>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onAddIcon("⭐")}
            >
              <Text>⭐</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editorBtn}
              onPress={() => onAddIcon("🌿")}
            >
              <Text>🌿</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setShowEditor(false)}>
            <Text style={{ color: "red", marginTop: 10 }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ---------- MAIN TOOLBAR ---------- */}
      <View style={styles.toolbarContainer}>
        <View style={styles.toolbarContent}>
          {/* IMAGE */}
          <TouchableOpacity onPress={handleImage} style={styles.iconButton}>
            <Ionicons name="image-outline" size={26} color="#333" />
          </TouchableOpacity>

          {/* AUDIO */}
          <TouchableOpacity onPress={handleRecord} style={styles.iconButton}>
            <MaterialCommunityIcons
              name={recording ? "microphone" : "microphone-outline"}
              size={28}
              color={recording ? "#E74C3C" : "#333"}
            />
          </TouchableOpacity>

          {/* TEXT EDITOR */}
          <TouchableOpacity
            onPress={() => setShowEditor(!showEditor)}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons name="format-text-variant" size={28} color="#333" />
          </TouchableOpacity>


          {/* BULLET LIST */}
          <TouchableOpacity onPress={() => onBullet()} style={styles.iconButton}>
            <MaterialCommunityIcons name="format-list-bulleted" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default JournalToolbar;

const styles = StyleSheet.create({
  toolbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  toolbarContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconButton: { padding: 8 },

  /* EDITOR PANEL */
  editorPanel: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    backgroundColor: "#fff",
    padding: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  editorTitle: { fontWeight: "600", fontSize: 16, marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  colorDot: {
    width: 26,
    height: 26,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  editorBtn: {
    padding: 8,
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
  },
});
