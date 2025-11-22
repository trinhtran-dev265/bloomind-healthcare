import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'bot';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const isUser = sender === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userBubble : styles.botBubble]}>
      <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 6,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#9AA5B1', // màu xanh tím nhạt
    borderTopRightRadius: 0,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4E6EB', // màu xám nhạt
    borderTopLeftRadius: 0,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: '#222',
  },
});

export default ChatBubble;