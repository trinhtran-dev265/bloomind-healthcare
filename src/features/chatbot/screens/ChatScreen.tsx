import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Msg {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const ChatScreen = () => {
  const navigation = useNavigation();

  const [messages, setMessages] = useState<Msg[]>([
    { id: "1", text: "I'm really sorry to hear that…", sender: "bot" },
    { id: "2", text: "I'm lonely and it's painful.", sender: "user" },
  ]);

  const [typing, setTyping] = useState(false);

  const onSend = (msg: string) => {
    const newMsg: Msg = { id: Date.now().toString(), text: msg, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);

    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Loneliness can indeed make us feel vulnerable…",
          sender: "bot",
        },
      ]);
      setTyping(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 10}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
          </TouchableOpacity>

          <Text style={styles.title}>Chat with Bloomie</Text>

          <TouchableOpacity onPress={() => navigation.navigate("ChatHistory" as never)}>
            <Ionicons name="time-outline" size={24} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble message={item.text} sender={item.sender} />
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        />

        {/* Typing indicator */}
        {typing && (
          <View style={styles.typing}>
            <Text style={styles.typingText}>Meowi is typing...</Text>
          </View>
        )}

        {/* Input */}
        <MessageInput onSend={onSend} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
  },
  title: { fontSize: 17, fontWeight: "600" },
  typing: { paddingLeft: 20, paddingVertical: 6 },
  typingText: { fontStyle: "italic", color: "#A0A0A5" },
});
