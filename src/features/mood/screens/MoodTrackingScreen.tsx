import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Import từ utils
import { MOODS, imageMoodMain } from '../utils/moodUtils';  

type NavigationProp = NativeStackNavigationProp<any>;

const deviceWidth = Dimensions.get('window').width;

const MoodTrackingScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const onSaveMood = () => {
    navigation.navigate('MoodCheck'); 
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header với title và icon filter */}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>Hôm nay bạn cảm thấy thế nào?</Text>
          <Text style={styles.subtitle}>Hôm nay sẽ là một ngày tốt lành!</Text>
        </View>

        <TouchableOpacity style={styles.filterIcon}>
          <MaterialIcons name="tune" size={28} color="#84CC16" />
        </TouchableOpacity>
      </View>

      {/* Ảnh minh họa chính */}
      <Image
        source={imageMoodMain}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Text style={styles.illustrationCaption}>Good things are about to happen</Text>

      {/* Show 5 ảnh mood với chú thích phía dưới */}
      <View style={styles.moodsRow}>
        {MOODS.map(({ image, label }, index) => (
          <View key={index} style={styles.moodContainer}>
            <Image
              source={image}
              style={styles.moodImage}
              resizeMode="contain"
            />
            <Text style={styles.moodLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Nút Ghi lại */}
      <TouchableOpacity style={styles.saveButton} onPress={onSaveMood}>
        <Text style={styles.saveButtonText}>Ghi lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FAFAF1', flex: 1 },
  contentContainer: { padding: 24, paddingBottom: 48 },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  titleContainer: { 
    flex: 1, 
    marginRight: 12  
  },
  title: { 
    fontSize: 22, 
    fontWeight: '600', 
    color: '#374151' 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginTop: 4 
  },
  filterIcon: { 
    backgroundColor: '#ffffffff', 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  illustration: { width: deviceWidth - 48, height: 180, borderRadius: 16, marginBottom: 8 },
  illustrationCaption: { color: '#A3A3A3', fontStyle: 'italic', alignSelf: 'center', marginBottom: 32 },
  moodsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  moodContainer: { alignItems: 'center', width: 54 },
  moodImage: { width: 54, height: 74, borderRadius: 24 },
  moodLabel: { marginTop: 8, fontSize: 12, color: '#374151', textAlign: 'center' },
  saveButton: { backgroundColor: '#8fb33bff', borderRadius: 24, paddingVertical: 14, justifyContent: 'center', alignItems: 'center', marginHorizontal: 16 },
  saveButtonText: { color: '#FAFAFA', fontWeight: '600', fontSize: 16 },
});

export default MoodTrackingScreen;
