import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../../services/firebase/firebaseConfig";
import dayjs from "dayjs";

export interface MoodLogPayload {
  moodId: string;
  moodLabel: string;
  detailMoods?: string[];
  activities?: string[];
  note?: string;
}

export const saveOrUpdateMoodLog = async (
  uid: string,
  data: MoodLogPayload
) => {
  const todayKey = dayjs().format("YYYY-MM-DD");

  const ref = doc(firestore, "users", uid, "moodLogs", todayKey);

  await setDoc(
    ref,
    {
      ...data,
      date: todayKey,
      updatedAt: serverTimestamp(),
    },
    { merge: true } // 🔥 CREATE hoặc UPDATE đều OK
  );
};
