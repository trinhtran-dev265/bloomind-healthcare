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
    </Stack.Navigator>
  );
};