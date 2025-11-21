import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import normalImg from '../assets/normal.png';
import happyImg from '../assets/happy.png';
import calmImg from '../assets/calm.png';
import sadImg from '../assets/sad.png';
import anxiousImg from '../assets/anxious.png';

type NavigationProp = NativeStackNavigationProp<any>;

const MOODS = [
  {
    id: 'normal',
    label: 'Bình thường',
    bgColor: '#FFF4C1',
    textColor: '#7C691D',
    dotColor: '#FFD43B',
    image: normalImg,
  },
  {
    id: 'happy',
    label: 'Vui vẻ',
    bgColor: '#FFE1E4',
    textColor: '#7C1D38',
    dotColor: '#F28D9E',
    image: happyImg,
  },
  {
    id: 'calm',
    label: 'Bình yên',
    bgColor: '#EBF8D7',
    textColor: '#48660E',
    dotColor: '#C4E096',
    image: calmImg,
  },
  {
    id: 'sad',
    label: 'Buồn',
    bgColor: '#D1F1FF',
    textColor: '#42606A',
    dotColor: '#7ED0FF',
    image: sadImg,
  },
  {
    id: 'anxious',
    label: 'Lo lắng',
    bgColor: '#E5D9FD',
    textColor: '#4B367D',
    dotColor: '#B59EFF',
    image: anxiousImg,
  },
];

const screenWidth = Dimensions.get('window').width;

const MoodCheckScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMoodId, setSelectedMoodId] = useState('normal');
  const currentMood = MOODS.find(m => m.id === selectedMoodId) || MOODS[0];

  const onSaveMood = () => {
    // TODO: Save the mood here (e.g., API or state management)
    // Then navigate to your target screen, example:
    navigation.navigate('NextScreen'); 
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentMood.bgColor }]}>
      <View style={styles.content}>
        {/* Question */}
        <Text style={[styles.questionText, { color: '#333' }]}>
          Hôm nay bạn{' '}
          <Text style={[styles.highlightText, { color: currentMood.textColor }]}>
            cảm thấy thế nào?
          </Text>
        </Text>

        {/* Mood Label */}
        <Text style={[styles.moodLabel, { color: currentMood.textColor }]}>
          {currentMood.label}
        </Text>

        {/* Mood Circle */}
        <View style={[styles.moodCircle, { backgroundColor: currentMood.bgColor, shadowColor: currentMood.dotColor }]}>
          <Image source={currentMood.image} style={styles.moodImage} resizeMode="contain" />
        </View>

        {/* Mood Dots row */}
        <View style={styles.dotsRow}>
          {MOODS.map(mood => {
            const isSelected = mood.id === selectedMoodId;
            return (
              <TouchableOpacity
                key={mood.id}
                onPress={() => setSelectedMoodId(mood.id)}
                activeOpacity={0.7}
                style={[
                  styles.moodDot,
                  { backgroundColor: mood.dotColor },
                  isSelected && {
                    transform: [{ scale: 1.4 }],
                    shadowColor: mood.dotColor,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Select button */}
        <TouchableOpacity 
          style={[styles.selectButton, { backgroundColor: currentMood.textColor }]}
          onPress={onSaveMood}
          activeOpacity={0.8}
        >
          <Text style={styles.selectButtonText}>Chọn cảm xúc</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  highlightText: {
    fontWeight: '700',
  },
  moodLabel: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 30,
  },
  moodCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    // 3D shadow and layering for circle look
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  moodImage: {
    width: 100,
    height: 100,
  },
  dotsRow: {
    flexDirection: 'row',
    marginVertical: 40,
    justifyContent: 'center',
  },
  moodDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  selectButton: {
    width: screenWidth - 48,
    height: 44,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MoodCheckScreen;
