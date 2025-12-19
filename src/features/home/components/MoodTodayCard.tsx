import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { moodData } from "../../mood/utils/moodData";

interface Props {
    todayMood: {
        id: string;
        label: string;
        detailMoods?: string[];
    } | null;
    onPressEmpty: () => void;
    onEdit: () => void;
}
const MOOD_HINT: Record<string, string> = {
    happy: "Một ngày tích cực 🌞",
    sad: "Hãy nghỉ ngơi một chút nhé 🤍",
    anxious: "Bạn đã cố gắng rồi 💪",
};

const MoodTodayCard: React.FC<Props> = ({
    todayMood,
    onPressEmpty,
    onEdit,
}) => {
    const moodItem = todayMood
        ? moodData.find((m) => m.id === todayMood.id)
        : null;

    const hintText =
        todayMood && MOOD_HINT[todayMood.id]
            ? MOOD_HINT[todayMood.id]
            : "Hãy lắng nghe cảm xúc của bạn hôm nay 🌿";

    return (
        <TouchableOpacity
            activeOpacity={todayMood ? 1 : 0.85}
            onPress={!todayMood ? onPressEmpty : undefined}
            style={styles.card}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Today's mood</Text>

                {todayMood && (
                    <TouchableOpacity onPress={onEdit}>
                        <Feather name="edit-2" size={16} color="#6AA84F" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Hint dưới header */}
            {todayMood && (
                <Text style={styles.hintText}>{hintText}</Text>
            )}

            {/* Content */}
            {todayMood && moodItem ? (
                <View style={styles.contentRow}>
                    {/* LEFT */}
                    <Image source={moodItem.icon} style={styles.icon} />

                    {/* RIGHT */}
                    <View style={styles.textWrap}>
                        <Text style={styles.moodLabel}>{todayMood.label}</Text>

                        {todayMood.detailMoods && todayMood.detailMoods.length > 0 && (
                            <View style={styles.detailRow}>
                                {todayMood.detailMoods.map((item) => (
                                    <View key={item} style={styles.chip}>
                                        <Text style={styles.chipText}>{item}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>Bạn chưa chọn mood hôm nay</Text>
                    <Text style={styles.emptyAction}>Nhấn để chọn →</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};


export default MoodTodayCard;

const styles = StyleSheet.create({
    card: {
        width: "100%",
        marginTop: 14,
        padding: 16,
        borderRadius: 18,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#EFEFEF",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 14,
        color: "#888",
    },

    contentRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        width: 72,
        height: 72,
        resizeMode: "contain",
        marginRight: 14,
    },

    textWrap: {
        flex: 1,
    },

    moodLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#145611ff",
    },

    detailRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 6,
    },

    chip: {
        backgroundColor: "#ebffdaff",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 6,
        marginTop: 4,
    },

    chipText: {
        fontSize: 12,
        color: "#555",
    },

    subHint: {
        marginTop: 6,
        fontSize: 12,
        color: "#9A9A9A",
    },

    emptyWrap: {
        paddingVertical: 14,
    },

    emptyText: {
        fontSize: 15,
        color: "#999",
    },

    emptyAction: {
        marginTop: 10,
        fontSize: 16,
        color: "#6AA84F",
        fontWeight: "600",
    },
    hintText: {
        fontSize: 14,
        color: "#3a3a3aff",
        marginBottom: 10,
    },

});
