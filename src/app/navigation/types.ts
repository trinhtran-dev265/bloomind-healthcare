// app/navigation/types.ts
import { MoodLog } from "../../features/recommender/types/mood";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  EmailLogin: undefined;
  Register: undefined;
  Profile: undefined;

  MoodTracking: {
    mode?: "edit" | "create";
    date?: string; // YYYY-MM-DD
  };
  Activities: {
    moodId: string;
    moodLabel?: string;
    mode?: "edit" | "create";
    date?: string;
  };
  MoodHistory: {
    date: string;
  };
  MoodTrackingSaved: undefined;

  Analysis: undefined;
  // MoodHistory: undefined;
  MonthDetail: undefined;

  JournalDetail: undefined;
  JournalCreate: undefined;
  JournalEdit: undefined;
  Journal: undefined;

  Chatbot: undefined;
  ChatHistory: undefined;

  Recommendation: {
    todayMood?: MoodLog;
  };

};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type NoParamRoute = {
  [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined
    ? K
    : never;
}[keyof RootStackParamList];