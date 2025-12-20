export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  EmailLogin: undefined;
  Register: undefined;
  Profile: undefined;

  MoodTracking: {
    mode?: "edit";
  } | undefined;
  Activities: {
    moodId?: string;
    mode?: "edit";
  }| undefined;
  MoodTrackingSaved: undefined;

  Analysis: undefined;
  MoodHistory: undefined;
  MonthDetail: undefined;

  JournalDetail: undefined;
  JournalCreate: undefined;
  JournalEdit: undefined;
  Journal: undefined;
  
  Chatbot: undefined;
  ChatHistory: undefined;

};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
