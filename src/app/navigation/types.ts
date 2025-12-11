export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;

  MoodTracking: undefined;
  Activities: undefined;
  MoodTrackingSaved: undefined; 

  Analysis: undefined;
  MoodHistory: undefined;
  MonthDetail: undefined;
  // MonthDetail: { month: number; year: number };

  Journal: undefined;
  Chatbot: undefined;
  MoodDiary: undefined;
  ThankYou: undefined;
  PleasantActivities: undefined;
  ChatHistory: undefined;
  // có thêm thì thêm dô nha mng
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
