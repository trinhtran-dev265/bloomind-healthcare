import React from 'react';
import { View, Image, Text, StyleSheet, StatusBar, Animated } from 'react-native';

import { COLORS } from '../../../types/contants/colors';
import useSplashAnimation from '../hooks/useSplashAnimation';
import { styles } from '../../../types/spalsh';
import ProgressBar from '../components/ProgressBar';

const SplashScreen: React.FC = () => {
  const { opacity, progressBarWidth, progressBarOpacity } = useSplashAnimation();

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.primary} 
      />
      
      <Animated.View style={[styles.content, { opacity }]}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Bloomind</Text>
        <Text style={styles.tagline}>Mental Health Care</Text>
      </Animated.View>

      <ProgressBar 
        width={progressBarWidth}
        opacity={progressBarOpacity}
      />
    </View>
  );
};

export default SplashScreen;