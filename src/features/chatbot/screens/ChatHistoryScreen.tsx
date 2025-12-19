import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HistoryItem {
  id: string;
  lastMessage: string;
  timestamp: string;
}

const dummyHistory: HistoryItem[] = [
  {
    id: "1",
    lastMessage: "You deserve friends who care about your presence…",
    timestamp: "Today • 9:41 AM",
  },
  {
    id: "2",
    lastMessage: "Loneliness can indeed make us feel vulnerable…",
    timestamp: "Yesterday • 10:12 PM",
  },
  {
    id: "3",
    lastMessage: "Remember that your emotions are valid…",
    timestamp: "3 days ago",
  }
];

const ChatHistoryScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image
        source={require('../assets/chatbotAvatar.png')}
        style={styles.avatar}
      />

      <View style={styles.textContainer}>
        <Text style={styles.conversationTitle}>Conversation #{item.id}</Text>
        <Text numberOfLines={1} style={styles.lastMessage}>{item.lastMessage}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#C6C6C8" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#1C1C1E" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chat History</Text>

        <View style={{ width: 25 }} /> 
      </View>

      {/* List */}
      <FlatList
        data={dummyHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={renderItem}
      />

    </SafeAreaView>
  );
};

export default ChatHistoryScreen;

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

  itemContainer: {
    backgroundColor: '#F7F7F8',
    padding: 16,
    marginBottom: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 14,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
  },
  conversationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  lastMessage: {
    fontSize: 14,
    color: '#5C5C5E',
    marginTop: 2,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#9A9AA0',
  },
});
