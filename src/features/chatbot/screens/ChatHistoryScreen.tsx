import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface HistoryItem {
  id: string;
  lastMessage: string;
  timestamp: string;
}

const historyData: HistoryItem[] = [
  { id: "1", lastMessage: "You deserve friends who care…", timestamp: "Today • 9:41 AM" },
  { id: "2", lastMessage: "Loneliness can indeed…", timestamp: "Yesterday • 10:12 PM" },
  { id: "3", lastMessage: "Your emotions are valid…", timestamp: "3 days ago" },
];

const ChatHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat History</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Image source={require("../assets/chatbotAvatar.png")} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Conversation #{item.id}</Text>
              <Text numberOfLines={1} style={styles.lastMsg}>
                {item.lastMessage}
              </Text>
              <Text style={styles.time}>{item.timestamp}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C6C6C8" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ChatHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f1ffff" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e9e9ffff",
  },
  headerTitle: { fontSize: 17, fontWeight: "600" },

  item: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    alignItems: "center",
  },
  avatar: { width: 42, height: 42, borderRadius: 50, marginRight: 14 },
  title: { fontSize: 15, fontWeight: "500" },
  lastMsg: { fontSize: 14, color: "#5C5C5E", marginTop: 2 },
  time: { fontSize: 12, color: "#9A9AA0", marginTop: 3 },
});
