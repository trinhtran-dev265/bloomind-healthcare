import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../../services/firebase/firebaseConfig";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/chatbot";
import { SafeAreaView } from "react-native-safe-area-context";

interface Conversation {
  id: string;
  lastMessage: string;
  updatedAt: string;
}
type NavProp = NativeStackNavigationProp<RootStackParamList, "ChatHistory">;
const ChatHistoryScreen = () => {
  const navigation = useNavigation<NavProp>();
  const uid = auth.currentUser?.uid;
  const [data, setData] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!uid) return;

    const load = async () => {
      const q = query(
        collection(firestore, "users", uid, "conversations"),
        orderBy("updatedAt", "desc")
      );

      const snap = await getDocs(q);

      const list = snap.docs.map((doc) => ({
        id: doc.id,
        lastMessage: doc.data().lastMessage,
        updatedAt: doc.data().updatedAt?.toDate().toLocaleString(),
      }));

      setData(list);
    };

    load();
  }, [uid]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate(
                "Chatbot",
                { conversationId: item.id } as never
              )
            }
          >
            <Image
              source={require("../assets/chatbotAvatar.png")}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                Bloomie
              </Text>
              <Text numberOfLines={1} style={styles.lastMsg}>
                {item.lastMessage}
              </Text>
              <Text style={styles.time}>{item.updatedAt}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#C6C6C8"
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ChatHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffbf2" },
  item: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
  },
  avatar: { width: 42, height: 42, borderRadius: 50, marginRight: 14 },
  title: { fontSize: 15, fontWeight: "500" },
  lastMsg: { fontSize: 14, color: "#5C5C5E", marginTop: 2 },
  time: { fontSize: 12, color: "#9A9AA0", marginTop: 3 },
});
