import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { HomeScreen } from '../../features/home';
import { LoginScreen, RegisterScreen } from '../../features/auth';
import { ChatScreen, ChatHistoryScreen } from '../../features/chatbot';
import { JournalHomeScreen, JournalDetailScreen, JournalCreateScreen, JournalEditScreen } from '../../features/journal';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#ffffff',
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
    </Stack.Navigator>
  );
};