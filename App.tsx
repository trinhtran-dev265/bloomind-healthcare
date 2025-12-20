import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import { Platform } from 'react-native';
import { useEffect } from 'react';

export default function App() {
  // useEffect(() => {
  //   if (Platform.OS === 'web') {
  //     // 1. Blur body khi app khởi động
  //     const blurBody = () => {
  //       (document.activeElement as HTMLElement)?.blur();
  //       document.body?.blur();
  //       document.body.removeAttribute('tabindex');
  //     };
      
  //     // Chạy ngay và sau khi render xong
  //     blurBody();
  //     setTimeout(blurBody, 100);
  //     setTimeout(blurBody, 500);
      
  //     // 2. Ngăn body focus khi click/tap
  //     document.body.addEventListener('focus', (e) => {
  //       (e.target as HTMLElement)?.blur();
  //     }, { capture: true });
      
  //     // 3. Thêm style ẩn outline cho body
  //     const style = document.createElement('style');
  //     style.textContent = `
  //       body:focus { outline: none !important; cursor: default !important; }
  //       body[tabindex]:focus { outline: none; }
  //     `;
  //     document.head.appendChild(style);
      
  //     return () => {
  //       document.head.removeChild(style);
  //     };
  //   }
  // }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}