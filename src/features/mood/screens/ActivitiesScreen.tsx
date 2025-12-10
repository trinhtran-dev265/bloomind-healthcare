// screens/ActivitiesScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { ACTIVITIES, ActivityItem } from "../utils/activities";
import ActivityTag from "../components/ActivityTag";
import AddActivityModal from "../components/AddActivityModal";   // IMPORT MODAL
import { useNavigation } from "@react-navigation/native";

const ActivitiesScreen = () => {
    const [activities, setActivities] = useState<ActivityItem[]>(ACTIVITIES);
    const [selected, setSelected] = useState<string[]>([]);
    const [notes, setNotes] = useState("");
    const [showModal, setShowModal] = useState(false);           // STATE
    const navigation = useNavigation();

    const toggleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    // HÀM ADD ACTIVITY MỚI TỪ MODAL
    const handleAddActivity = (newItem: ActivityItem) => {
        setActivities((prev) => [...prev, newItem]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hôm nay bạn đã làm gì?</Text>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {activities.map((item) => (
                        <ActivityTag
                            key={item.id}
                            item={item}
                            selected={selected.includes(item.id)}
                            onPress={() => toggleSelect(item.id)}
                        />
                    ))}

                    {/* New activity */}
                    <TouchableOpacity
                        style={styles.newTag}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={{ fontSize: 20,marginTop:-4 }}>＋ <Text style={{fontSize: 16, color: "#555" }}>Thêm</Text></Text>
                        
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="Chia sẻ thêm..."
                    placeholderTextColor="#999"
                    value={notes}
                    onChangeText={setNotes}
                    style={styles.input}
                    multiline
                />
            </ScrollView>

            <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => navigation.navigate("MoodTrackingSaved") as any}
            >
                <Text style={styles.saveText}>Lưu</Text>
            </TouchableOpacity>

            {/* MODAL */}
            <AddActivityModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onAdd={handleAddActivity}
            />
        </View>
    );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: "#FFf",
    },

    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    newTag: {
        width: "45%",
        backgroundColor: "#E5E5E5",
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    input: {
        backgroundColor: "#fffbf0ff",
        borderRadius: 12,
        padding: 15,
        marginTop: 20,
        minHeight: 90,
        textAlignVertical: "top",
        fontSize: 15,
    },

    saveBtn: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        width: "80%",
        backgroundColor: "#444",
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
    },

    saveText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
