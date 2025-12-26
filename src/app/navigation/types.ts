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
  MoodTrackingSaved: {
    moodLog?: {
      moodId: string;
      activities?: string[];
      detailMoods?: string[];
      note?: string;
      date?: string;
    };
  };
  Analysis: undefined;
  // MoodHistory: undefined;
  MonthDetail: undefined;
  JournalDetail: undefined;
  JournalCreate: undefined;
  JournalEdit: undefined;
  Journal: undefined;
  Chatbot: {
    conversationId?: string;
    userContext?: string;
  };
  ChatHistory: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
