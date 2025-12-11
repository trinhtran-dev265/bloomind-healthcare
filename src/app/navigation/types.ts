export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  MoodTracking: undefined;
  Journal: undefined;
  Chatbot: undefined;
  MoodDiary: undefined;
  ThankYou: undefined;
  PleasantActivities: undefined;
  // có thêm thì thêm dô nha mng
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
