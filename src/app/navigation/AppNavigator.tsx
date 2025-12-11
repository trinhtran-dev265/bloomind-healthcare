import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../../features/home';
import { LoginScreen } from '../../features/auth';
import { COLORS } from '../../types/contants/colors';
import SplashScreen from '../../features/home/screens/SplashScreen';
import { MoodDiaryScreen } from '../../features/mood/screens/MoodDiaryScreen';
import { ThankYouScreen } from '../../features/mood/screens/ThankYouScreen';
import { PleasantActivitiesScreen } from '../../features/mood/screens/PleasantActivitiesScreen';
import { ChatScreen, ChatHistoryScreen} from '../../features/chatbot';
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
          backgroundColor: '#ffffff',
          
        },
        headerTintColor: '#000000',
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
        options={{ title: 'Chatbot' }}
      />
        <Stack.Screen
        name="ChatHistory"
        component={ChatHistoryScreen}
        options={{ title: 'Chat History' }}
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
        options={{ title: 'Done' }}
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