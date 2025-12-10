import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../../features/home';
import { LoginScreen, RegisterScreen } from '../../features/auth';
import { ChatScreen, ChatHistoryScreen} from '../../features/chatbot';
import { MoodTrackingScreen, ActivitiesScreen, MoodTrackingSavedScreen } from '../../features/mood/index';
import { AnalysisScreen, MoodHistoryScreen } from '../../features/analysis/index';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
          
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#f8fafc',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Bloomind Health',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Create Account' }}
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