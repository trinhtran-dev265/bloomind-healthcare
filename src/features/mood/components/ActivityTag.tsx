// components/ActivityTag.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
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
      style={[
        styles.container,
        { backgroundColor: item.color },
        selected && styles.selected,
      ]}
    >
      <Feather
        name={item.icon as any}
        size={20}
        color={selected ? "#000" : "#333"}
      />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );
};

export default ActivityTag;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 10,
    gap: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  selected: {
    borderWidth: 2,
    borderColor: "#000",
  },
});
