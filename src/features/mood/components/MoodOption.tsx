import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, ImageSourcePropType, View } from "react-native";

interface MoodOptionProps {
  label: string;
  icon: ImageSourcePropType;
  selected?: boolean;
  onPress: () => void;
}

const MoodOption: React.FC<MoodOptionProps> = ({ label, icon, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View

      >
        <Image
          source={icon}
          style={styles.icon}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default MoodOption;

const styles = StyleSheet.create({
  item: {
    width: "30%",
    alignItems: "center",
    marginVertical: 12,
  },
  iconWrapper: {
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 55,
    height: 55,
    borderRadius: 27,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
});
