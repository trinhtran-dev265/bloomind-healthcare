import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const JournalHeader = ({ title }: any) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="#333" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={{ width: 25 }} />
    </View>
  );
};

export default JournalHeader;

const styles = StyleSheet.create({
  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "#FAF8F0",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#373737",
  },
});
