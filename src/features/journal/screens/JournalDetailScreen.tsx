import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const JournalDetailScreen = () => {
  const navigation: any = useNavigation();

  const handleDelete = () => {
    Alert.alert(
      "Xóa nhật ký",
      "Bạn có chắc chắn muốn xóa nhật ký này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            // TODO: delete journal from firestore
            navigation.goBack();
          },
        },
      ]
    );
  };

  /* ================= HEADER ================= */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "#fffbf2",
      },

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 4 }}
        >
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("JournalEdit")}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="pencil-outline" size={22} color="#1C1C1E" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={22} color="#1C1C1E" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>15 Nov 2025</Text>

      <Text style={styles.title}>The first day of the trip</Text>

      <Text style={styles.bodyText}>
        Today we visited many unique places and many interesting things...
      </Text>

      <Image
        source={require("../assets/image.png")}
        style={styles.image}
      />

      <View style={styles.audioBox}>
        <Ionicons name="play-circle-outline" size={32} color="#1C1C1E" />
        <View style={styles.audioBar} />
        <Text>00:21</Text>
      </View>
    </View>
  );
};

export default JournalDetailScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf2",
    padding: 20,
  },

  date: {
    fontSize: 16,
    color: "#7a7a7a",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1C1C1E",
  },

  bodyText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },

  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },

  audioBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  audioBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
