// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,TouchableOpacity
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { Button } from '../../../components/ui/Buttons/index';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const handleTestButton = () => {
    Alert.alert(
      '🎉 Success!',
      'Navigation is working perfectly!',
      [{ text: 'Awesome! 👏' }]
    );
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };
  const handleNavigateToChatbot = () => {
    navigation.navigate('Chatbot');
  };

  const handleNavigateToMoodTracking = () => {
    navigation.navigate('MoodTracking');
  };

  const handleNavigateToAnalysis = () => {
    navigation.navigate('Analysis');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌸 Bloomind Health Care</Text>
        <Text style={styles.subtitle}>
          Your Mental Wellness Companion
        </Text>
      </View>

      <View style={styles.content}>
        {/* Test Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Navigation</Text>
          <Button
            title="🎯 Test Button - Tap Me!"
            onPress={handleTestButton}
            variant="primary"
            style={styles.testButton}
          />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Screens</Text>
          <Button
            title="🔐 Login Screen"
            onPress={handleNavigateToLogin}
            variant="secondary"
            style={styles.navButton}
          />
          <Button
            title="📝 Register Screen"
            onPress={handleNavigateToRegister}
            variant="secondary"
            style={styles.navButton}
          />
        </View>

        {/* Feature Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming Soon Features</Text>
          <View style={styles.featureGrid}>
            <TouchableOpacity style={styles.featureCard} onPress={handleNavigateToMoodTracking}>
              <Text style={styles.featureIcon}>😊</Text>
              <Text style={styles.featureText}>Mood Tracking</Text>
            </TouchableOpacity>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>📖</Text>
              <Text style={styles.featureText}>Journal</Text>
            </View>
            <TouchableOpacity style={styles.featureCard} onPress={handleNavigateToChatbot}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureText}>Chatbot</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} onPress={handleNavigateToAnalysis}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Analytics</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  testButton: {
    marginBottom: 10,
  },
  navButton: {
    marginBottom: 10,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
});