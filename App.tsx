import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import { useEffect } from 'react';
import { auth, firestore } from './src/services/firebase/firebaseConfig';
import { Alert } from 'react-native';
import Constants from 'expo-constants';


export default function App() {
  return (
    useEffect(() => {
    // Test firebase config khi app khởi động
    const testConfig = async () => {
      try {
        console.log("🟢 App started - testing config...");
        console.log("Expo Constants:", Constants.expoConfig);
        
        if (Constants.expoConfig?.extra?.firebaseApiKey) {
          Alert.alert(
            "✅ Firebase Config", 
            "API Key found: " + Constants.expoConfig.extra.firebaseApiKey.substring(0, 10) + "..."
          );
        } else {
          Alert.alert(
            "❌ Firebase Config", 
            "API Key NOT found in app.json"
          );
        }
      } catch (error) {
        Alert.alert("🔥 Error", "Config test failed: " );
      }
    };

    testConfig();
  }, []),

    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}