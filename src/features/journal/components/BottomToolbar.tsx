import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FloatingButton = () => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate("JournalCreate")}
    >
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    backgroundColor: "#A7C97E",
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
