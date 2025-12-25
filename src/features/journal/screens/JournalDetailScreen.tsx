import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  getJournalById,
  deleteJournalById,
} from "../services/journal.service";
import { SafeAreaView } from "react-native-safe-area-context";

const JournalDetailScreen = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const { journalId } = route.params;

  const [journal, setJournal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD JOURNAL ================= */
  useFocusEffect(
    useCallback(() => {
      loadJournal();
    }, [journalId])
  );

  const loadJournal = async () => {
    try {
      setLoading(true);
      const data = await getJournalById(journalId);
      setJournal(data);
    } catch (e) {
      console.log("Load journal error", e);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
  // 🌐 WEB
  if (Platform.OS === "web") {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa nhật ký này?");
    if (!confirmed) return;

    await deleteJournalById(journalId);
    navigation.goBack();
    return;
  }

  // 📱 MOBILE
  Alert.alert(
    "Xóa nhật ký",
    "Bạn có chắc chắn muốn xóa nhật ký này?",
    [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await deleteJournalById(journalId);
          navigation.goBack();
        },
      },
    ]
  );
};


  /* ================= HEADER ================= */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fffbf2" },

      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JournalEdit", { journalId })
            }
            style={{ marginRight: 16 }}
          >
            <Ionicons name="pencil-outline" size={22} color="#1C1C1E" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={22} color="#1C1C1E" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  if (loading || !journal) return null;

  const textBlocks = journal.blocks.filter(
    (b: any) => b.type === "text"
  );

  const title = textBlocks[0]?.text ?? "";
  const contentBlocks = textBlocks.slice(1);

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
      {/* DATE */}
      <Text style={styles.date}>
        {journal.day} / {journal.month} / {journal.year}
      </Text>

      {/* TITLE */}
      <Text style={styles.title}>{title}</Text>

      {/* CONTENT */}
      {contentBlocks.map((block: any, index: number) => (
        <Text key={index} style={styles.bodyText}>
          {block.text}
        </Text>
      ))}

      {/* IMAGE MOCK */}
      <Image
        source={require("../assets/image.png")}
        style={styles.image}
      />

      {/* AUDIO MOCK */}
      <View style={styles.audioBox}>
        <Ionicons name="play-circle-outline" size={32} color="#1C1C1E" />
        <View style={styles.audioBar} />
        <Text>00:21</Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default JournalDetailScreen;


/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffbf2",
  },

  container: {
    flex: 1,
    backgroundColor: "#fffbf2",
    padding: 20
  },

  date: {
    fontSize: 16,
    color: "#7a7a7a",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1C1C1E",
  },

  bodyText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },

  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },

  audioBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  audioBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
