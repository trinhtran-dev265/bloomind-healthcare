import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { homeStyles } from "../styles/home";
import { HOME_ASSETS } from "../../../types/contants/homeAssets";

export const HomeHeader = ({ userInfo }: { userInfo: any }) => {
  const todayText = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={homeStyles.headerRow}>
      <View style={homeStyles.leftHeader}>
        <Image
          source={
            userInfo?.avatar
              ? { uri: userInfo.avatar }
              : HOME_ASSETS.avatarFallback
          }
          style={homeStyles.avatar}
        />

        <View style={homeStyles.greetingWrap}>
          <Text style={homeStyles.dateText}>{todayText}</Text>
          <Text style={homeStyles.nameText}>
            Hey {userInfo?.name ?? "User"}!
          </Text>
        </View>
      </View>

      <TouchableOpacity style={homeStyles.fireBtn}>
        <Feather name="zap" size={18} color="#6AA84F" />
      </TouchableOpacity>
    </View>
  );
};
