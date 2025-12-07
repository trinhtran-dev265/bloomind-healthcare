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

// Import MOODS từ utils
import { MOODS } from '../utils/moodUtils';

type NavigationProp = NativeStackNavigationProp<any>;

const screenWidth = Dimensions.get('window').width;

const MoodCheckScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMoodId, setSelectedMoodId] = useState('normal');
  const currentMood = MOODS.find(m => m.id === selectedMoodId) || MOODS[0];

  const onSaveMood = () => {
    navigation.navigate('NextScreen');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentMood.bgColorLight }]}>
      <View style={styles.content}>
        <View style={[styles.moodContainer, { backgroundColor: currentMood.bgColor, shadowColor: currentMood.dotColor }]}>
          <Text style={[styles.highlightText, { color: currentMood.textColor }]} numberOfLines={2}>
            Hôm nay bạn{'\n'}cảm thấy thế nào?
          </Text>

          {/* Mood Label */}
          <Text style={[styles.moodLabel, { color: currentMood.textColor }]}>
            {currentMood.label}
          </Text>

          {/* Mood Image */}
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
                    transform: [{ scale: 1.8 }],
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
          style={[styles.selectButton,]}
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
  moodContainer: {
    width: screenWidth - 48,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: -20,
    borderRadius: 20,
  },
  highlightText: {
    fontWeight: '900',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,  
    marginTop: 10,
  },
  moodLabel: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  moodImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: 60,
    justifyContent: 'center',
    marginTop: 40,
  },
  moodDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  selectButton: {
    width: screenWidth - 96,
    height: 50,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555555',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MoodCheckScreen;
