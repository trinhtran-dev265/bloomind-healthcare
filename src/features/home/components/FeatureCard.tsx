import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View, Platform } from "react-native";

interface Props {
  image: any;
  title: string;
  onPress: () => void;
}

const FeatureCard: React.FC<Props> = ({ image, title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        {/* Image inside square card */}
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
      
      {/* Title outside card, below */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 20,
  },
  card: {
    width: 120,
    height: 120,
    borderRadius: 22,
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    
    // Shadow only at bottom for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // Only vertical offset to create bottom shadow
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  title: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    width: 120,
  },
});

export default FeatureCard;