// src/screens/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGoogleLogin } from '../../../services/firebase/LoginWithGoogle';


type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { request, startLogin, loading } = useGoogleLogin(
    () => {
      // onSuccess -> chuyển vào Home
      navigation.replace('Home');
    },
    (err) => {
      console.error('Google login error:', err);
      Alert.alert('Đăng nhập thất bại', err?.message ?? JSON.stringify(err));
    }
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Background */}
        <Image
          source={require('../../../../assets/images/logo.png')}
          style={styles.background}
        />

        {/* Login Buttons Container - Đã được bo góc và làm nổi bật */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.appleBtn]}
            onPress={() => {
              Alert.alert('Apple login', 'Chưa triển khai');
            }}
          >
            <Image
              style={styles.icon}
              source={require('../../../../assets/images/avatar.png')}
            />
            <Text style={styles.appleText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.googleBtn]}
            disabled={!request || loading}
            onPress={() => startLogin()}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Image
                  style={styles.icon}
                  source={require('../../../../assets/images/avatar.png')}
                />
                <Text style={styles.googleText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.emailBtn]}
            onPress={() => {
              // ví dụ điều hướng đến màn EmailLogin (nếu có)
              navigation.navigate('EmailLogin' as any);
            }}
          >
            <Image
              style={styles.icon}
              source={require('../../../../assets/images/avatar.png')}
            />
            <Text style={styles.emailText}>Continue with Email</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            by continuing, you agree with Quabble's{'\n'}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  background: {
    width: '100%',
    height: 340,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
  },

  header: {
    alignItems: 'center',
    marginTop: 60,
    justifyContent: 'center',
  },

  appName: {
    fontSize: 40,
    fontWeight: '800',
    color: '#000',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#5C5C5C',
    lineHeight: 26,
  },

  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    marginTop: 'auto',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8, // Cho Android
  },

  button: {
    width: '100%',
    height: 58,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: 'contain',
  },

  // Apple
  appleBtn: {
    backgroundColor: '#000',
  },
  appleText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },

  // Google
  googleBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
  googleText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '600',
  },

  // Email
  emailBtn: {
    backgroundColor: '#F2F0DE',
  },
  emailText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '600',
  },

  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#6A6A6A',
    textAlign: 'center',
    lineHeight: 22,
  },

  link: {
    textDecorationLine: 'underline',
  },
});
