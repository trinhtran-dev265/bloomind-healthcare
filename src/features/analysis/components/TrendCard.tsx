import { View, Text, StyleSheet } from "react-native";
import { TrendData } from "../types/analysis.types";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  trend: TrendData;
}

export default function TrendCard({ trend }: Props) {
  return (
    <View style={styles.card}>
      
      <View style={styles.headerRow}>
        <Feather name="smile" size={18} />
        <Text style={styles.title}>Xu hướng tổng thể</Text>
      </View>
      <Text style={styles.subtitle}>Bạn có bao nhiêu ngày vui vẻ?</Text>

      <View style={styles.row}>
        {/* Negative */}
        <View style={[styles.box, styles.boxBlue]}>
          <Feather name="frown" size={22} color="#0066CC" />
          <Text style={styles.number}>{trend.negativeDays} ngày</Text>
        </View>

        {/* Positive */}
        <View style={[styles.box, styles.boxYellow]}>
          <Feather name="smile" size={22} color="#E6B100" />
          <Text style={styles.number}>{trend.positiveDays} ngày</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        {/* Ngày tiêu cực */}
        <View style={styles.bottomBox}>
          <Text style={styles.bottomTitle}>Những ngày tiêu cực</Text>
          <Text style={styles.bottomValue}>{trend.negativeDays} ngày</Text>

          <View style={styles.changeRow}>
            <Feather name="arrow-down-right" size={14} color="#ff6b57" />
            <Text style={styles.changeText}>1 so với kỳ trước</Text>
          </View>
        </View>

        {/* Ngày tích cực */}
        <View style={styles.bottomBox}>
          <Text style={styles.bottomTitle}>Những ngày tích cực</Text>
          <Text style={styles.bottomValue}>{trend.positiveDays} ngày</Text>

          <View style={styles.changeRow}>
            <Feather name="arrow-up-right" size={14} color="#4CAF50" />
            <Text style={styles.changeText}>1 so với kỳ trước</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginVertical:10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  subtitle: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    marginBottom: 12,
  },

  box: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
  },

  boxBlue: {
    backgroundColor: "#cee6ffff",
    marginRight: 2,
  },

  boxYellow: {
    backgroundColor: "#fff3c6ff",
    marginLeft: 2,
  },

  number: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "500",
  },

  bottomRow: {
    flexDirection: "row",
    marginTop: 2,
  },

  bottomBox: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
  },

  bottomTitle: {
    fontSize: 13,
    marginBottom: 2,
  },

  bottomValue: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },

  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  changeText: {
    fontSize: 12,
    marginLeft: 4,
  },
});
