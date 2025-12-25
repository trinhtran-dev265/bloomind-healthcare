import React, { useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import JournalToolbar from "../components/JournalToolbar";
import { useBlurOnLeave } from "../hooks/useBlurOnLeave";
import {
  getJournalById,
  saveJournal,
} from "../services/journal.service";
import { JournalBlock, TextBlock } from "../types/journal";

export const JournalEditScreen = () => {
  useBlurOnLeave();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { journalId } = route.params;

  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  /* ================= LOAD JOURNAL ================= */
  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = async () => {
    try {
      const journal = await getJournalById(journalId);
      if (!journal) return;

      setDate(journal.date.toDate ? journal.date.toDate() : journal.date);

      const textBlocks = journal.blocks.filter(
        (b: any) => b.type === "text"
      );

      // title = block đầu tiên
      setTitle(textBlocks[0]?.text || "");

      // content = các block còn lại
      setContent(
        textBlocks
          .slice(1)
          .map((b: any) => b.text)
          .join("\n\n")
      );
    } catch (e) {
      console.log("Load journal error", e);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (Platform.OS === "web") {
      (document.activeElement as HTMLElement)?.blur();
    }
    Keyboard.dismiss();

    const blocks: JournalBlock[] = [
      {
        id: "title",
        type: "text" as const,
        text: title,
      } as TextBlock,
      {
        id: "content",
        type: "text" as const,
        text: content,
      } as TextBlock,
    ];

    await saveJournal({
      journalId,
      date,
      blocks,
    });

    navigation.goBack();
  };

  if (loading) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>
          {date.toDateString()}
        </Text>

        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Tiêu đề"
        />

        <TextInput
          style={styles.textInput}
          multiline
          value={content}
          onChangeText={setContent}
          placeholder="Viết gì đó cho hôm nay…"
        />
      </ScrollView>

      {/* Toolbar */}
      <JournalToolbar />
    </View>
    </SafeAreaView>
  );
};

export default JournalEditScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffbf2",
  },

  container: {
    flex: 1,
    backgroundColor: "#fffbf2",
    paddingHorizontal: 20,
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
    fontSize: 20,
    fontWeight: "600",
    // marginBottom: 15,
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
