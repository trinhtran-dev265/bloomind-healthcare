import { addDoc, collection, Timestamp, doc, getDoc,updateDoc, serverTimestamp} from "firebase/firestore";
import { firestore } from "../../../services/firebase/firebaseConfig";
import { getTodayKey } from "../../../utils/date";

interface MoodLogPayload {
  moodId: string;
  moodLabel: string;
  detailMoods: string[];
  activities: string[];
  note: string;
}

export const saveMoodLog = async (
  uid: string,
  data: MoodLogPayload
) => {
  const ref = collection(firestore, "users", uid, "moodLogs");

  await addDoc(ref, {
    ...data,
    createdAt: Timestamp.now(), // dùng cho sort
    date: getTodayKey(),        // dùng cho query theo ngày
  });
};

export const getMoodLogByDate = async (
  uid: string,
  dateKey: string
) => {
  const ref = doc(firestore, "users", uid, "moodLogs", dateKey);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
};

export const updateMoodLog = async (
  uid: string,
  logId: string,
  data: MoodLogPayload
) => {
  const ref = doc(firestore, "users", uid, "moodLogs", logId);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};
