import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
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
import { Images } from "../../../assets/images";

interface Msg {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const DEFAULT_WELCOME =
  "Chào bạn, mình luôn sẵn sàng ở đây để lắng nghe bạn. Nói đi, đừng ngại nhé.";

const ChatScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);

  const uid = auth.currentUser?.uid;
  type ChatRouteProp = RouteProp<RootStackParamList, "Chatbot">;

  const route = useRoute<ChatRouteProp>();

  const initialConversationId =
    route.params?.conversationId ?? null;

  const userContext = route.params?.userContext;
  console.log("🔥 ChatScreen userContext:", userContext);

  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId
  );

    const [messages, setMessages] = useState<Msg[]>([]);
    const [typing, setTyping] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!uid || !conversationId) return;
    if (isInitialized) return;

    const loadHistory = async () => {
    const history = await getAllMessages(uid, conversationId);
      setMessages(history);
      setIsInitialized(true);
    };

    loadHistory();
  }, [uid, conversationId, isInitialized]);

  const DEFAULT_WELCOME =
  "Chào bạn, mình luôn sẵn sàng ở đây để lắng nghe bạn. Nói đi, đừng ngại nhé.";

useEffect(() => {
  if (!uid) return;
  if (conversationId) return;
  if (isInitialized) return;

  const initConversation = async () => {
    setTyping(true);

    // ❌ Chưa tracking mood
    if (!userContext) {
      setMessages([
        { id: "welcome", text: DEFAULT_WELCOME, sender: "bot" },
      ]);
      setIsInitialized(true);
      setTyping(false);
      return;
    }

    try {
      // ✅ Create conversation
      const convoId = await createConversation(
        uid,
        "Bloomie checked in after mood tracking"
      );
      setConversationId(convoId);

      // ✅ Ask AI
      const res = await sendMessageToAI(
        "Please gently check in with the user based on their emotional context.",
        [],
        userContext,
        true
      );

      // ✅ Save welcome
      await saveMessage(uid, convoId, "assistant", res.reply, "ai");

      setMessages([
        { id: "welcome", text: res.reply, sender: "bot" },
      ]);
    } catch {
      setMessages([
        { id: "welcome", text: DEFAULT_WELCOME, sender: "bot" },
      ]);
    } finally {
      setTyping(false);
      setIsInitialized(true);
    }
  };

  initConversation();
}, [uid, userContext, conversationId, isInitialized]);

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

      if (!convoId) {
        convoId = await createConversation(uid, text);
        setConversationId(convoId);
      }

      await saveMessage(uid, convoId, "user", text, "system");

      const history = await getRecentMessages(uid, convoId);

      const res = await sendMessageToAI(text, history, userContext,
  false);

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

        <View style={styles.chatBody}>
            {/* Waiting image (ONLY after tracking mood, before first message) */}
        {userContext && messages.length === 0 && typing && (
          <View style={styles.waitingContainer}>
            <Image
              source={Images.wait}
              style={styles.waitingImage}
              resizeMode="contain"
            />
            <Text style={styles.waitingText}>
              Ê.. vừa mới tracking mood đúng không, chờ xíu nha!
            </Text>
          </View>
        )}

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
        </View>

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
  waitingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 160,
  },

  chatBody: {
    flex: 1, 
  },


  waitingImage: {
    width: 260,
    height: 260,
    marginBottom: 16,
  },

  waitingText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },
});
