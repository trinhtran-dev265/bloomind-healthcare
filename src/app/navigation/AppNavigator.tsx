import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../../features/home';
import { ChatScreen, ChatHistoryScreen } from '../../features/chatbot';
import { JournalHomeScreen, JournalDetailScreen, JournalCreateScreen, JournalEditScreen } from '../../features/journal';
import { LoginScreen, EmailLoginScreen, RegisterScreen } from '../../features/auth';
import { COLORS } from '../../types/contants/colors';
import SplashScreen from '../../features/home/screens/SplashScreen';
import { MoodDiaryScreen } from '../../features/mood/screens/MoodDiaryScreen';
import { ThankYouScreen } from '../../features/mood/screens/ThankYouScreen';
import { PleasantActivitiesScreen } from '../../features/mood/screens/PleasantActivitiesScreen';
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
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#ffffff',
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
        name="MoodDiary"
        component={MoodDiaryScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="ThankYou"
        component={ThankYouScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="PleasantActivities"
        component={PleasantActivitiesScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
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
        options={{ title: 'Chat History' }}
      />
      <Stack.Screen
        name="Journal"
        component={JournalHomeScreen}
        options={{ title: 'Journal Hone' }}
      />
      <Stack.Screen
        name="JournalDetail"
        component={JournalDetailScreen}
        options={{ title: 'Journal Detail' }}
      />
      <Stack.Screen
        name="JournalCreate"
        component={JournalCreateScreen}
        options={{ title: 'Journal Create' }}
      />
      <Stack.Screen
        name="JournalEdit"
        component={JournalEditScreen}
        options={{ title: 'Journal Edit' }}
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