import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

export const JournalDetailScreen = () => {
  const navigation = useNavigation();
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('JournalEdit')}>
            <Ionicons name="pencil-outline" size={22} />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Ionicons name="trash-outline" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.date}>15 Nov 2025</Text>
      <Text style={styles.title}>The first day of the trip</Text>
      <Text style={styles.bodyText}>
        Today we visited many unique places and many interesting things...
      </Text>

      <Image
        source={require("../assets/image.png")}
        style={styles.image}
      />

      <View style={styles.audioBox}>
        <Ionicons name="play-circle-outline" size={32} />
        <View style={styles.audioBar} />
        <Text>00:21</Text>
      </View>
    </View>
  );
};
export default JournalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbf2',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 16,
    color: '#7a7a7a',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  audioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  audioBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
