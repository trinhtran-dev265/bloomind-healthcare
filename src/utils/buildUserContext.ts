import { MOOD_AI_MAP } from "./moodAI";
import { ACTIVITY_AI_MAP } from "./activityAI";

interface MoodLog {
  moodId: string;
  activities?: string[];
  detailMoods?: string[];
  note?: string;
}

export function buildUserContext(moodLog: MoodLog): string {
  let context = `Today, the user is ${MOOD_AI_MAP[moodLog.moodId]}.`;

  if (moodLog.activities?.length) {
    const acts = moodLog.activities.map((id) => ACTIVITY_AI_MAP[id]).join(", ");
    context += ` They are currently dealing with ${acts}.`;
  }

  if (moodLog.detailMoods?.length) {
    context += ` In their own words, they describe their feelings as: "${moodLog.detailMoods.join(
      ", "
    )}".`;
  }

  if (moodLog.note?.trim()) {
    context += ` Additional note from the user: "${moodLog.note}".`;
  }

  return context;
}
