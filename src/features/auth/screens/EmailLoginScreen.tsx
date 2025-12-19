import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../../services/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { seedActivitiesIfNeeded } from "../../mood/services/seedActivities";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EmailLogin'>;
};

export const EmailLoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ email và mật khẩu");
      return;
    }

    try {
      console.log("Đăng nhập với:", email);

      // Đăng nhập Firebase
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;

      const userRef = doc(firestore, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert("Lỗi", "User không tồn tại trong Firestore!");
        return;
      }

      const userData = userSnap.data();

      if (userData.disabled === true) {
        Alert.alert("Tài khoản bị khoá", "Liên hệ admin để mở.");
        return;
      }

      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
      });
      // Seed activities nếu user cũ chưa có
      await seedActivitiesIfNeeded(uid);

      Alert.alert("Thành công", "Đăng nhập thành công!");
      navigation.replace("Home");

    } catch (err: any) {
      console.log("🔥 FIREBASE LOGIN ERROR:", err);

      if (err.code === "auth/invalid-credential") {
        Alert.alert(
          "Sai email hoặc mật khẩu",
          "Kiểm tra lại thông tin tài khoản."
        );
        return;
      }

      if (err.code === "auth/user-not-found") {
        Alert.alert("Không tìm thấy tài khoản", "Email chưa được đăng ký.");
        return;
      }

      if (err.code === "auth/wrong-password") {
        Alert.alert("Sai mật khẩu", "Vui lòng thử lại.");
        return;
      }

      if (err.code === "auth/network-request-failed") {
        Alert.alert("Lỗi mạng", "Kiểm tra kết nối Internet.");
        return;
      }

      Alert.alert("Đăng nhập thất bại", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  link: {
    marginTop: 18,
    textAlign: 'center',
    color: '#4e4e4eff',
    textDecorationLine: 'underline',
  },
});
