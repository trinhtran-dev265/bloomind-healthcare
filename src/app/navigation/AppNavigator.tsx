import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../../features/home';
import { LoginScreen, EmailLoginScreen, RegisterScreen } from '../../features/auth';
import { COLORS } from '../../types/contants/colors';
import SplashScreen from '../../features/home/screens/SplashScreen';
import { ChatScreen, ChatHistoryScreen } from '../../features/chatbot';
import { MoodTrackingScreen, ActivitiesScreen, MoodTrackingSavedScreen } from '../../features/mood/index';
import { AnalysisScreen, MoodHistoryScreen } from '../../features/analysis/index';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#535353ff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="EmailLogin"
        component={EmailLoginScreen}
        options={{ title: 'Email Login' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Email Register' }}
      />

      <Stack.Screen
        name="Chatbot"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatHistory"
        component={ChatHistoryScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MoodTracking"
        component={MoodTrackingScreen}
        options={{ title: 'Mood tracking' }}
      />
      <Stack.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{ title: 'Activities' }}
      />
      <Stack.Screen
        name="MoodTrackingSaved"
        component={MoodTrackingSavedScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ title: 'Analysis' }}
      />
      <Stack.Screen
        name="MoodHistory"
        component={MoodHistoryScreen}
        options={{ title: 'Mood History' }}
      />

    </Stack.Navigator>
  );
};