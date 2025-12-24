import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";
import {
  createConversation,
  saveMessage,
  getRecentMessages,
  sendMessageToAI,
  getAllMessages,
} from "../services/chat.service";
import { auth } from "../../../services/firebase/firebaseConfig";
import { RootStackParamList } from "../types/chatbot";

interface Msg {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const ChatScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);

  const uid = auth.currentUser?.uid;
  type ChatRouteProp = RouteProp<RootStackParamList, "Chatbot">;

  const route = useRoute<ChatRouteProp>();

  const initialConversationId =
    route.params?.conversationId ?? null;

  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId
  );

    const [messages, setMessages] = useState<Msg[]>([]);
    const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!uid || !conversationId) return;

    const loadHistory = async () => {
      try {
        const history = await getAllMessages(uid, conversationId);
        setMessages(history);
      } catch (err) {
        console.warn("Failed to load chat history", err);
      }
    };

    loadHistory();
  }, [uid, conversationId]);


  // Auto scroll
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, typing]);

  const onSend = async (text: string) => {
    if (!uid || !text.trim()) return;

    const userMsg: Msg = {
      id: Date.now().toString(),
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    try {
      let convoId = conversationId;

      // 1️⃣ Create conversation if needed
      if (!convoId) {
        convoId = await createConversation(uid, text);
        setConversationId(convoId);
      }

      // 2️⃣ Save user message
      await saveMessage(uid, convoId, "user", text, "system");

      // 3️⃣ Get recent history
      const history = await getRecentMessages(uid, convoId);

      // 4️⃣ Call AI
      const res = await sendMessageToAI(text, history);

      // 5️⃣ Save AI reply
      await saveMessage(
        uid,
        convoId,
        "assistant",
        res.reply,
        res.degraded ? "degraded" : "ai"
      );

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: res.reply,
          sender: "bot",
        },
      ]);
    } catch (err) {
      // ❗ System-safe fallback (not fake empathy)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text:
            "Bloomie is having technical trouble right now. This isn't your fault. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setTyping(false);
    }
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

          <TouchableOpacity
            onPress={() => navigation.navigate("ChatHistory" as never)}
          >
            <Ionicons name="time-outline" size={24} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
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
            <Text style={styles.typingText}>
              Bloomie is responding…
            </Text>
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
  container: { flex: 1, backgroundColor: "#fffbf2" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E5E5EA",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  title: { fontSize: 17, fontWeight: "600" },
  typing: { paddingLeft: 20, paddingVertical: 6 },
  typingText: { fontStyle: "italic", color: "#A0A0A5" },
});
