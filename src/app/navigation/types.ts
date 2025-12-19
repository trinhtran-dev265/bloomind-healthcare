export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  EmailLogin: undefined;
  Register: undefined;
  Profile: undefined;

  MoodTracking: {
    mode?: string;
  } | undefined;

  Activities: {
    moodId?: string;
    moodLabel?: string;
    mode?: string;
  }| undefined;
  // Activities: undefined; 
  MoodTrackingSaved: undefined;

  Analysis: undefined;
  MoodHistory: undefined;
  MonthDetail: undefined;

  Journal: undefined;
  Chatbot: undefined;
  ChatHistory: undefined;

};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
