import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatScreen: React.FC = () => {
  const navigation = useNavigation();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `I'm really sorry to hear that you had such a disheartening experience. Feeling ignored and invisible, especially among people you considered friends, must have been truly painful. You deserve friends who care about your opinions, value your presence, and make you feel included. You are worthy of being seen, heard, and loved.`,
      sender: 'bot',
    },
    {
      id: '2',
      text: "I'm lonely and it's painful.",
      sender: 'user',
    },
    {
      id: '3',
      text: "Dear, that must be a difficult and lonely place to be in. Are there specific situations or circumstances that amplify those feelings of loneliness?",
      sender: 'bot',
    },
    {
      id: '4',
      text: "I have no one to chat with",
      sender: 'user',
    },
  ]);

  const [showTypingIndicator, setShowTypingIndicator] = useState(false);

  const sendMessage = (text: string) => {
    const newMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages((prev) => [...prev, newMsg]);

    setShowTypingIndicator(true);

    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Loneliness can indeed make us feel...',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botReply]);
      setShowTypingIndicator(false);
    }, 1500);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <ChatBubble message={item.text} sender={item.sender} />
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#1C1C1E" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chat with Meowi</Text>

        <TouchableOpacity onPress={() => navigation.navigate('ChatHistory')}>
          <Ionicons name="time-outline" size={25} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      {/* Chat list */}
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
      />

      {/* Typing indicator */}
      {showTypingIndicator && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>Meowi is typing...</Text>
        </View>
      )}

      {/* Input */}
      <MessageInput onSend={sendMessage} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E5E5EA',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 17,
    color: '#1C1C1E',
  },
  typingIndicator: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  typingText: {
    color: '#A0A0A5',
    fontStyle: 'italic',
  },
});

export default ChatScreen;
