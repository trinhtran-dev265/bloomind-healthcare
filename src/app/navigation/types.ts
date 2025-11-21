export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  MoodTracking: undefined;
  MoodCheck: undefined;
  Journal: undefined;
  Chatbot: undefined;
  // có thêm thì thêm dô nha mng 
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}