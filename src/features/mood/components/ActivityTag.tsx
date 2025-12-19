// components/ActivityTag.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ActivityItem } from "../utils/activities";

interface Props {
  item: ActivityItem;
  selected: boolean;
  onPress: () => void;
}

const ActivityTag: React.FC<Props> = ({ item, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.container,
        selected && styles.containerSelected,
      ]}
    >
      <Feather
        name={item.icon as any}
        size={20}
        color={selected ? "#484848ff" : "#7a7a7aff"}
      />

      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default ActivityTag;


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 10,
    backgroundColor: "#fff",
    margin: 6,
  },

  containerSelected: {
    backgroundColor: "#DCFFCB",
  },

  label: {
    fontSize: 18,
    color: "#555",
  },

  labelSelected: {
    color: "#000000",
    fontWeight: "500",
  },
});
